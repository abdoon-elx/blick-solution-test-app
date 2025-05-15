import { Application } from 'express';
import cors from 'cors';
import express from 'express';

export const setupMiddleware = (app: Application): void => {
    app.use(cors());
    app.use(express.json());
};
