import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import {
  resolve as resolvePath,
  relative as relativePath,
  join as joinPath,
  dirname,
} from "node:path";
import { readFileSync, copyFileSync, mkdirSync } from "node:fs";
import cp from "node:child_process";
import os from "node:os";

import JSON5 from "json5";
import { glob } from "glob";
import { setTimeout } from "node:timers/promises";

const tscPath = require.resolve("typescript/lib/tsc.js");

const entryProjectsPaths = new Set(
  process.argv.slice(2).map(project => resolvePath(process.cwd(), project))
);

const ready = new Set();
const projectToDependencies = new Map();
{
  const queue = Array.from(entryProjectsPaths);
  for (let i = 0; i < queue.length; i++) {
    const project = queue[i];
    if (projectToDependencies.has(project) || ready.has(project)) continue;

    const tsconfig = JSON5.parse(
      readFileSync(resolvePath(project, "tsconfig.json"), "utf8")
    );
    const references = tsconfig.references.map(({ path }) =>
      resolvePath(project, path)
    );

    if (references.length === 0) {
      ready.add(project);
    } else {
      projectToDependencies.set(project, new Set(references));
      queue.push(...references);
    }
  }
}

const projectToDependents = new Map();
{
  for (const [project, references] of projectToDependencies) {
    for (const reference of references) {
      let dependents = projectToDependents.get(reference);
      if (!dependents) {
        dependents = new Set();
        projectToDependents.set(reference, dependents);
      }
      dependents.add(project);
    }
  }
}

class Pool {
  #filename;
  #concurrency;

  #onTaskStart;
  #onTaskDone;
  #showOutput;

  #maxWeight;
  #getWeight;

  #running = new Map();
  #pending = [];
  #emptyListeners = [];
  #queued = false;

  constructor({
    filename,
    concurrency,
    onTaskStart,
    onTaskDone,
    showOutput,
    maxWeight,
    taskWeight,
  }) {
    this.#filename = filename;
    this.#concurrency = concurrency;
    this.#onTaskStart = onTaskStart;
    this.#onTaskDone = onTaskDone;
    this.#showOutput = showOutput;
    this.#maxWeight = maxWeight;
    this.#getWeight = taskWeight;
  }

  run(task) {
    this.#pending.push(task);
    if (!this.#queued) {
      this.#queued = true;
      queueMicrotask(() => {
        this.#runTasks();
      });
    }
  }

  #runNextTask() {
    if (this.#pending.length === 0) return;

    const tasks = [this.#pending[0]];
    let weight = this.#getWeight(tasks[0]);
    const toRemove = new Set([0]);
    for (let i = 1; i < this.#pending.length && weight < this.#maxWeight; i++) {
      const task = this.#pending[i];
      const taskWeight = this.#getWeight(task);
      if (weight + taskWeight <= this.#maxWeight) {
        weight += taskWeight;
        tasks.push(task);
        toRemove.add(i);
      }
    }
    this.#pending = this.#pending.filter((_, i) => !toRemove.has(i));

    const taskProcess = cp.fork(this.#filename, ["-b", ...tasks, "--pretty"], {
      stdio: this.#showOutput(tasks) ? "inherit" : "ignore",
    });

    taskProcess.once("exit", async code => {
      const startTime = this.#running.get(taskProcess);
      const duration = performance.now() - startTime;
      await this.#onTaskDone(tasks, code, duration);
      this.#running.delete(taskProcess);

      // Spin the event loop so that #run can pick up the next task
      await setTimeout(0);

      this.#runTasks();

      if (this.#running.size === 0 && this.#pending.length === 0) {
        this.#emptyListeners.forEach(f => f());
      }
    });

    this.#onTaskStart(tasks, weight);
    this.#running.set(taskProcess, performance.now());
  }

  #runTasks() {
    while (this.#running.size < this.#concurrency && this.#pending.length > 0) {
      this.#runNextTask();
    }
  }

  get waitForEmpty() {
    return new Promise(resolve => {
      this.#emptyListeners.push(resolve);
    });
  }
}

const total = projectToDependencies.size + ready.size;
let done = 0;

const pool = new Pool({
  filename: tscPath,
  concurrency: os.cpus().length,
  maxWeight: 20,
  taskWeight(project) {
    return 1 + (projectToDependents.get(project)?.size ?? 0);
  },
  showOutput(projects) {
    return projects.some(task => entryProjectsPaths.has(task));
  },
  // eslint-disable-next-line no-unused-vars
  onTaskStart(projects, weight) {},
  async onTaskDone(projects, code, duration) {
    if (code !== 0) process.exitCode = code;

    await Promise.all(
      projects.map(async project => {
        const { include: projectFiles } = JSON5.parse(
          readFileSync(resolvePath(project, "tsconfig.json"), "utf8")
        );
        if (!projectFiles) return;
        const globPatterns = projectFiles
          .filter(file => file.endsWith("*.ts"))
          .map(
            file => `${project}/${file.slice(0, -3)}*.d.ts`.replace(/\\/g, "/") // glob doesn't support \ on Windows
          );
        const files = await glob(globPatterns);
        for (const file of files) {
          const out = joinPath(
            process.cwd(),
            "dts",
            relativePath(process.cwd(), file)
          );
          mkdirSync(dirname(out), { recursive: true });
          copyFileSync(file, out);
        }
      })
    );

    done += projects.length;
    if (!process.env.TSCHECK_SILENT) {
      console.log(
        `[${done}/${total}] ${projects.map(project => relativePath(process.cwd(), project)).join(" ")} took ${Math.round(duration) / 1e3}s`
      );
    }
    for (const project of projects) {
      for (const dependent of projectToDependents.get(project) ?? []) {
        const dependencies = projectToDependencies.get(dependent);
        if (dependencies) {
          dependencies.delete(project);
          if (dependencies.size === 0) {
            projectToDependencies.delete(dependent);
            if (!projects.includes(dependent)) this.run(dependent);
          }
        }
      }
    }
  },
  onTaskError(projects) {
    console.error("ERROR", projects);
    process.exitCode = 1;
  },
});
for (const project of ready) pool.run(project);

await pool.waitForEmpty;

if (projectToDependencies.size > 0) {
  console.error("Did not typecheck the following projects:");
  for (const project of projectToDependencies.keys()) {
    console.error(` - ${project}`);
  }
  process.exitCode = 1;
}
