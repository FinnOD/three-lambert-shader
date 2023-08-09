import * as THREE from 'three'
import { renderer, scene } from './core/renderer'
import { fpsGraph, gui } from './core/gui'
import camera from './core/camera'
import { controls } from './core/orbit-control'

import './style.css'

// Shaders
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight('#ffffff', 100);
pointLight.position.set(10, 5, 10);
scene.add(pointLight)


// Custom shaded sphere
const uniformsDefaults = {
  uTime: { value: 0 },
  color: { value: new THREE.Color('#ff0000')}
}

const uniforms = THREE.UniformsUtils.merge([
  THREE.UniformsLib['lights'],
  uniformsDefaults,
])

const sphereMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader,
  fragmentShader,
  lights: true
})

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  sphereMaterial,
)

sphere.position.set(0, 2, 2)
scene.add(sphere)

// Default shaded sphere
const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ color: '#ff0000' }),
)

sphere2.position.set(0, 2, -2)
scene.add(sphere2)

// Plane
let mat = new THREE.MeshLambertMaterial({ color: '#444' });
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  mat
)

plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true
scene.add(plane)


const clock = new THREE.Clock()

const loop = () => {
  const elapsedTime = clock.getElapsedTime()

  sphereMaterial.uniforms.uTime.value = elapsedTime

  pointLight.position.set(10*Math.sin(elapsedTime), 3+(3*Math.sin(elapsedTime/4)), 10*Math.cos(elapsedTime));

  fpsGraph.begin()

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
