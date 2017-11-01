// Use this to remove all "expected.json" in all tests.

const { existsSync, readdirSync, statSync, unlinkSync } = require("fs");
const { join } = require("path");

const rootPath = join(__dirname, "..", "test", "fixtures");

for (const fixtureName of readdirSync(rootPath)) {
    const fixturePath = join(rootPath, fixtureName);
    for (const suiteName of readdirSync(fixturePath)) {
        const suitePath = join(fixturePath, suiteName);
        if (!statSync(suitePath).isDirectory()) {
            continue;
        }

        for (const testName of readdirSync(suitePath)) {
            const testPath = join(suitePath, testName);
            const expectedPath = join(testPath, "expected.json");
            if (existsSync(expectedPath)) {
                unlinkSync(expectedPath);
            }
        }
    }
}
