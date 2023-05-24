import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from 'dat.gui';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import nebula from '/nebula.jpg';
import stars from '/stars.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const container=document.getElementById('container')

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const squareurl= new URL('/monkey.glb', import.meta.url)

const axisHelper= new THREE.AxesHelper();
scene.add(axisHelper);

// const orbit= new OrbitControls(camera, renderer.domElement);
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(50,50);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff,
	side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
plane.rotation.x=-0.5*Math.PI;
plane.receiveShadow=true;

const sphereGeometry = new THREE.SphereGeometry();
const sphereMaterial= new THREE.MeshBasicMaterial({color:0xffea00});
const sphere= new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere)
sphere.position.set(0, 10, 0)

const textContainer1=document.getElementById('monkey1');
const textContainer2=document.getElementById('monkey2');
const textContainer3=document.getElementById('monkey3');
const textContainer4=document.getElementById('monkey4');



// const gui= new dat.GUI();

// const options={
// 	sphereColor: "#ffea00",
// 	speed:0.01,
// };

// gui.addColor(options,'sphereColor').onChange(function(e){
// 	sphere.material.color.set(e);
// })
// gui.add(options, 'speed',0,0.1)

// let step=0;

const gridHelper= new THREE.GridHelper();
scene.add(gridHelper);


const assetLoader= new GLTFLoader();

//load 3d models
assetLoader.load(squareurl.href, function(gltf){
	const model= gltf.scene;
	scene.add(model);
	model.position.set(-12, 4, 10)
	console.log("Model added")
}, undefined, function(error){
	console.log(error)
});

assetLoader.load(
  squareurl.href,
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4, -10);
    console.log("Model added");
  },
  undefined,
  function (error) {
    console.log(error);
  }
);

assetLoader.load(
  squareurl.href,
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(12, 4, 10);
    console.log("Model added");
  },
  undefined,
  function (error) {
    console.log(error);
  }
);
assetLoader.load(
  squareurl.href,
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(12, 4, -10);
    console.log("Model added");
  },
  undefined,
  function (error) {
    console.log(error);
  }
);

// const ambientLight = new THREE.AmbientLight(0x333333);
// scene.add(ambientLight);

//normal sunlight:
const sunLight = new THREE.DirectionalLight(0x0000ff, 0.8);
// sunLight.position.set(-100,10,00);
sunLight.castShadow=true;
sunLight.shadow.camera.bottom=-12;
scene.add(sunLight)

const directionalLightHelpler= new THREE.DirectionalLightHelper(sunLight, 15);
scene.add(directionalLightHelpler);


camera.position.set(-14, 5, 16);
camera.lookAt(0,0,0)
// orbit.update();

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(stars)


let updatedCoord =[];

function updateCoord(x,y,z){
	updatedCoord=[]
	console.log("Updating the values of coordinates.");
	let temp = x*z;
	if (temp>0){

		z=Math.ceil(0-z)
	}
	else{
		x=Math.ceil(0-x)
	}
	updatedCoord.push(x);
	updatedCoord.push(y);
	updatedCoord.push(z);
	console.log(updatedCoord)
}

let currentText="monkey1";

function getText(prevText){
	console.log("function called2")
	switch (prevText) {
		case prevText === "monkey1":
			currentText = "monkey2";
			break;
		case prevText === "monkey2":
			currentText = "monkey3";
			break;

		case prevText === "monkey3":
			currentText = "monkey4";
			break;

		case prevText === "monkey4":
			currentText = "monkey1";
			break;

  }
}

//gsap

const tl=gsap.timeline();
gsap.registerPlugin(ScrollTrigger);
window.addEventListener('mousedown', function(){
	getText(currentText)
	console.log(currentText);

	updateCoord(camera.position.x, camera.position.y, camera.position.z);
	tl.to(camera.position, {
    x: updatedCoord[0],
    y: updatedCoord[1],
    z: updatedCoord[2],
    duration: 1.5,
    onUpdate: function () {
      camera.lookAt(0, 0, 0);
    },
  })
    // .to(currentText, { opacity: 0 }, { opacity: 1 })
    .to(textContainer2, { opacity: 0 }, { opacity: 1 })
    .to(textContainer3, { opacity: 0 }, { opacity: 1 })
	// .to(textContainer4,
	// 	{opacity:0}, 
	// 	{opacity:1}
	// )
})

function animate() {

	// step+=options.speed;
	// sphere.position.y= 10*Math.abs(Math.sin(step))
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}

animate();