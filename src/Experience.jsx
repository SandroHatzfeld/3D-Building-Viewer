import {
  Environment,
  Plane,
  SoftShadows,
  CameraControls,
  PerformanceMonitor,
} from "@react-three/drei"
import Building from "./Building.jsx"
import Rooms from "./Rooms.jsx"
import useRoom from "./store/useRoom.js"
import { Suspense, useEffect, useRef, useState } from "react"

const ACTION = Object.freeze({
  NONE: 0,
  ROTATE: 1,
  TRUCK: 2,
  OFFSET: 4,
  DOLLY: 8,
  ZOOM: 16,
  TOUCH_ROTATE: 32,
  TOUCH_TRUCK: 64,
  TOUCH_OFFSET: 128,
  TOUCH_DOLLY: 256,
  TOUCH_ZOOM: 512,
  TOUCH_DOLLY_TRUCK: 1024,
  TOUCH_DOLLY_OFFSET: 2048,
  TOUCH_DOLLY_ROTATE: 4096,
  TOUCH_ZOOM_TRUCK: 8192,
  TOUCH_ZOOM_OFFSET: 16384,
  TOUCH_ZOOM_ROTATE: 32768,
})

export default function Experience() {
  const cameraRef = useRef()
  const [degraded, setDegraded] = useState(false)
  
  useEffect(() => {
    const unsubscribePhase = useRoom.subscribe(
      (state) => state.phase,
      (phase) => {
        if (phase === "overview") {
          cameraRef.current.dollyTo(70, true)
          cameraRef.current.setTarget(0, 1, 0, true)
          cameraRef.current.setPosition(-49, 7, 30, true)
        }
      }
    )
    const unsubscribeRoomPos = useRoom.subscribe(
      (state) => state.currentRoomPos,
      (roomPos) => {
        if (roomPos) {
          cameraRef.current.dollyTo(40, true)
          cameraRef.current.setTarget(roomPos.x, roomPos.y, roomPos.z, true)
        }
      }
    )
    return () => {
      unsubscribePhase()
      unsubscribeRoomPos()
    }
  })

  return (
    <>
      <CameraControls
        ref={cameraRef}
        enableDamping
        enabled
        makeDefault
        mouseButtons={{
          left: ACTION.ROTATE,
          right: ACTION.ROTATE,
          wheel: ACTION.ZOOM,
        }}
        touches={{
          one: ACTION.TOUCH_ROTATE,
          two: ACTION.TOUCH_ZOOM,
          three: ACTION.NONE,
        }}
        maxPolarAngle={Math.PI * 0.49}
        enableZoom={true}
        target={[0, 1, 0]}
        maxDistance={90}
        minDistance={40}
      />
      <Environment
        preset=""
        files="./textures/buikslotermeerplein_1k.hdr"
        background={false}
        environmentIntensity={0.6}
      />
      <color args={["#f0e2ce"]} attach="background" />
      <PerformanceMonitor onDecline={() => setDegraded(true)}>
        {degraded ? (
          <directionalLight
            castShadow
            intensity={6}
            position={[36, 16, 28]}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0}
            shadow-camera-far={300}
            shadow-camera-top={20}
            shadow-camera-right={50}
            shadow-camera-bottom={-40}
            shadow-camera-left={-60}
            shadow-bias={-0.0007}
          />
        ) : (
          <>
            <directionalLight
              castShadow
              intensity={6}
              position={[36, 16, 28]}
              shadow-mapSize-width={1024 * 4}
              shadow-mapSize-height={1024 * 4}
              shadow-camera-near={0}
              shadow-camera-far={300}
              shadow-camera-top={20}
              shadow-camera-right={50}
              shadow-camera-bottom={-40}
              shadow-camera-left={-60}
              shadow-bias={-0.0007}
            />
            <SoftShadows samples={10} size={50} />
          </>
        )}
      </PerformanceMonitor>
      <Suspense>
        <Building />
      </Suspense>
      <Suspense>
        <Rooms />
      </Suspense>
      <Plane
        args={[500, 500]}
        receiveShadow
        rotation-x={-Math.PI * 0.5}
        position-y={[-14]}
      >
        <meshStandardMaterial color={"#ebc897"} roughness={1} />
      </Plane>
      <fog args={["#f0e2ce", 100, 200]} attach="fog" />
    </>
  )
}
