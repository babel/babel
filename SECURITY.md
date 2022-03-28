# Security Policy

## Supported Versions

This is the list of versions of `babel` which are
currently being supported with security updates.

| Version  | Supported          |
| -------- | ------------------ |
| 7.x      | :white_check_mark: |
| 6.x      | :x:                |

Note that for each supported major version, we only guarantee security fixes for the last minor version. This means that if, for example, the last released version is 7.16.4 we will only release security fixes as 7.16.5 and not for 7.15.x or older. This is because upgrading from a minor to another should be as easy as updating to a new patch version.

## Reporting a Vulnerability

To report a vulnerability please send an email with the details to security@babeljs.io. The vulnerability report must include a proof-of-concept of the exploit, or at least a few pointers that can help us assess the risk level.

#### Vulnerabilities in Babel's dependencies

If you receive a security warning relative to a dependency of Babel, before reporting it to us please make sure that at least one of the following is true:
1. the version of that dependency containing the security fix is not compatible with the semver range that Babel uses to depend on it;
2. the vulnerability affects Babel's usage of that dependency.

Note that if (1) is true but (2) is false, we will consider it as a low-level vulnerability and might decide not to fix it.

---

Thanks for helping to keep babel secure.
