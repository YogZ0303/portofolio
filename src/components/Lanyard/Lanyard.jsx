import * as THREE from "three"
import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"
import idcard from "../../assets/idcard.jpeg"

export default function Lanyard() {
  const cardRef = useRef()
  const hasAnimated = useRef(false)

  const texture = useLoader(
     THREE.TextureLoader,
    idcard
  )

  useFrame((state, delta) => {
    if (!cardRef.current) return

    const t = state.clock.getElapsedTime()

    // 🎬 ANIMASI MASUK
    if (!hasAnimated.current) {
      cardRef.current.position.y -= delta * 3
      cardRef.current.rotation.z += delta * 0.8

      if (cardRef.current.position.y <= 0) {
        cardRef.current.position.y = 0
        cardRef.current.rotation.z = 0
        hasAnimated.current = true
      }
    }

    // ✨ FLOATING (naik turun halus)
    cardRef.current.position.y += Math.sin(t * 1.5) * 0.002

    // ✨ SWAY (goyang kiri kanan)
    cardRef.current.rotation.z = Math.sin(t * 1.2) * 0.03

    // ✨ SCALE BREATHING (opsional halus banget)
    const scale = 1 + Math.sin(t * 1.5) * 0.005
    cardRef.current.scale.set(scale, scale, scale)
  })

  return (
    <group>

      {/* 🪪 CARD */}
      <group ref={cardRef} position={[0, 1.8, 0]}>

        {/* MAIN CARD */}
        <RoundedBox args={[1.35, 2.35, 0.02]} radius={0.16} smoothness={8}>
          <meshPhysicalMaterial
            color="#0f172a"
            transparent
            opacity={0.92}
            roughness={0.3}
            metalness={0.4}
            clearcoat={1}
          />
        </RoundedBox>

        {/* BORDER */}
        <RoundedBox args={[1.23, 2.13, 0.005]} radius={0.18} smoothness={6}>
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} />
        </RoundedBox>

        {/* TOP BAR */}
        <RoundedBox
          args={[1.1, 0.28, 0.01]}
          radius={0.08}
          position={[0, 0.78, 0.03]}
        >
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={0.15}
          />
        </RoundedBox>

        <Text
          position={[0, 0.78, 0.04]}
          fontSize={0.06}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          PORTFOLIO CARD
        </Text>

        {/* GARIS */}
        <mesh position={[0, 0.62, 0.04]}>
          <planeGeometry args={[0.8, 0.005]} />
          <meshBasicMaterial color="#334155" />
        </mesh>

        {/* FOTO FRAME */}
        <RoundedBox
          args={[0.95, 1.25, 0.01]}
          radius={0.07}
          position={[0, -0.05, 0.035]}
        >
          <meshStandardMaterial color="#020617" />
        </RoundedBox>

        {/* FOTO */}
        <mesh position={[0, -0.05, 0.04]}>
          <planeGeometry args={[0.85, 1.1]} />
          <meshStandardMaterial map={texture} />
        </mesh>

        {/* SHADOW FOTO */}
        <mesh position={[0, -0.05, 0.041]}>
          <planeGeometry args={[0.85, 1.1]} />
          <meshBasicMaterial color="black" transparent opacity={0.08} />
        </mesh>

        {/* TEXT */}
        <Text
          position={[0, -0.55, 0.04]}
          fontSize={0.08}
          color="#e2e8f0"
          anchorX="center"
        >
          Prayoga Kurniawan
        </Text>

        <Text
          position={[0, -0.7, 0.04]}
          fontSize={0.055}
          color="#38bdf8"
          anchorX="center"
        >
          Web Developer
        </Text>

        <mesh position={[0, -0.8, 0.04]}>
          <planeGeometry args={[0.65, 0.006]} />
          <meshBasicMaterial color="#334155" />
        </mesh>

        <Text
          position={[0, -0.95, 0.04]}
          fontSize={0.045}
          color="#94a3b8"
          anchorX="center"
        >
          prayogakurniawan15@gmail.com
        </Text>

      </group>

      {/* 🌑 SHADOW BAWAH (BIAR NGAMBANG) */}
      <mesh position={[0, -1.2, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial transparent opacity={0.15} />
      </mesh>

    </group>
  )
}