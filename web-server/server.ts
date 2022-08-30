import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

require('dotenv').config()

const createServer = () => {
    const app = express();
    // middleware
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // DB Connection
    mongoose.connect(process.env.DATABASEURL!)

    // routes
    app.use(require('./src/routes'));
    return app
}

export default createServer;