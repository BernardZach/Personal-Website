import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Car from './assets/BMWM3E30.glb'; // Import the GLB file

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Variable to store the GLTF model
let model;

// GLTF Loader
const loader = new GLTFLoader();
loader.load(
    Car, // Use the imported model path
    function(gltf) {
        model = gltf.scene;
        scene.add(model);
        model.scale.set(2, 2, 2); // Adjust scale if necessary
    },
    undefined,
    function(error) {
        console.error(error);
    }
);

// Camera Position
camera.position.z = 5;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the model
    if (model) {
        model.rotation.x += 0.005;
        model.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
}
animate();
