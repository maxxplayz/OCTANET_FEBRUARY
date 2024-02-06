import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { FXAAShader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';


const togglebtn = document.querySelector('.toggle_btn')
const togglebtnIco = document.querySelector('.toggle_btn img')
const dropdown = document.querySelector('.dropdown')


togglebtn.onclick = function () {
  dropdown.classList.toggle('open')
}


const canvas = document.querySelector('.drink')
const scene = new THREE.Scene()
const loader = new GLTFLoader()
loader.load('can render.glb', function(glb) {
  console.log(glb);

  // Assuming the "root" object is a direct child
  const rootObject = glb.scene;

  if (!rootObject) {
    console.error("Could not find the root object in the model.");
    return;
  }

  rootObject.scale.set(0.15, 0.16, 0.15);

  // Traverse the scene to find the object to rotate
  rootObject.traverse((child) => {
    if (child.isMesh) {
      // If you find a mesh, you can rotate it
      child.rotation.y = 0.005; // Adjust the rotation speed as needed
    }
  });

  scene.add(rootObject);
}, function(xhr) {
  console.log((xhr.loaded / xhr.total * 100) + "% loaded");
}, function(error) {
  console.log('An error occurred');
});


const light1 = new THREE.DirectionalLight(0xffffff, 0.65)
light1.castShadow = true;
const light2 = new THREE.DirectionalLight(0xffffff, 0.65)
const light3 = new THREE.AmbientLight(0xffffff, 0.25)
light1.position.set(12,5,10)
light2.position.set(-12,-5,-9)
light3.position.set(0,0,-100)
scene.add(light1)
scene.add(light2)
scene.add(light3)
const sizes = {
  width: 600,
  height: 600
}

const camera = new THREE.PerspectiveCamera(20, sizes.width/sizes.height, 1, 1000)
camera.position.set(-8.5, 6, 6);
camera.lookAt(0, 1, 0);
scene.add(camera)


const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
  antialias: true,
  alpha: true

})
renderer.setClearColor(0xffffff, 0);

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio*3, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true


// HANDLE YOUR ANIMATION HERE
camera.position.z = 0;

function animate() {
  requestAnimationFrame(animate);

  // Rotate the camera around the y-axis
  const angle = -Date.now() * 0.001; // Adjust the rotation speed as needed
  const radius = 7;
  camera.position.x = Math.cos(angle) * radius;
  camera.position.z = Math.sin(angle) * radius;

  camera.lookAt(0, 1, 0); // Camera always looks at the center of the scene

  renderer.render(scene, camera);
}

animate();

