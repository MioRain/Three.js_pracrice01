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

init()