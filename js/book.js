const canvas = document.querySelector("div.book");

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0); // the default
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
canvas.appendChild(renderer.domElement);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 0;
pointLight.position.z = 4;
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0xffffff, 0.5, 6, 6);
rectAreaLight.position.x = 2;
rectAreaLight.position.y = 0;
rectAreaLight.position.z = 4;
scene.add(rectAreaLight);

// Textures
const textureLoader = new THREE.TextureLoader();

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

// Sides

const bookLeftSideColorTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252d15c094532581821ded9_book-left-side.jpg"
);

const bookRightSideColorTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252d15d60d80a36ad550201_right.jpg"
);

const bookTopColorTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252d15cb8515cb7e4478e03_book-top.jpg"
);

const bookBottomColorTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252d15c8387b9f560ac0e8e_book-bottom.jpg"
);

const bookRightSideNormalTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252d15c89808e779dc682c3_normal-map-right.jpeg"
);

const bookTopNormalTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252d15c349cbeff5b50987a_normal-map-top-bottom.jpeg"
);

const bookBottomNormalTexture = textureLoader.load(
  "https://uploads-ssl.webflow.com/624ee00c6c94893ddfff4251/6252d1f24231763e2f6d49c6_normal-map-bottom.jpeg"
);

// Book Materials

// Load all materials
const leftSideMaterial = new THREE.MeshPhysicalMaterial();
leftSideMaterial.map = bookLeftSideColorTexture;
leftSideMaterial.roughness = 0.4;

const rightSideMaterial = new THREE.MeshStandardMaterial();
rightSideMaterial.map = bookRightSideColorTexture;
rightSideMaterial.roughness = 1;

const frontMaterial = new THREE.MeshStandardMaterial();
frontMaterial.map = bookFrontColorTexture;
frontMaterial.roughness = 0.4;

const backMaterial = new THREE.MeshPhysicalMaterial();
backMaterial.map = bookBackColorTexture;
backMaterial.roughness = 0.4;

const topMaterial = new THREE.MeshPhysicalMaterial();
topMaterial.map = bookTopColorTexture;
topMaterial.roughness = 1;

const bottomMaterial = new THREE.MeshStandardMaterial();
bottomMaterial.map = bookBottomColorTexture;
bottomMaterial.roughness = 1;

const material = [
  rightSideMaterial,
  leftSideMaterial,
  topMaterial,
  bottomMaterial,
  frontMaterial,
  backMaterial,
];

// 01 book
const bookGeometry = new THREE.BoxGeometry(4, 6.17, 0.6);
// const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const book = new THREE.Mesh(bookGeometry, material);

//Add everything to scene
scene.add(book);

/**
 * Sizes
 */
const sizes = {
  width: canvas.offsetWidth,
  height: canvas.offsetHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = canvas.offsetWidth;
  sizes.height = canvas.offsetHeight;

  console.log(canvas.offsetWidth);
  console.log(canvas.offsetHeight);

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 8;
scene.add(camera);

/**
 * Animate
 */
const clock = new THREE.Clock();

let timelinePosition = window.pageYOffset / 3000;
let aimTimelinePosition = window.pageYOffset / 3000;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // book.rotation.y = 0.1 * elapsedTime;
  // book.rotation.x = 0.015 * elapsedTime;

  timelinePosition += (aimTimelinePosition - timelinePosition) * 0.1;

  const rx = timelinePosition * -0.15 + 0.15;
  const ry = (timelinePosition * 0.92 + 0.08) * Math.PI * 2;
  book.rotation.set(rx, ry, 0);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// For Smooth Scrolling

window.addEventListener("scroll", () => {
  aimTimelinePosition = window.pageYOffset / 3000;
});
