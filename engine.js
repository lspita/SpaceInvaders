export default class GameObject {

    static currentObjects = []

    /**
     * @param {string?} customClass 
     * @param {string?} element 
     */
    constructor(customClass, element = 'img') {
        this.element = document.createElement(element)
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
    }

    /**
     * @param {Function} cb 
     * @returns 
     */
    setup(cb) {
        // if it's still not rendered (height 0) request setup again
        if (this.element.height <= 0) {
            window.requestAnimationFrame(this.setup.bind(this))
            return
        }

        // when it's rendered request dimensions and call the cb
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