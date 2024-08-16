'use strict';

const path = require('path');
const fs = require('fs');
const http = require('http');


const contentTypes = {
  'js': 'application/javascript',
  'json': 'application/json',
  'html': 'text/html',
  'css': 'text/css',
  'ico': 'image/x-icon',
};


const checkAccess = (path) =>
  new Promise((resolve, reject) =>
    fs.access(path, fs.constants.R_OK, (err) =>
      err ? reject(err) : resolve(path),
    ),
  );


const createServer = (rootDir, port) => {
  const index = path.join(rootDir, 'index.html');

  return http
    .createServer((request, response) => {
      let filePath = request.url;

      response.setHeader('Access-Control-Allow-Origin', '*');

      if (filePath === '/') {
        response.setHeader('Content-Type', 'text/html');
        filePath = index;
      } else {
        const type = contentTypes[filePath.split('.').at(-1)];
        if (type) {
          response.setHeader('Content-Type', type);
        }

        filePath = path.join(rootDir, filePath);
      }

      checkAccess(filePath)
        .then(() => fs.createReadStream(filePath).pipe(response))
        .catch(() => checkAccess(index)
          .then(() => {
            response.setHeader('Content-Type', 'text/html');
            return fs.createReadStream(index).pipe(response);
          })
        )
        .catch(() => {
          response.statusCode = 404;
          response.end('Resourse not found!');
        });
    }).listen(port, () =>
      console.log(`Listening on http://localhost:${port}/`),
    );
};

for (const [dir, port] of [
  ['host', 4200],
  ['instance', 4201],
  ['instance', 4202],
]) {
  createServer(path.join(__dirname, 'dist', dir, 'browser'), port);
}
