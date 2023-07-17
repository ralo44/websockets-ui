import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import { connectWs } from "../ws_server/indexWs.js";


export const httpServer = http.createServer(function (req, res) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});
const ws = new WebSocketServer({ port: 3000 });

ws.on('connection', connectWs)
//  (ws) => {
//         console.log('received: %s');
//       ws.send('something');
//     });
