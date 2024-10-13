import * as PIXI from "../pixi.min.mjs"
import {app} from "../utils/constants.js"
import {ObservablePoint} from "../pixi.min.mjs";

export default class GameInterface {
    #healthBar
    #healthOuterBar
    #healthInnerBar

    #staminaBar
    #staminaOuterBar
    #staminaInnerBar

    constructor(health, stamina) {
        this.health = health
        this.stamina = stamina
    }

    #addHealthBar() {
        this.#healthBar = new PIXI.Container()
        this.#healthBar.x = 16
        this.#healthBar.y = 16
        this.#healthBar.zIndex = 2
        this.#healthBar.width = 200
        this.#healthBar.height = 20

        this.#healthOuterBar = new PIXI.Graphics()
            .rect(0, 0, 200, 20)
            .stroke(0xff0000)

        this.#healthInnerBar = new PIXI.Graphics()
            .rect(0, 0, 200, 20)
            .fill(0xff0000)

        this.#healthBar.addChild(this.#healthOuterBar, this.#healthInnerBar)
        app.stage.addChild(this.#healthBar)
    }
    #addStaminaBar() {
        this.#staminaBar = new PIXI.Container()
        this.#staminaBar.x = 16
        this.#staminaBar.y = 50
        this.#staminaBar.zIndex = 2
        this.#staminaBar.width = 100
        this.#staminaBar.height = 20

        this.#staminaOuterBar = new PIXI.Graphics()
            .rect(0, 0, 100, 20)
            .stroke(0x00ff00)

        this.#staminaInnerBar = new PIXI.Graphics()
            .rect(0, 0, 100, 20)
            .fill(0x00ff00)

        this.#staminaBar.addChild(this.#staminaOuterBar, this.#staminaInnerBar)
        app.stage.addChild(this.#staminaBar)
    }

    setPlayerCurrentParam(param) {
        if (param !== "health" && param !== "stamina") return

        if (param === "health") this.#healthInnerBar.width = this[param].current
        if (param === "stamina") this.#staminaInnerBar.width = this.stamina.current
    }


    playerUpdate(){
        if (this.stamina.current !== this.stamina.max) {
            this.setPlayerCurrentParam("stamina")
        }
    }


    addInterface(){
        this.#addHealthBar()
        this.#addStaminaBar()
    }
}