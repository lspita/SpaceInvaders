import GameObject from './engine.js'
import { Player } from './player.js'

const pressed_keys = {}
const logger = document.getElementById('logger')

const player = new Player()


window.onkeydown = (e) => {
    if (e.repeat) return
    pressed_keys[e.key] = true
    player.onkeydown(e, pressed_keys)
}

window.onkeyup = (e) => {
    pressed_keys[e.key] = false
    player.onkeyup(e, pressed_keys)
}


/**
 * @param {number} deltaTime 
 */
function update(deltaTime) {
    for (let i = 0; i < GameObject.currentObjects.length; i++) {
        const gameobj = GameObject.currentObjects[i];
        gameobj.update(deltaTime)

    }
    logger.innerText = JSON.stringify(player.movement)
}


function draw() {
    player.draw()
}

/**
 * @param {number} timestamp 
 */
function loop(timestamp) {
    let deltaTime = (timestamp - lastRender) / 1000

    update(deltaTime)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0

//TODO Check in loop if objs incremented and call setup for new ones (if it works in contructor it's better)
function setup() {
    if (player.element.height <= 0) {
        window.requestAnimationFrame(setup)
    }
    player.rect = player.element.getBoundingClientRect()
    player.rect.x = (window.innerWidth - player.rect.width) / 2
    player.rect.y = window.innerHeight - player.rect.height - (window.innerHeight / 10)
    console.log(player.rect);
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(setup)