import GameObject from "./engine.js";
import Bullet from "./bullet.js";

export class Alien extends GameObject {

    static #color2 = false

    /**
     * @param {number} speed 
     * @param {number} firerate 
     */
    constructor(speed, firerate) {
        super('alien')
        this.speed = speed
        this.firerate = firerate
        this._fire_interval = null
        this.element.src = `assets/enemies/alien${(Alien.#color2 ? 2 : 1)}.png`
        Alien.#color2 = !Alien.#color2
    }

    setup() {
        super.setup(() => {
            // this._fire_interval = setInterval(() => {
            //     new Bullet(this, true)
            // }, 1000 / this.firerate)
            console.log(this);
            new Bullet(this, true)
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

    constructor() {
        super('alien-group', 'div')
    }

    setup() {
        super.setup(() => {
            AlienGroup.#spawn_y += (window.innerHeight / 15) + 90
            this.rect.y = AlienGroup.#spawn_y
            //TODO Fix NaN in dimensions
            this.element.appendChild(new Alien().element)
            this.element.appendChild(new Alien().element)
            this.element.appendChild(new Alien().element)
            this.element.appendChild(new Alien().element)
            this.element.appendChild(new Alien().element)
        })
    }

}