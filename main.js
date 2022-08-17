const player = document.getElementById('player')

/**
 * @param {number} deltaTime 
 */
function update(deltaTime) {
    console.log("file: main.js ~ line 5 ~ update ~ deltaTime", deltaTime)
    // Update the state of the world for the elapsed time since last render
}

function draw() {
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