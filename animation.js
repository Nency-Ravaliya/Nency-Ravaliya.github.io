const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('night-sky').appendChild(renderer.domElement);

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ size: 0.5, vertexColors: THREE.VertexColors });

const starsVertices = [];
const starsColors = [];

for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;

    starsVertices.push(x, y, z);

    // Vary star size
    const starSize = Math.random() * 2 + 0.5;

    // Vary star brightness and color
    const starBrightness = Math.random() * 0.5 + 0.5;
    const starColor = new THREE.Color().setHSL(Math.random(), 0.8, starBrightness);

    starsColors.push(starColor.r, starColor.g, starColor.b);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Set camera position
camera.position.z = 5;

// Add animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate stars
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;

    renderer.render(scene, camera);
};

animate();

// Create galaxy
const galaxyGeometry = new THREE.BufferGeometry();
const galaxyMaterial = new THREE.PointsMaterial({
    map: new THREE.TextureLoader().load("img/ribbonlight.jpg"),
    map1: new THREE.TextureLoader().load("img/6484481.jpg"),
    size: 5,
    transparent: true,
    opacity: 0.7
});

const galaxyVertices = [];
for (let i = 0; i < 5000; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = Math.random() * 200;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    galaxyVertices.push(x, y, z);
}

galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(galaxyVertices, 3));
const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

// Set camera position for the galaxy
camera.position.z = 1000;
