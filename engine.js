export default class GameObject {

    static currentObjects = []

    constructor(customClass) {
        this.element = document.createElement('img')
        this.element.classList.add('game-object')
        if (customClass) {
            this.element.classList.add(customClass)
        }
        document.body.appendChild(this.element)
        this.movement = {
            x: 0,
            y: 0
        }
        this.speed = 0
        this.setup()
    }

    /**
     * @param {Function} cb 
     * @returns 
     */
    setup(cb) {
        if (this.element.height <= 0) {
            window.requestAnimationFrame(this.setup.bind(this))
            return
        }
        this.rect = this.element.getBoundingClientRect()
        this.element.height = this.rect.height
        this.element.style.visibility = 'visible'
        GameObject.currentObjects.push(this)
        cb.bind(this)()
    }


    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {
        this.rect.x += this.movement.x * this.speed * deltaTime
        this.rect.y += this.movement.y * this.speed * deltaTime
    }

    draw() {
        this.element.style.left = `${this.rect.x}px`
        this.element.style.top = `${this.rect.y}px`
    }

    destroy() {
        GameObject.currentObjects.splice(GameObject.currentObjects.indexOf(this), 1)
        this.element.remove()
    }
}