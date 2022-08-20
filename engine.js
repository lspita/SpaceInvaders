export default class GameObject {

    static currentObjects = []

    constructor(customClass) {
        this.element = document.createElement('img')
        this.element.classList.add('game-object')
        if (customClass) {
            this.element.classList.add(customClass)
        }
        document.body.appendChild(this.element)
        this.rect = this.element.getBoundingClientRect()
        console.log(JSON.stringify(this.rect));
        //FIXME spawn and movement (height 0 at start)
        this.movement = {
            x: 0,
            y: 0
        }
    }

    /**
     * @param {number} deltaTime 
     */
    update(deltaTime) {

    }

    draw() {
        this.element.style.left = `${this.rect.x}px`
        this.element.style.top = `${this.rect.y}px`
    }

    destroy() {
        GameObject.currentObjects.splice(GameObject.currentObjects.indexOf(this))
        this.element.remove()
    }
}