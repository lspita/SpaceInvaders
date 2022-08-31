import { AlienGroup } from './enemy.js'
import GameObject from './engine.js'
import Player from './player.js'

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

    logger.innerText = JSON.stringify(player, null, 2)
}


function draw() {
    for (let i = 0; i < GameObject.currentObjects.length; i++) {
        const gameobj = GameObject.currentObjects[i];
        gameobj.draw()
    }
}

var lastRender = 0

/**
 * @param {number} timestamp animattion frame tiks between frames
 */
function loop(timestamp) {
    let deltaTime = (timestamp - lastRender) / 1000

    update(deltaTime)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}


new AlienGroup(300, 1)
new AlienGroup(300, 1, true)
new AlienGroup(300, 1)

window.requestAnimationFrame(loop)