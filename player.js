import GameObject from "./engine.js"

export class Player extends GameObject {
    static imagesrc = 'assets/player/level1/idle.png'
    static bullet_imagesrc = 'assets/player/level1/idle.png'

    constructor() {
        super('player')
        this.element.src = Player.imagesrc

        this.level = 1
        this.speed = 250

    }

    startShooting() {
        let bullet = document.createElement('img')
        bullet.src = bullet_imagesrc
        bullet.classList.add('bullet')
    }

    /**
     * @param {KeyboardEvent} e 
     * @param {Object<string, boolean>} pressed_keys 
     */
    onkeydown(e, pressed_keys) {
        console.log(e.key);
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
                //TODO this.startShooting()
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
                //TODO this.stopShooting()
                break;
        }
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        let resetx = this.rect.x,
            resety = this.rect.y
        this.rect.x += this.movement.x * this.speed * deltaTime
        this.rect.y += this.movement.y * this.speed * deltaTime

        if (this.rect.left <= 0 || this.rect.right >= window.innerWidth) {
            this.rect.x = resetx
        }

        if (this.rect.top <= 0 || this.rect.bottom >= window.innerHeight) {
            this.rect.y = resety
        }
    }
}