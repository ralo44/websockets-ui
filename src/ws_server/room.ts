import crypto from "crypto";
import { IRooms } from "../type.js";
import { Player } from "./player.js";
export class Room {
    rooms: IRooms[];
    players: Player[];
    ships: [];

    constructor(rooms:IRooms[], players:Player[]) {
        this.rooms = rooms;
        this.players = players;
        this.ships = [];
    }
}