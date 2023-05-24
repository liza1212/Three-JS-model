import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import stars from '/stars.jpg';

console.log("You're doing great!! ")
gsap.registerPlugin(ScrollTrigger)

const COLORS = {
  background: "white",
  light: "#ffffff",
  sky: "#aaaaff",
  ground: "#88ff88",
};

const scene= new THREE.Scene();
scene.background= new THREE.Color(COLORS.background);
scene.fog= new THREE.Fog(COLORS.background, 15, 20);

const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,1,4);
let cameraTarget = new THREE.Vector3(0, 1, 0);

scene.add(camera)

const renderer= new THREE.WebGLRenderer(
  {antialias: true, //This property is used to smooth out jagged edges in objects rendered in our scene, making the objects in the scene look real
  }
);
// renderer.shadowMap.enabled = true;
// renderer.useLegacyLights = true;
// renderer.outputColorSpace = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

const container= document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

//Lights:
const directionalLight = new THREE.DirectionalLight(COLORS.light, 2);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 10;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(2, 5, 3);

scene.add(directionalLight);


const hemisphereLight = new THREE.HemisphereLight(
  COLORS.sky,
  COLORS.ground,
  0.5
);
scene.add(hemisphereLight);

// renderer.render(scene, camera)

//plane
const plane = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: COLORS.ground });
const floor = new THREE.Mesh(plane, floorMaterial);
floor.receiveShadow = true;
floor.castShadow= true;
floor.rotateX(-Math.PI * 0.5);

// scene.add(floor);

//Loading 3d model
const loader=new GLTFLoader();
loader.load('/monkey.glb',function(gltf){
  scene.receiveShadow=true;
  scene.castShadow=true;
  scene.add(gltf.scene);
}, undefined, function(error){
  console.error(error);
})

window.addEventListener('mousedown', function(){
  // console.log("Mouse down")
  const tl= gsap.timeline();
  tl.to(camera.position, {
    x:4,
    y:0,
    z:4,
    duration:1.5,
    scrub:true,
    scrollTrigger:{
      trigger:".section2",
      start:"top 60%",
      end:"top 40%",
      markers:true,
    }
  })
})

function animate() {
  camera.lookAt(cameraTarget)
  // setupAnimation();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();