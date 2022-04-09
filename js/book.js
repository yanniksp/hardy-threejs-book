const canvas = document.querySelector("div.book");
console.log(canvas);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
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
// const urls = [
//   "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250b9632ec86461ca6b55c3_right.png",
//   "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250b9643b567d278cc915ea_left.png",
//   "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250bc43363baf31093fd97a_top.png",
//   "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250b96398308e0dbcd814a8_bottom.png",
//   "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250b9642ac18df17c72bbbf_front.png",
//   "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6250bc4466c242f02ed704de_Back.png",
// ];

// const material = urls.map((url) => {
//   return new THREE.MeshBasicMaterial({ map: loader.load(url) });
// });

// Load all textures using the texture loader
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("/assets/Door_Wood_001_basecolor.jpg");
const alphaTexture = textureLoader.load("/assets/Door_Wood_001_opacity.jpg");
const heightTexture = textureLoader.load("/assets/Door_Wood_001_height.png");
const normalTexture = textureLoader.load("/assets/Door_Wood_001_normal.jpg");
const ambientTexture = textureLoader.load(
  "/assets/Door_Wood_001_ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load(
  "/assets/Door_Wood_001_metallic.jpg"
);
const roughnessTexture = textureLoader.load(
  "/assets/Door_Wood_001_roughness.jpg"
);

// Book textures
const bookFrontColorTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6251ff7283aa8c856e358a9f_book-front-color.png"
);

const bookFrontMetalnessTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6251ff72204a1c25bd738ca0_book-front-metal.png"
);

const bookBackColorTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6251ff72204a1cc084738ca1_book-back.png"
);

const bookBackMetalnessTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6251ff72ff84da4741b70b96_book-back-metal.png"
);

const bookFrontNormalTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252014b53e47c032b3022ec_book-front-normal-map.png"
);

const bookFrontDisplacementTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252014b53e47cd5983022eb_book-front-displacement.png"
);

//Change minFilter for sharper edges
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

//Material for all objects
// const material = new THREE.MeshBasicMaterial();
// const material = new THREE.MeshNormalMaterial();

//Good! -> Very shiny
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.5;

material.map = bookFrontColorTexture;
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;

// Objects

// 01 book
const bookGeometry = new THREE.BoxGeometry(4, 6.17, 0.6);
// const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const book = new THREE.Mesh(bookGeometry, material);

//Add everything to scene
scene.add(book);

camera.position.z = 8;

function animate() {
  requestAnimationFrame(animate);
  book.rotation.x += 0.00005;
  book.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
