import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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
camera.position.set(3, 1, 4);
let cameraTarget = new THREE.Vector3(1, 0, 1);
// camera.lookAt(1,0,1)

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
directionalLight.position.set(10, 8, 5);

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


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//Loading 3d model
const loader=new GLTFLoader();
loader.load('/public/monkey.glb',function(gltf){
  // model= gltf.scene;
  // model.position.set(10,10,10)
  scene.receiveShadow = true;
  scene.castShadow = true;
  gltf.scene.position.set(3, 0, 0);
  scene.add(gltf.scene);
  console.log(gltf.scene.position)
  const tl = gsap.timeline();
  tl.to(camera.position, {
    x: 6,
    y: 0,
    z: 3,
    scrollTrigger: {
      trigger: ".section2",
      start: "top bottom",
      end: "top 10%",
      scrub: 1,
      toggleActions: "restart reverse resume reset",
      // markers: true,
    },
  })
    .to(gltf.scene.position, {
      y: -1,
      z: 2,
      scrollTrigger: {
        trigger: ".section2",
        start: "top bottom",
        end: "top 10%",
        scrub: 1,
        toggleActions: "restart reverse resume reset",
      },
    })
    .to(camera.position,{
      x:-3,
      scrollTrigger:{
        trigger:".section3",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
      onUpdate: function () {
        camera.position.set(6, 0, 3);
        gltf.scene.position.set(3, -1, 2);
      }})
      .to(camera.position, {
      x: 3,
      y: 1,
      z: 5,
      scrollTrigger: {
        trigger: ".section3",
        start: "top bottom",
        end: "top top",
        scrub: 1,
        markers: true,
        toggleActions: "restart reverse resume reset",
      },
    })
    .to(cameraTarget,{
      x:3,
      y:1,
      z:0,
      scrollTrigger: {
        trigger: ".section3",
        start: "top bottom",
        end: "top top",
        scrub: 1,
        markers: true,
        toggleActions: "restart reverse resume reset",
        onUpdate: function(){
          console.log(cameraTarget)
        }
      },
    })
    .to(gltf.scene.position, {
      x: 6,
      y: 0,
      z: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".section3",
        start: "top bottom",
        end: "top top",
        scrub: 1,
        markers: true,
        toggleActions: "restart reverse resume reset",
      },
    });
}, undefined, function(error){
  console.error(error);
})


function animate() {
  camera.lookAt(cameraTarget)
  // setupAnimation();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();