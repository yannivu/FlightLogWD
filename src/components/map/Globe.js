import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import Texture from '../../assets/static/images/texture_earth.jpg'

export function Globe() {
  const globeRef = useRef(null)
  const texture = useTexture(Texture)

  // Convert the texture to black and white
  texture.colorSpace = THREE.SRGBColorSpace
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = texture.image.width
  canvas.height = texture.image.height
  context?.drawImage(texture.image, 0, 0)
  const imageData = context?.getImageData(0, 0, canvas.width, canvas.height)
  if (imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
      imageData.data[i] = avg
      imageData.data[i + 1] = avg
      imageData.data[i + 2] = avg
    }
    context?.putImageData(imageData, 0, 0)
  }
  const bwTexture = new THREE.CanvasTexture(canvas)

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001
    }
  })

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={bwTexture}
          color="#ffffff"
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />        
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

