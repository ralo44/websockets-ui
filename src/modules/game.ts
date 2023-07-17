import { Player } from "./player.js";
import crypto from "crypto";

export class Game {
  idGame: string;
  ships: any
  constructor(player: Player) {
    this.idGame = crypto.randomUUID();
    this.ships = [];
  }
}