import GameObject from "./engine.js";
import Bullet from "./bullet.js";

export class Alien extends GameObject {

    static #color2 = false

    /**
     * @param {AlienGroup} group 
     * @param {number} firerate 
     */
    constructor(group) {
        super('alien')
        this.group = group
        this._fire_interval = null
        this.element.src = `assets/enemies/alien${(Alien.#color2 ? 2 : 1)}.png`
        Alien.#color2 = !Alien.#color2

        this.setup()
    }

    setup() {
        super.setup(() => {
            // this._fire_interval = setInterval(() => {
            //     new Bullet(this, true)
            // }, 1000 / this.firerate)
            // console.log(this);
            this.group.element.appendChild(this.element)
            this.rect.x = this.rect.y = 0
            this._fire_interval = setInterval(() => {
                new Bullet(this, true)
            }, 1000)
        })
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        super.update(deltaTime)
    }

}

export class AlienGroup extends GameObject {

    static #spawn_y = -90
    static #N_ALIENS = 5

    /**
     * @param {number} speed 
     * @param {number} firerate 
     */
    constructor(speed, left_to_right = false) {
        super('alien-group', 'div')
        this.speed = speed
        this._left_to_right = left_to_right
        this.movement = {
            y: 0,
            x: (this._left_to_right ? 1 : -1)
        }

        this.setup()
    }

    setup() {
        super.setup(() => {
            AlienGroup.#spawn_y += (window.innerHeight / 15) + 90
            this.rect.y = AlienGroup.#spawn_y
            this.rect.x = (this._left_to_right ? 0 : window.innerWidth - this.rect.width)
            this.aliens = []
            for (let i = 0; i < AlienGroup.#N_ALIENS; i++) {
                this.aliens.push(new Alien(this))
            }
        })
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        super.update(deltaTime)
        if ((this.rect.right - this.rect.width / 2.5) <= 0 || (this.rect.left + this.rect.width / 2.5) >= window.innerWidth) {
            this.movement.x *= -1
        }
    }


}