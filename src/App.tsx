import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";
import { PiePart } from "./components";

interface IShapesArr {
  shape: THREE.Shape;
  color: string;
  vector: THREE.Vector3;
}

function App() {
  const data = [
    { percent: 45, name: "apples", color: "blue" },
    { percent: 10, name: "bananas", color: "green" },
    { percent: 15, name: "oranges", color: "orange" },
    { percent: 25, name: "peaches", color: "pink" },
    { percent: 5, name: "grapefruits", color: "yellow" },
  ];

  const setShapesFromData = (radius: number, gap: number = 0) => {
    let part = 0;
    return data.reduce((shapes: IShapesArr[], item) => {
      const percent = (Math.PI * 2) / 100;
      const selfAngle = percent * item.percent;
      const finish = part + selfAngle;

      const shape = new THREE.Shape();
      shape.arc(0, 0, radius, part, finish);
      shape.lineTo(0, 0);

      const halfAngle = part + selfAngle / 2;

      const vectorAngle = new THREE.Vector3(gap, 0, 0).applyAxisAngle(
        new THREE.Vector3(0, 0, 1),
        halfAngle
      );

      part = finish;

      return [...shapes, { shape, color: item.color, vector: vectorAngle }];
    }, []);
  };

  return (
    <>
      <div
        style={{
          width: "400px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <Canvas style={{ width: "400px", height: "400px" }}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[20, 20, 20]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />

          {/* <axesHelper args={[5]} /> */}

          <mesh rotation={[-Math.PI / 5, 0, 0]} scale={2.3}>
            {setShapesFromData(2, 0.01).map((shape) => {
              return (
                <PiePart shape={shape} speed={1} depth={0.5} hoverDepth={0.8} />
              );
            })}
          </mesh>
        </Canvas>
        <div>fasgsagda</div>
      </div>
    </>
  );
}

export default App;
