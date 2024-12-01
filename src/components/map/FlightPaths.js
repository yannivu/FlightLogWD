import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Sample flight data (longitude, latitude pairs)
const flightData = [
  { from: [0, 0], to: [45, 45] },
  { from: [-30, 30], to: [30, -30] },
  { from: [120, 0], to: [-120, 0] },
  { from: [0, 60], to: [0, -60] },
  { from: [60, -30], to: [-60, 30] },
  { from: [-90, 0], to: [90, 0] },
]

function createCurve(start, end) {
  const startVec = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(2, Math.PI / 2 - (start[1] * Math.PI) / 180, (start[0] * Math.PI) / 180)
  )
  const endVec = new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(2, Math.PI / 2 - (end[1] * Math.PI) / 180, (end[0] * Math.PI) / 180)
  )
  const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5).normalize().multiplyScalar(2.5)

  return new THREE.QuadraticBezierCurve3(startVec, midVec, endVec)
}

export function FlightPaths() {
  const pathsRef = useRef(null)

  useFrame(({ clock }) => {
    if (pathsRef.current) {
      pathsRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={pathsRef}>
      {flightData.map((flight, index) => (
        <mesh key={index}>
          <tubeGeometry args={[createCurve(flight.from, flight.to), 64, 0.01, 8, false]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

