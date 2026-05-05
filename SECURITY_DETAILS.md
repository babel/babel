# Babel Security Documentation & Best Practices

This document provides detailed information about the security posture of Babel, how to use it securely, and how to report vulnerabilities.

---

## 1. Security Overview
Babel is a **build-time tool**. It transforms source code into another form of source code. Because it typically runs in a trusted environment (like a developer's machine or a CI/CD server), its security model is different from runtime libraries.

### The Core Principle
> [!IMPORTANT]
> **Never run Babel on untrusted code in a privileged environment.**
> Babel is not designed to be a "sandbox" for executing or transforming malicious code. A malicious input could potentially exploit the transformation logic or the underlying Node.js environment.

---

## 2. Attack Surface & Threat Model

### A. Untrusted Input Code
If you are building a tool (like a web-based REPL or a playground) that takes user-provided code and runs Babel on it:
- **Risk**: A specially crafted JavaScript string could trigger extremely high memory usage (DoS) or exploit vulnerabilities in the parser/plugins.
- **Mitigation**: Run Babel in a restricted environment (e.g., Web Workers, isolated Docker containers, or serverless functions with strict timeouts and memory limits).

### B. Malicious Plugins/Presets
Babel plugins are JavaScript code that executes during the transformation process.
- **Risk**: A malicious plugin has full access to the Node.js environment where Babel is running. It can read files, access environment variables (like `NPM_TOKEN`), or make network requests.
- **Mitigation**: Only use trusted plugins from reputable sources. Audit your `node_modules` using `npm audit` or `yarn npm audit`.

---

## 3. Secure Usage Examples

### Example 1: Running Babel in a Sandbox (Web Worker)
If you are building a browser-based tool, use a Web Worker to ensure that even if Babel crashes or hangs, it doesn't freeze the UI.

```javascript
// worker.js
import * as Babel from '@babel/standalone';

self.onmessage = (e) => {
  const { code, options } = e.data;
  try {
    const result = Babel.transform(code, options);
    self.postMessage({ result: result.code });
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};
```

### Example 2: Preventing Prototype Pollution
Babel uses many configuration objects. Ensure that your configuration isn't merged with untrusted user input without sanitization.

```javascript
// SECURE: Strict selection of allowed options
const allowedOptions = {
  presets: ['@babel/preset-env'],
  filename: 'input.js'
};

const userOptions = getUserInput(); // potentially malicious
const finalOptions = {
  ...allowedOptions,
  sourceMaps: !!userOptions.sourceMaps // only take specific booleans/strings
};

babel.transform(code, finalOptions);
```

---

## 4. Dependency Management
Babel has a large dependency tree. We take several steps to ensure security:
1. **Automated Audits**: We run CI checks to identify vulnerable dependencies.
2. **Minimal Hoisting**: We use specific Yarn configurations to prevent accidental usage of incorrect dependency versions.

### What should you do?
Always keep your `@babel/*` packages up to date. Security fixes are often backported to the latest minor version of supported major versions (e.g., 7.x).

---

## 5. Security Reporting Process
If you find a vulnerability, please follow our coordinated disclosure process.

- **Email**: security@babeljs.io
- **Required Info**: 
    - Description of the vulnerability.
    - Affected versions.
    - **Proof of Concept (PoC)**: A script or repository that demonstrates the exploit.

---

## 6. Supported Versions
| Version  | Status |
| -------- | ------------------ |
| 8.x      | Active / Supported |
| 7.x      | Supported (Maintenance) |
| 6.x      | End of Life (EOL) |

> [!NOTE]
> Babel 7.x will receive security updates for 1 year after the first stable release of Babel 8.0.0.

---

## 7. Common Security Myths
- **Myth**: "Babel sanitizes code." 
  - **Fact**: Babel transforms code, but it does not remove malicious logic. If the input is a virus, the output is still a virus (just in a different JS version).
- **Myth**: "Running Babel on a server is safe."
  - **Fact**: Only if the input code is trusted. If you accept code from users, treat the Babel process as high-risk.
