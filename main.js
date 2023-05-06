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

function createPumpkin() {
  const colorY = 0xff8000
  const colorB = 0x000000
  const lines = {
    1: [1, 2, 3, 4, 12, 13, 14, 15],
    2: [1, 2, 3, 13, 14, 15],
    3: [1, 2, 6, 7, 9, 10, 14, 15],
    4: [1, 5, 6, 7, 8, 9, 10, 11, 15],
    5: [4, 5, 8, 11, 12],
    6: [],
    7: [],
    8: [4, 5, 6, 7, 9, 10, 11, 12],
    9: [4, 5, 6, 10, 11, 12],
    10: [4, 5, 11, 12],
    11: [1, 4, 12, 15],
    12: [1, 2, 14, 15],
    13: [1, 2, 3, 13, 14, 15],
    14: [1, 2, 3, 4, 12, 13, 14, 15],
    15: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15]
  }

  for (let y = 1; y <= 15; y++) {
    for (let x = 1; x <= 15; x++) {
      if (lines[y].includes(x)) {
        createBlock(x - 8, y - 8, colorB)
      } else {
        createBlock(x - 8, y - 8, colorY)
      }
    }
  }
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

init()
render()
createPumpkin()