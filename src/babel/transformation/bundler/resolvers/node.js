import { Promise } from "bluebird";
import resolve from "resolve";
import path from "path";
import fs from "fs";

export default function (request, parent) {
  return new Promise(function (resolve, reject) {
    resolve(request, { basedir: path.dirname(parent) }, function (err, res) {
      if (err) {
        resolve(null);
      } else {
        fs.readFile(res, "utf8", function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              filename: filename,
              content: content
            });
          }
        });
      }
    });
  });
}
