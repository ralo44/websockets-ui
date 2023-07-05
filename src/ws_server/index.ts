import * as fs from 'fs';
import * as path from 'path';
import { httpServer } from '../http_server/index.js';
import { WebSocketServer } from 'ws';
import { env } from 'process';

// const port = Number(env.HTTP_PORT || 8181);

// const ws = new WebSocketServer({ port:8181 });

// ws.on('connection', (ws) => {
// //   ws.on('message', function message(data) {
//     console.log('received: %s');
// //   });

//   ws.send('something');
// });