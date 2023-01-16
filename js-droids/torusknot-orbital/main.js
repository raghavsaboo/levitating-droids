import * as THREE from "three"
import "./style.css"
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {texture} from "three/nodes";
import gsap from "gsap"

const canvas = document.querySelector(".webgl")

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
let p = 6
let q = 4

// Create our sphere
const geometry = new THREE.TorusKnotGeometry(15, 2, 500, 500, p, q)
const material = new THREE.PointsMaterial({
    size: 0.05,
    transparent: true,
    color: "#F8B195",
    metalness: 2
})

const mesh = new THREE.Points(geometry, material)
scene.add(mesh)

// Light
const light_1 = new THREE.DirectionalLight( 0xffffff, 0.1 );
light_1.position.set( 2, 3, 4 );
scene.add(light_1)

// Camera
const camera = new THREE.PerspectiveCamera(100, sizes.width/sizes.height)
camera.position.z = 30
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ "canvas": canvas , "antialias": true})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 10

// Resize
window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
    window.requestAnimationFrame(loop)
    controls.update()
    light_1.position.x = 10 * Math.sin(Date.now() / 2400);
    light_1.position.z = 5 * Math.cos(Date.now() / 2400);
    renderer.render(scene, camera)
}
loop()

// Timeline
const t1 = gsap.timeline({defaults: {duration: 10}})
t1.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})
