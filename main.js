let renderer, scene, camera
let cameraControl

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 30)
  camera.lookAt(scene.position)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  cameraControl = new THREE.OrbitControls(camera, renderer.domElement)
  cameraControl.enableDamping = true // 啟用阻尼效果
  cameraControl.dampingFactor = 0.25 // 阻尼係數

  let spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(0, 0, 100)
  scene.add(spotLight)

  document.body.appendChild(renderer.domElement)
}

function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

function createBlock(x, y, color) {
  const blockGeo = new THREE.BoxGeometry(1, 1, 1)
  const blockMat = new THREE.MeshPhongMaterial({ color: color })
  const block = new THREE.Mesh(blockGeo, blockMat)
  block.position.set(x, y, 0)

  scene.add(block)
}

init()
render()
createBlock(0, 0, 0xffffff)