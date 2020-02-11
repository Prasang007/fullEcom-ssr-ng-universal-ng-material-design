import routes from './src/app/routes/routes';
/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'dotenv/config';
import 'zone.js/dist/zone-node';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as https from 'https';
import {join} from 'path';
import * as fs from 'fs';

const privateKey = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('certificate.pem');

const credentials = {key: privateKey, cert: certificate};


const app = express();
// createServer(credentials);


// Express server
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PATH,
} = process.env;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');


mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);


app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));
app.use('/', routes);
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Node Express server listening on https://localhost:${PORT}`);
});
