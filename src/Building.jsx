import { useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import useRoom from "./store/useRoom.js"
import * as THREE from "three"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

gsap.registerPlugin(useGSAP)

const transparentMaterial = new THREE.MeshStandardMaterial({
  color: "#dddddd",
  roughness: 0.7,
  metalness: 0,
  // depthTest:false,
  depthWrite: false,
  transparent: true,
  opacity: 0.4,
  // side: THREE.BackSide
})

export default function Building(props) {
  const building = useGLTF("./building_exterior.glb")
  const { nodes, materials } = useGLTF("./building_module.glb")

  const Rollos = useRef()
  const BuildingModule = useRef()

  building.scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
    }
  })

  useEffect(() => {
    const unsubscribeRoom = useRoom.subscribe(
      (state) => state.phase,
      (view) => {
        if (view == "detail") {
          Rollos.current.visible = false

          BuildingModule.current.children.forEach((mesh) => {
            mesh.userData = mesh.material
            mesh.material = transparentMaterial
            mesh.renderOrder = 99
          })
        } else {
          Rollos.current.visible = true
          BuildingModule.current.children.forEach((mesh) => {
            mesh.material = mesh.userData
            mesh.renderOrder = 0
          })
        }
      }
    )
    return () => {
      unsubscribeRoom()
    }
  })

  return (
    <>
      <primitive object={building.scene} />
      <group {...props} dispose={null}>
      <group position={[-22.308, -4.378, -0.941]} ref={BuildingModule}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh.geometry}
          material={materials.Base}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_1.geometry}
          material={materials['Glass Spiegelnd']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_2.geometry}
          material={materials['Dark Trim']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_3.geometry}
          material={materials.Accent}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_4.geometry}
          material={materials.Fensterrahmen}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_5.geometry}
          material={materials['Durchgang Stangen']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_6.geometry}
          material={materials.Dachmaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_7.geometry}
          material={materials['Metall brushed']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_8.geometry}
          material={materials.White}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_9.geometry}
          material={materials.Mauer}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BaseMesh_10.geometry}
          material={materials.Grass}
        />
      </group>
      <mesh
      ref={Rollos}
        castShadow
        receiveShadow
        geometry={nodes.Rollos.geometry}
        material={materials.Rollo}
        position={[12.37, 5.531, -6.051]}
      />
    </group>
      
    </>
  )
}

useGLTF.preload("./building_modules.glb")
