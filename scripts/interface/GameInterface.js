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

    constructor() {
        // Health
        this.currentHealth = 200
        this.maxHealth = 200
        // Stamina
        this.currentStamina = 100
        this.maxStamina = 100
    }

    #addHeartBar() {
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
    setCurrentHealth(health) {
        if (health > this.currentHealth) this.currentHealth = this.maxHealth
        this.currentHealth += health
        if (this.currentHealth < 0) this.currentHealth = 0
        this.#healthInnerBar.width = this.currentHealth
    }
    setMaxHealth(health) {
        if (health <= 0) return
        this.maxHealth = health
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
    setCurrentStamina(stamina) {
        if (stamina > this.currentStamina) this.currentStamina = this.maxStamina
        this.currentStamina += stamina
        if (this.currentStamina < 0) this.currentStamina = 0
        this.#staminaInnerBar.width = this.currentStamina
    }
    setMaxStamina(stamina) {
        if (stamina <= 0) return
        this.maxStamina = stamina

    }

    addInterface(){
        this.#addHeartBar()
        this.#addStaminaBar()
    }
}