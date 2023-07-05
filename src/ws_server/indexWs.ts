// import * as fs from 'fs';
// import * as path from 'path';
// import { httpServer } from '../http_server/index.js';
// import { WebSocketServer } from 'ws';
// import { env } from 'process';
// import { Player } from "./player.js";
// import { Game } from "./game.js";
import { IRequest } from "../type.js";

export const connectWs = (ws:any) => {
    // let newPlayer: Player;
    // let newGame: Game;

    ws.onmessage = (message: { data: string }) => {
        const { data } = message;
        const request = JSON.parse(data) as IRequest;
        const requestType = request.type;
        console.log(0, requestType);

    }
}

// const port = Number(env.HTTP_PORT || 8181);

// const ws = new WebSocketServer({ port:8181 });

// ws.on('connection', (ws) => {
// //   ws.on('message', function message(data) {
//     console.log('received: %s');
// //   });

//   ws.send('something');
// });