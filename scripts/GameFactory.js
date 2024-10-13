import Samurai from "./entities/Samurai.js"
import Game from "./Game.js"
import GameInterface from "./interface/GameInterface.js"
import {Container} from "./pixi.min.mjs"
import {entities} from "./utils/constants.js"

export default class GameFactory {
    createInterface() {
        return new GameInterface()
    }
    createContainer() {
        return new Container()
    }
    createPlayer(container, gameInterface) {
        return new Samurai(0, entities.posY, container, gameInterface)
    }
    createGame(player, container, gameInterface) {
        return new Game(player, container, gameInterface)
    }
}