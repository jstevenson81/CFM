'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';

export class Server {

    app: express.Application;
    port: number = process.env.PORT || 3000;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }


    public config() {
        this.app.use(bodyParser.json());
        this.app.listen(this.port, () => {
            console.log(`Listening on port: ${this.port}`);
        });
    }
    public routes() {
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.send({title: 'This is my application again testing'});
        });
    }

}
(() => {
    Server.bootstrap();
})();
