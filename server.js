'use strict';


const {path} = require('path');
const fs = require('fs');
const http = require('http');

const httpPort = 4200;
const host = 'localhost';
const index = path.join(__dirname, 'client', 'index.html');

const checkAccess = (path) =>
  new Promise((resolve, reject) =>
    fs.access(path, fs.constants.R_OK, (err) =>
      err ? reject(err) : resolve(path),
    ),
  );

http
  .createServer((request, response) => {
    let filePath = request.url;

    if (filePath.startsWith('/api')) {
      const payload = {foo: 'bar'};
      const key = 'shhhhh';
      const token = jwt.sign(payload, 'shhhhh');

      response.setHeader('Content-Type', 'application/javascript');
      response.end(
        JSON.stringify({
          payload,
          key,
          token,
        }),
      );
    } else {
      const type = contentTypes[filePath.split('.').at(-1)];
      if (type) {
        response.setHeader('Content-Type', type);
      }

      if (filePath === '/') {
        filePath = index;
      } else {
        filePath = path.join(__dirname, 'client', filePath);
      }

      checkAccess(filePath)
        .then(() => fs.createReadStream(filePath).pipe(response))
        .catch(() => {
          response.statusCode = 404;
          response.end('Resourse not found!');
        });
    }
  })
  .listen(httpPort, host, () =>
    console.log(`Listening on http://${host}:${httpPort}/`),
  );
