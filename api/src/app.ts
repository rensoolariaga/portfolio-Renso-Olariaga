import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index';
import  path  from 'path';

const server = express();

// settings

server.set('port', process.env.PORT || 3001); // for set the port in the instance i can require in everywhere i like

// middlewares

server.use(morgan('dev'));
server.use(express.json());

// routes

server.use('/', indexRoutes)

// this folder is for the uploaded images

server.use('./uploads', express.static(path.resolve('uploads'))) // ---> path is for set the location without(C://USER/etc)

export default server;