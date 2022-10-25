/* eslint-disable */

import fs from "fs";
import prettyBytes from "pretty-bytes";

/**
 * Check if a given file exists and can be accessed.
 * @param {string} filename
 */
export async function fileExists(filename) {
  try {
    await fs.promises.access(filename, fs.constants.F_OK);
    return true;
  } catch (e) {}
  return false;
}

/**
 * Remove any matched hash patterns from a filename string.
 * @param {string=} regex
 * @returns {(((fileName: string) => string) | undefined)}
 */
export function stripHash(regex) {
  if (regex) {
    console.log(`Stripping hash from build chunks using '${regex}' pattern.`);
    return function (fileName) {
      return fileName.replace(new RegExp(regex), (str, ...hashes) => {
        hashes = hashes.slice(0, -2).filter(c => c != null);
        if (hashes.length) {
          for (let i = 0; i < hashes.length; i++) {
            const hash = hashes[i] || "";
            str = str.replace(hash, hash.replace(/./g, "*"));
          }
          return str;
        }
        return "";
      });
    };
  }

  return undefined;
}

/**
 * @param {number} delta
 * @param {number} originalSize
 */
export function getDeltaText(delta, originalSize) {
  let deltaText = (delta > 0 ? "+" : "") + prettyBytes(delta);
  if (Math.abs(delta) === 0) {
    // only print size
  } else if (originalSize === 0) {
    deltaText += ` (new file)`;
  } else if (originalSize === -delta) {
    deltaText += ` (removed)`;
  } else {
    const percentage = Math.round((delta / originalSize) * 100);
    deltaText += ` (${percentage > 0 ? "+" : ""}${percentage}%)`;
  }
  return deltaText;
}

/**
 * @param {number} delta
 * @param {number} originalSize
 */
export function iconForDifference(delta, originalSize) {
  if (originalSize === 0) return "🆕";

  const percentage = Math.round((delta / originalSize) * 100);
  if (percentage >= 50) return "🆘";
  else if (percentage >= 20) return "🚨";
  else if (percentage >= 10) return "⚠️";
  else if (percentage >= 5) return "🔍";
  else if (percentage <= -50) return "🏆";
  else if (percentage <= -20) return "🎉";
  else if (percentage <= -10) return "👏";
  else if (percentage <= -5) return "✅";
  return "";
}

/**
 * Create a Markdown table from text rows
 * @param {string[][]} rows
 */
function markdownTable(rows) {
  if (rows.length == 0) {
    return "";
  }

  // Skip all empty columns
  while (rows.every(columns => !columns[columns.length - 1])) {
    for (const columns of rows) {
      columns.pop();
    }
  }

  const [firstRow] = rows;
  let columnLength = firstRow.length;

  // Hide `Change` column if they are all `0 B`
  if (columnLength === 3 && rows.every(columns => columns[2] === "0 B")) {
    columnLength -= 1;
    for (const columns of rows) {
      columns.pop();
    }
  }

  if (columnLength === 0) {
    return "";
  }

  return [
    // Header
    ["Filename", "Size", "Change", ""].slice(0, columnLength),
    // Align
    [":---", ":---:", ":---:", ":---:"].slice(0, columnLength),
    // Body
    ...rows,
  ]
    .map(columns => `| ${columns.join(" | ")} |`)
    .join("\n");
}

/**
 * @typedef {Object} Diff
 * @property {string} filename
 * @property {number} size
 * @property {number} delta
 */

/**
 * Create a Markdown table showing diff data
 * @param {Diff[]} files
 * @param {object} options
 * @param {boolean} [options.showTotal]
 * @param {boolean} [options.collapseUnchanged]
 * @param {boolean} [options.omitUnchanged]
 * @param {number} [options.minimumChangeThreshold]
 */
export function diffTable(
  files,
  { showTotal, collapseUnchanged, omitUnchanged, minimumChangeThreshold }
) {
  let changedRows = [];
  let unChangedRows = [];

  let totalSize = 0;
  let totalDelta = 0;
  for (const file of files) {
    const { filename, size, delta } = file;
    totalSize += size;
    totalDelta += delta;

    const originalSize = size - delta;
    const isUnchanged = Math.abs(delta) < minimumChangeThreshold;

    if (isUnchanged && omitUnchanged) continue;

    const columns = [
      `\`${filename}\``,
      prettyBytes(size),
      getDeltaText(delta, originalSize),
      iconForDifference(delta, originalSize),
    ];
    if (isUnchanged && collapseUnchanged) {
      unChangedRows.push(columns);
    } else {
      changedRows.push(columns);
    }
  }

  let out = markdownTable(changedRows);

  if (unChangedRows.length !== 0) {
    const outUnchanged = markdownTable(unChangedRows);
    out += `\n\n<details><summary>ℹ️ <strong>View Unchanged</strong></summary>\n\n${outUnchanged}\n\n</details>\n\n`;
  }

  if (showTotal) {
    const totalOriginalSize = totalSize - totalDelta;
    let totalDeltaText = getDeltaText(totalDelta, totalOriginalSize);
    let totalIcon = iconForDifference(totalDelta, totalOriginalSize);
    out = `**Total Size:** ${prettyBytes(totalSize)}\n\n${out}`;
    out = `**Size Change:** ${totalDeltaText} ${totalIcon}\n\n${out}`;
  }

  return { text: out, changedRows, unChangedRows };
}

/**
 * Convert a string "true"/"yes"/"1" argument value to a boolean
 * @param {string} v
 */
export function toBool(v) {
  return /^(1|true|yes)$/.test(v);
}
