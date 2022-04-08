const canvas = document.querySelector("div.book");
console.log(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
canvas.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 0, 6);
scene.add(directionalLight);

// Texture
const urls = [
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250b9632ec86461ca6b55c3_right.png",
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250b9643b567d278cc915ea_left.png",
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250bc43363baf31093fd97a_top.png",
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250b96398308e0dbcd814a8_bottom.png",
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250b9642ac18df17c72bbbf_front.png",
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250bc4466c242f02ed704de_Back.png",
];

const loader = new THREE.TextureLoader();

const material = urls.map((url) => {
  return new THREE.MeshBasicMaterial({ map: loader.load(url) });
});

const geometry = new THREE.BoxGeometry(4, 6.17, 0.6);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 8;

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
