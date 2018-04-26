// Angular requires Zone.js
require('zone.js/dist/zone-node');

const express = require('express');
const ngExpressEngine =
require('@nguniversal/express-engine').ngExpressEngine;

const fs = require('fs');
const path = require('path');

// Find the main.hash.bundle in the dist-server folder
var files;
try {
  files = fs.readdirSync(`${process.cwd()}/dist-server`);
} catch (err) {
  console.error(err);
}

var mainFiles = files.filter(file => file.startsWith('main'));
var split = mainFiles[0].split('.');
var hash = '';
if (split.length > 3) {
  hash = split[1] + '.';
}
var {
  ServerAppModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`./dist-server/main.${hash}bundle`);

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const provider = provideModuleMap(LAZY_MODULE_MAP);

const app = express();

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: ServerAppModuleNgFactory,
    providers: [provider],
  })
);

app.set('view engine', 'html');
app.set('views', __dirname);

app.use(express.static(path.join(__dirname, '/assets'), { index: false }));
app.use(express.static(path.join(__dirname, '/dist'), { index: false }));

app.get('/*', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.render('./dist/index', {
    req: req,
    res: res
  });
  console.timeEnd(`GET: ${req.originalUrl}`);
})

app.listen(process.env.PORT || 8080, () => {
  console.log('server listening on port 8080');
});
