import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger)

const update=false;
let cam_x,cam_y, cam_z;

const COLORS = {
  background: "#87CEEB",
  light: "#ffffff",

};
const scene= new THREE.Scene();
scene.background= new THREE.Color(COLORS.background);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1500
);
camera.position.set(-300,80,450)
//camera.position.set(-2, 1, 3);

// let cameraTarget= new THREE.Vector3()

scene.add(camera)

const renderer= new THREE.WebGLRenderer(
    {antialias: true}
)
renderer.setSize(window.innerWidth, window.innerHeight);

const container= document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

const axesHelper= new THREE.AxesHelper(5);
scene.add(axesHelper);

const directionalLight= new THREE.DirectionalLight(COLORS.light,2)
directionalLight.position.set(100,8,5)
scene.add(directionalLight)


const loader= new GLTFLoader();

// loader.load('/public/monkey.glb', function(gltf){
loader.load('/public/pimb.glb', function(gltf){
  
  scene.add(gltf.scene);
  console.log("Model position is: ", gltf.scene.position)
  const tl= gsap.timeline();
  tl.to(camera.position, {
    x: 70,
    y: 50,
    z: 325,
    // pin:true,
    scrollTrigger: {
      trigger: ".section2",
      start: "top bottom",
      end: "top 70%",
      scrub: 1,
      toggleActions: "restart reverse resume reset",
      onLeave:function(){
        camera.position.set(70,50,325)
      }
    },
  });
  tl.to(".section2", {
    duration: 8,
    scrollTrigger: {
      trigger: ".section2",
      start: "top 50%",
      end: "top top",
      pin: true,
      markers: true,
      toggleActions: "restart reverse resume reset",
    },
  });
  tl.to(camera.position, {
    x: 90,
    y: 80,
    z: 100,
    scrollTrigger: {
      trigger: ".empty",
      start: "top bottom",
      end: "top top",
      scrub: 1,
      toggleActions: "restart reverse resume reset",
      onEnter: function () {
        camera.position.set(70, 50, 325);
        console.log(
          "FROM update funciton in the pinned section when empty",
          camera.position
        );
      },
    },
  });

  

}, undefined, function(error){
    console.log(error)
})

function updateCamera(){
  camera.set(cam_x, cam_y, cam_z)
}

function animate() {
  // setupAnimation();
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();