import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer;
camera.position.z = 5;
camera.position.x = 3;
camera.position.y = 2;
const geometry = new THREE.BufferGeometry()
const vertices = []
const size = 2500

for ( let i = 0; i < 5000; i ++ ) {
  const x = (Math.random() * size + Math.random() * size) / 2 - size / 2
  const y = (Math.random() * size + Math.random() * size) / 2 - size / 2
  const z = (Math.random() * size + Math.random() * size) / 2 - size / 2

  vertices.push(x, y, z)
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

let material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
        size: {value: 8},
        scale: {value: 1},
        color: {value: new THREE.Color('#5eead4')}
    },
    vertexShader: THREE.ShaderLib.points.vertexShader,
    fragmentShader: `
    uniform vec3 color;
    void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        gl_FragColor = vec4(color, 0.2 * step(ll, 0.5));
    }
    `
});


// let material = new THREE.PointsMaterial({
//   size: 2,
//   color: 0xffffff,

// })

const particles = new THREE.Points(geometry, material)
particles.sortParticles = true
scene.add(particles)



const animate = () => {
    camera.lookAt(scene.position)
    scene.rotation.x -= 0.0002
    scene.rotation.y += 0.0000
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

export const createScene = (el) => {
    console.log("starting three")
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
    renderer.setClearColor(0xffffff, 0);
    resize();
    animate();
}

window.addEventListener('resize', resize);