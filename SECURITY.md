# Security Policy

## Supported Versions

This is the list of versions of `babel` which are
currently being supported with security updates.

| Version  | Supported          |
| -------- | ------------------ |
| 7.x      | :white_check_mark: |
| 6.26.x   | :white_check_mark: |
| < 6.26.0 | :x:   <!doctype html>
<script defer>
  // modernBuild = Modules + Dynamic Import support
  import('./dist/test.js');
  window.modernBuild = true;
</script>
<script defer>
  if (!window.modernBuild) {
    document.head.appendChild(Object.assign(document.createElement('script'), {
      src: './jspm_packages/npm/systemjs@5.0.0/dist/s.min.js',
      onload: function () {
        System.import('./dist-system/test.js');
      }
    }));
  }
</script>             |

## Reporting a Vulnerability

To report a vulnerability please send an email with the details to security@babeljs.io. 
This will help us to assess the risk and start the necessary steps.

Thanks for helping to keep babel secure.
