import GameObject from "./engine.js"
import Bullet from "./bullet.js"

export default class Player extends GameObject {

    static #MAX_LEVEL = 3
    #fire_interval = null
    #prevent_spam = false

    constructor() {
        super('player')
        this.level = 1
        this.idle_image = `assets/player/level${this.level}/idle.png`
        this.active_image = `assets/player/level${this.level}/active.png`
        this.element.src = this.idle_image
        this.speed = 300
        this.firerate = 2
        this.healthbar = document.getElementById('healthbar')
        this.#addHealth(2)
        this.maxHealth = 3
        this.gameover = false

        this.setup()
    }

    /**
     * @param {KeyboardEvent} e 
     * @param {Object<string, boolean>} pressed_keys 
     */
    onkeydown(e, pressed_keys) {
        switch (e.key) {
            case 'ArrowRight':
                this.movement.x = 1
                break;
            case 'ArrowLeft':
                this.movement.x = -1
                break;
            case 'ArrowUp':
                this.movement.y = -1
                break;
            case 'ArrowDown':
                this.movement.y = 1
                break;
            case ' ':
                this.startShooting()
                break;
            case 'u':
                this.upgrade()
                break;
        }

        let magnitude = Math.sqrt(this.movement.x ** 2 + this.movement.y ** 2)
        if (magnitude != 0) {
            this.movement.x /= magnitude
            this.movement.y /= magnitude
        }
    }

    /**
     * @param {KeyboardEvent} e 
     * @param {Object<string, boolean>} pressed_keys 
     */
    onkeyup(e, pressed_keys) {
        switch (e.key) {
            case 'ArrowRight':
                if (this.movement.x == Math.SQRT1_2) {
                    this.movement.y = Math.round(this.movement.y * Math.SQRT2)
                }
                this.movement.x = (pressed_keys['ArrowLeft'] ? -1 : 0)
                break;
            case 'ArrowLeft':
                if (this.movement.x == -Math.SQRT1_2) {
                    this.movement.y = Math.round(this.movement.y * Math.SQRT2)
                }
                this.movement.x = (pressed_keys['ArrowRight'] ? 1 : 0)
                break;
            case 'ArrowDown':
                if (this.movement.y == Math.SQRT1_2) {
                    this.movement.x = Math.round(this.movement.x * Math.SQRT2)
                }
                this.movement.y = (pressed_keys['ArrowUp'] ? -1 : 0)
                break;
            case 'ArrowUp':
                if (this.movement.y == -Math.SQRT1_2) {
                    this.movement.x = Math.round(this.movement.x * Math.SQRT2)
                }
                this.movement.y = (pressed_keys['ArrowDown'] ? 1 : 0)
                break;
            case ' ':
                this.stopShooting()
                break;
        }
    }

    setup() {
        super.setup(() => {
            this.rect.x = (window.innerWidth - this.rect.width) / 2
            this.rect.y = window.innerHeight - this.rect.height - (window.innerHeight / 10)
        })
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        let resetx = this.rect.x,
            resety = this.rect.y
        super.update(deltaTime)

        if (this.rect.left <= 0 || this.rect.right >= window.innerWidth) {
            this.rect.x = resetx
        }

        if (this.rect.top <= 0 || this.rect.bottom >= window.innerHeight) {
            this.rect.y = resety
        }

        this.element.src = (this.movement.x != 0 || this.movement.y != 0 ? this.active_image : this.idle_image)
    }

    startShooting() {
        if (this.#prevent_spam || this.#fire_interval) {
            return
        }
        new Bullet(this, false)
        this.#prevent_spam = true
        setTimeout(() => {
            this.#prevent_spam = false
        }, 1000 / this.firerate)

        this.#fire_interval = setInterval(() => {
            new Bullet(this, false)
        }, 1000 / this.firerate)
    }

    stopShooting() {
        clearInterval(this.#fire_interval)
        this.#fire_interval = null
    }

    /**
     * @param {number} amount 
     */
    #addHealth(amount = 1) {
        var hearth
        for (let i = 0; i < amount; i++) {
            this.health++
            hearth = document.createElement('img')
            hearth.src = 'assets/hearth.png'
            this.healthbar.appendChild(hearth)
        }
    }


    /**
     * @param {number} total 
     */
    #refillHealth(total = this.maxHealth) {
        this.healthbar.innerHTML = ''
        this.health = total

        var hearth
        for (let i = 0; i < total; i++) {
            hearth = document.createElement('img')
            hearth.src = 'assets/hearth.png'
            this.healthbar.appendChild(hearth)
        }
    }

    /**
     * @param {number} amount 
     */
    damage(amount = 1) {
        super.damage(amount)
        for (let i = this.healthbar.childElementCount - 1; i > this.health - 1; i--) {
            this.healthbar.children[i].src = 'assets/lost_hearth.png'
        }
    }

    upgrade() {
        if (this.level >= Player.#MAX_LEVEL) {
            return
        }
        this.level++
        this.idle_image = `assets/player/level${this.level}/idle.png`
        this.active_image = `assets/player/level${this.level}/active.png`
        this.speed += 100
        this.firerate += 1
        this.maxHealth++
        this.#refillHealth()
    }

    destroy() {
        this.gameover = true
        super.destroy()
    }
}