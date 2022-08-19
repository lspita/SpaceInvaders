let _playerelement = document.getElementById('player')
const pressed_keys = {}
const logger = document.getElementById('logger')

const player = {
    element: _playerelement,
    rect: _playerelement.getBoundingClientRect(),
    level: 1,
    speed: 250,
    movement: {
        x: 0,
        y: 0
    }
}

player.rect.x = (window.innerWidth - player.rect.width) / 2

window.onkeydown = (e) => {
    if (e.repeat) return
    pressed_keys[e.key] = true
    switch (e.key) {
        case 'ArrowRight':
            player.movement.x = 1
            break;
        case 'ArrowLeft':
            player.movement.x = -1
            break;
        case 'ArrowUp':
            player.movement.y = -1
            break;
        case 'ArrowDown':
            player.movement.y = 1
            break;
        case ' ':
            //TODO player.startShooting()
            break;
    }

    if (player.movement.x != 0 && player.movement.y != 0) {
        player.movement.x *= Math.SQRT1_2
        player.movement.y *= Math.SQRT1_2
    }
}

window.onkeyup = (e) => {
    pressed_keys[e.key] = false
    switch (e.key) {
        case 'ArrowRight':
            if (player.movement.x < 1) {
                player.movement.y = Math.round(player.movement.y * Math.SQRT2)
            }
            player.movement.x = (pressed_keys['ArrowLeft'] ? -1 : 0)
            break;
        case 'ArrowLeft':
            if (player.movement.x > -1) {
                player.movement.y = Math.round(player.movement.y * Math.SQRT2)
            }
            player.movement.x = (pressed_keys['ArrowRight'] ? 1 : 0)
            break;
        case 'ArrowDown':
            if (player.movement.y < 1) {
                player.movement.x = Math.round(player.movement.x * Math.SQRT2)
            }
            player.movement.y = (pressed_keys['ArrowUp'] ? -1 : 0)
            break;
        case 'ArrowUp':
            if (player.movement.y > -1) {
                player.movement.x = Math.round(player.movement.x * Math.SQRT2)
            }
            player.movement.y = (pressed_keys['ArrowDown'] ? 1 : 0)
            break;
        case ' ':
            //TODO player.stopShooting()
            break;
    }
}


/**
 * @param {number} deltaTime 
 */
function update(deltaTime) {
    let resetx = player.rect.x,
        resety = player.rect.y
    player.rect.x += player.movement.x * player.speed * deltaTime
    player.rect.y += player.movement.y * player.speed * deltaTime

    if (player.rect.left <= 0 || player.rect.right >= window.innerWidth) {
        player.rect.x = resetx
    }

    if (player.rect.top <= 0 || player.rect.bottom >= window.innerHeight) {
        player.rect.y = resety
    }
    logger.innerText = JSON.stringify(player.movement)
}


function draw() {
    player.element.style.left = `${player.rect.x}px`
    player.element.style.top = `${player.rect.y}px`
    // Draw the state of the world
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
window.requestAnimationFrame(loop)