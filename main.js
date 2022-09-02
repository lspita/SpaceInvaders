import { AlienGroup } from './enemy.js'
import GameObject from './engine.js'
import Player from './player.js'

const pressed_keys = {}

const player = new Player()


window.onkeydown = (e) => {
    if (e.repeat) return
    pressed_keys[e.key] = true
    GameObject.currentObjects.forEach((obj) => {
        obj.onkeydown(e, pressed_keys)
    })
}

window.onkeyup = (e) => {
    pressed_keys[e.key] = false
    GameObject.currentObjects.forEach((obj) => {
        obj.onkeyup(e, pressed_keys)
    })
}

const alienGroupBaseSpeed = 300
const lastLevel = 3
var currentLevel = 1
console.log(`LEVEL ${currentLevel}: START!`);
var direction = !!Math.round(Math.random())

var alienGoups = [new AlienGroup(alienGroupBaseSpeed, !direction)]
var nextLevel = true

window.requestAnimationFrame(loop)

var lastRender = 0

/**
 * @param {number} timestamp animattion frame tiks between frames
 */
function loop(timestamp) {
    let deltaTime = (timestamp - lastRender) / 1000

    update(deltaTime)
    draw()

    if (player.gameover) {
        gameover()
        return
    }

    for (let i = 0; i < alienGoups.length; i++) {
        const group = alienGoups[i];
        if (group.aliens.length > 0) {
            nextLevel = false
            break
        }
    }
    if (nextLevel) {
        currentLevel++
        let nGroups = alienGoups.length + 1
        alienGoups.forEach((group) => {
            group.destroy()
        })
        alienGoups = []

        if (currentLevel > lastLevel) {
            win()
            return
        }
        for (let i = 0; i < nGroups; i++) {
            alienGoups.push(new AlienGroup(alienGroupBaseSpeed + (100 * i), direction))
            direction = !direction
        }
        player.upgrade()
        console.log(`LEVEL ${currentLevel}: START!`);
    }

    nextLevel = true
    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

function win() {
    console.log('you win');
}

function gameover() {
    console.log('you lost');
}


/**
 * @param {number} deltaTime 
 */
function update(deltaTime) {
    for (let i = 0; i < GameObject.currentObjects.length; i++) {
        const gameobj = GameObject.currentObjects[i];
        gameobj.update(deltaTime)
    }
}


function draw() {
    for (let i = 0; i < GameObject.currentObjects.length; i++) {
        const gameobj = GameObject.currentObjects[i];
        gameobj.draw()
    }
}