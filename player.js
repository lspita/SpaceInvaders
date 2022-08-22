import GameObject from "./engine.js"
import Bullet from "./bullet.js"

export class Player extends GameObject {
    static idle_image = 'assets/player/level1/idle.png'
    static active_image = 'assets/player/level1/active.png'

    constructor() {
        super('player')
        this.element.src = Player.idle_image
        this.level = 1
        this.speed = 300
        this.firerate = 2
        this._fire_interval = undefined
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
        }

        if (this.movement.x != 0 && this.movement.y != 0) {
            this.movement.x *= Math.SQRT1_2
            this.movement.y *= Math.SQRT1_2
        }
    }

    /**
     * @param {KeyboardEvent} e 
     * @param {Object<string, boolean>} pressed_keys 
     */
    onkeyup(e, pressed_keys) {
        switch (e.key) {
            case 'ArrowRight':
                if (this.movement.x < 1) {
                    this.movement.y = Math.round(this.movement.y * Math.SQRT2)
                }
                this.movement.x = (pressed_keys['ArrowLeft'] ? -1 : 0)
                break;
            case 'ArrowLeft':
                if (this.movement.x > -1) {
                    this.movement.y = Math.round(this.movement.y * Math.SQRT2)
                }
                this.movement.x = (pressed_keys['ArrowRight'] ? 1 : 0)
                break;
            case 'ArrowDown':
                if (this.movement.y < 1) {
                    this.movement.x = Math.round(this.movement.x * Math.SQRT2)
                }
                this.movement.y = (pressed_keys['ArrowUp'] ? -1 : 0)
                break;
            case 'ArrowUp':
                if (this.movement.y > -1) {
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

        this.element.src = (this.movement.x != 0 || this.movement.y != 0 ? Player.active_image : Player.idle_image)
    }

    startShooting() {
        this._fire_interval = setInterval(() => {
            new Bullet(this, false)
        }, 1000 / this.firerate)
    }

    stopShooting() {
        clearInterval(this._fire_interval)
    }
}