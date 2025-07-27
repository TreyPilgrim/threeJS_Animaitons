import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer - draws on canvas for camera to take pics of and display to screen
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/*
    Animate 
*/
let time = Date.now() // for the deltaTime solution
const clock = new THREE.Clock() // for the 1-line solution

/*
    - This type of animation makes opject have a delay.
    - Think about loop implementation for things that will stay in the relative same area doing
        doing the same animation
        * Loops necessary for continuous movement, will only move once
*/
gsap.to(mesh.position, {duration: 1, delay: 1, x: 2 }) // for the gsap solution
gsap.to(mesh.position, {duration: 1, delay: 3, x: -2 }) // for the gsap solution
const tick = () => 
{
    // Time
    /*
        - Objects will move faster/slower depending on framerate of computer
            - Using deltaTime, we can ensure a consistent speed across all devices
    */
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // // Update objects
    // mesh.rotation.y += 0.001 * deltaTime
    
    // 1-line solution for getting a consistent speed
    const elapsedTime = clock.getElapsedTime()

    /*
        Update Objects
    */
    // mesh.rotation.y = elapsedTime
    
    // // Make a circle (counter clock)
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)


    /*
        Animate the Camera
    */
//    // Make a [Counter clock] circle while looking at object
//    camera.position.x = Math.cos(elapsedTime)
//    camera.position.y = Math.sin(elapsedTime)
//    camera.lookAt(mesh.position)


    // Render
    renderer.render(scene, camera)

    /*
        - Tells Browser I wish to perform an animation
            - calls specific callback (function) to update animation before next frame call

        - Browser can optimize this function
            - smoother
            - inactive tabs will pause animation
    */
    window.requestAnimationFrame(tick)
}

tick()
