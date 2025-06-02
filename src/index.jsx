import "./style.css";
import { createRoot } from "react-dom/client";
import { Canvas } from '@react-three/fiber';
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";
import { StrictMode, Suspense } from "react";
import { Loader } from "@react-three/drei";

const root = createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <Canvas
      id="canvas"
      camera={{
        fov: 70,
        near: 1,
        far: 500,
        position: [-49, 7, 30],
      }}
      shadows
    >
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
    <Interface />
    <Loader
      dataStyles={{
        fontSize: "1rem",
      }}
      dataInterpolation={(p) => `${p.toFixed()}% geladen`}
    />
  </StrictMode>
);
