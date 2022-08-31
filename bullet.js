import GameObject from "./engine.js"

export default class Bullet extends GameObject {

    constructor(shooter, enemy_bullet = false) {
        super('bullet')
        this.shooter = shooter
        this.speed = 500
        this.enemy_bullet = enemy_bullet
        this.movement = {
            x: 0,
            y: (enemy_bullet ? 1 : -1)
        }
        this.element.src = `assets/${(enemy_bullet ? 'enemies/' : 'player/')}bullet.png`

        this.setup()
    }

    setup() {
        super.setup(() => {
            let rect = this.shooter.element.getBoundingClientRect()
            this.rect.x = rect.x + rect.width / 2 - this.rect.width / 2
            this.rect.y = (this.enemy_bullet ?
                rect.bottom :
                rect.top - this.rect.height
            )
        })
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        super.update(deltaTime)
        if (this.rect.bottom <= 0 || this.rect.top >= window.innerHeight) {
            this.destroy()
        }
    }
}