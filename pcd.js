import * as THREE from 'three';
import { PCDLoader } from "three/addons/loaders/PCDLoader.js";
gsap.registerPlugin(ScrollTrigger)

const scene= new THREE.Scene();

const camera=new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(100,10,50);

scene.add(camera)

const renderer= new THREE.WebGLRenderer({
    antialias:true,
})
const container = document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);


const directionalLight= new THREE.DirectionalLight('#FFFFFF', 2);
scene.add(directionalLight);

const plane= new THREE.PlaneGeometry(30,30);
const planeMaterial= new THREE.MeshStandardMaterial({color:"#88ff88"})
const floor= new THREE.Mesh(plane, planeMaterial);
scene.add(floor)

const loader=new PCDLoader();

loader.load(
    '/public/ism_test_cat.pcd',
    function(points){

        // points.position.set(2,3,4)
        points.position.x= 10;
        points.position.y=5;
        points.position.z=-3;
        scene.add(points);
        console.log("Reached here!!")
    },
    function(xhr){
        console.log((xhr.loaded/xhr.total*100)+'% loaded')
    },
    function (error){
        console.log('An error happened')
    }
)



function animate() {
  camera.lookAt(1,1,1);
  // setupAnimation();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();