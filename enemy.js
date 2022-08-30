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

    constructor() {
        super('alien-group', 'div')
    }

    setup() {
        super.setup(() => {
            //TODO Fix NaN in dimensions

            this.rect.x = (window.innerWidth - this.rect.width) / 2
            console.log("file: enemy.js ~ line 48 ~ AlienGroup ~ super.setup ~ window.innerWidth", window.innerWidth, this.rect.width)
            this.rect.y = (window.innerHeight - this.rect.height) / 2
            let a = new Alien()
            console.log(a);
            this.element.appendChild(a.element)
        })
    }

}