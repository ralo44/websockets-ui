
import { IRooms } from "../type.js";
import { Player } from "./player.js";

// import { startGame } from "./typesRequest";
import { sendResponse } from "../utils.js";

export class Room {
  rooms: IRooms[] = [];
  players: Player[] = [];
  ships: any;
  arrayPlayers: Player[] = [];
  constructor(players: any, ships?: any) {
    this.players = players;
    this.ships = ships;
  }

  updateRooms() {
    const completeRoom = this.rooms.find(
      (room) => room.roomUsers.length === 2
    );

    if (completeRoom) {
      this.players.forEach((player) => {
        if (
          player.id === completeRoom.roomUsers[0].index ||
          player.id === completeRoom.roomUsers[1].index
        ) {
          this.arrayPlayers.push(player);
        }
      });

      if (this.arrayPlayers) {
        const data = JSON.stringify({
          ships: this.ships,
          currentPlayerIndex: this.arrayPlayers[0].id,
        });
        sendResponse('start_game', data, this.arrayPlayers[0].ws);
        sendResponse('start_game', data, this.arrayPlayers[1].ws);
      }

      this.deleteRoom(completeRoom);
    }
  }

  deleteRoom(room: any) {
    this.rooms = []
  }
}