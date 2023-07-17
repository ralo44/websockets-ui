import { Player } from "../modules/player.js";
import { Game } from "../modules/game.js";
import { IRequests } from "../modules/interfaces.js";
import { Room } from "../modules/room.js";
import { sendResponse } from "../modules/utils.js";

const players = new Set<Player>();
let newRoom = new Room(players);
let newGame: Game;

setInterval(() => {
    newRoom.updateRooms();
}, 500);

export const connectWs = (ws: WebSocket) => {
    let newPlayer: Player;

    ws.onmessage = (message: any) => {
        console.log(message.data);
        const request = JSON.parse(message.data) as IRequests;
        const type = request.type;

        if (type === 'reg') {
            const requestFromReg = JSON.parse(request.data);
            newPlayer = new Player(
                requestFromReg.name,
                requestFromReg.password,
                ws
            );
            players.add(newPlayer);
            sendResponse('reg', JSON.stringify(newPlayer.getPlayer()), ws);

            if (newRoom.rooms.length) {
                sendResponse('update_room', JSON.stringify(newRoom.rooms), ws);
            }
        }
        else if (type === 'create_room') {
            newGame = new Game(newPlayer);
            sendResponse('create_game', JSON.stringify(newGame), ws);
        }

        else if (type === 'add_ships') {
            const requestData2 = JSON.parse(request.data);
            newPlayer.ships = requestData2.ships;

            const currentRoom = newRoom.rooms.find(
                (r) => r.roomId === requestData2.gameId
            );
            if (currentRoom) {
                currentRoom.roomUsers.push({
                    name: newPlayer.name,
                    index: newPlayer.id,
                })
            } else {
                newRoom.rooms.push({
                    roomId: newGame.idGame,
                    roomUsers: [
                        {
                            name: newPlayer.name,
                            index: newPlayer.id,
                        },
                    ],
                });
            }
        }
        else if (type === 'add_user_to_room') {
            const requestData = JSON.parse(request.data);
            newGame = new Game(newPlayer);
            const dataCreateGame = JSON.stringify({
                idGame: requestData.indexRoom,
                idPlayer: newPlayer.id,
            });
            sendResponse('create_game', dataCreateGame, ws);
            sendResponse('update_room', JSON.stringify(newRoom.rooms), ws);
          }
        }
}