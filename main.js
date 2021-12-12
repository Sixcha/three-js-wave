import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer, scene, camera;

let spheres = []

let clock = new THREE.Clock();
let time = 0;
let delta = 0;


init();

function init() {

    var group = new THREE.Group();
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1550 );

    camera.position.z = 50;
    camera.position.y = 40;
    camera.position.x = 40;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x0 ); 

    // ======== Geometry =============

    let planeGeometry = new THREE.PlaneGeometry( 200,200);
    let ballGeometry = new THREE.SphereGeometry (1, 100, 10);

    // ======== Materials =============

    let orangeMaterial = new THREE.MeshPhongMaterial({
        color: 0xed9005,
        side: THREE.DoubleSide
    });


    let whiteMaterial = new THREE.MeshPhongMaterial({
        color: 0x808080,
        side: THREE.DoubleSide
    });
    


    // ======== Light ================

    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    let pointLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);

    pointLight.position.set(0, 10, 0);
    pointLight.target.position.set(-5, 0, 0);

    scene.add(pointLight);
    scene.add(pointLight.target);


    // ========== MAIN CODE ==============

    let plane = new THREE.Mesh(planeGeometry, whiteMaterial);
    plane.rotation.x = Math.PI * -.5;
    plane.position.y = -5;
    scene.add(plane);
    
    generate(10,ballGeometry,orangeMaterial)

    // ========== RENDERER ============

    renderer = new THREE.WebGLRenderer({antialias :true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );

    //====== ORBIT CONTROL ============

    var controls = new OrbitControls(camera, renderer.domElement);


    var container = document.getElementById( 'ThreeJS' );
    container.appendChild( renderer.domElement );
    requestAnimationFrame(animate);


}

function animate(){
    requestAnimationFrame (animate);
    render();
}

function render() 
{
    //get Delta and then add it to total time to calculate movement through sin
    delta = clock.getDelta();
    time += delta;
    
     renderer.render( scene, camera );
    //set movement depending on starting positions to be in snyc
     spheres.forEach((element) => {
        element.position.y = 10 + Math.sin(((element.position.x / 1.1 + element.position.z / 1.1) + time) * 2) * 2.5
     })
}

function generate(number,ballGeometry,orangeMaterial){
    for (let i=0;i<number;i++){
        for (let i2=0;i2<number;i2++){
            let sphereGenerate = new THREE.Mesh(ballGeometry, orangeMaterial);
            //generates and centers spheres based on how many are to be made
            sphereGenerate.position.x = ((number - 1) * -5) + (10 * i2)
            sphereGenerate.position.z = ((number - 1) * -5) + 10 * i;

            spheres.push(sphereGenerate)
            scene.add(sphereGenerate);
        }
    }
}
