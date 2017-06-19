import compression from 'compression';
import express from 'express';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/util'
import renderApp from './render-app'

export const anonymousFunction = (req, res) => res.send(renderApp(APP_NAME));

export default class ExpressWrapper{
    spawnServer(){
        let app = express();

        app.use(compression());
        app.use(STATIC_PATH, express.static('dist'));
        app.use(STATIC_PATH, express.static('public'));
        app.get('/', anonymousFunction);
        app.listen(WEB_PORT);
    }
}