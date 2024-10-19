import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

import "./style.scss";

interface IShapesArr {
  shape: THREE.Shape;
  color: string;
  vector: THREE.Vector3;
}

interface IProps {
  shape: IShapesArr;
  depth?: number;
  hoverDepth?: number;
  speed?: number;
}

const PiePart = ({ shape, depth = 1, hoverDepth = 1.5, speed = 1 }: IProps) => {
  const [partDepth, setPartDepth] = useState(depth);
  const [isDecrease, setIsDecrease] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    setTimeout(() => setOpen(false), 1000);
  }, [open]);

  useFrame((_, delta) => {
    if (isDecrease) {
      if (partDepth <= depth) {
        setPartDepth(depth);
        return;
      }

      setPartDepth(partDepth - delta * speed);
    } else {
      if (partDepth >= hoverDepth) {
        setPartDepth(hoverDepth);
        return;
      }

      setPartDepth(partDepth + delta * speed);
    }
  });

  const extrudeSettings = {
    steps: 1,

    depth: partDepth,

    bevelEnabled: false,
    bevelThickness: 0.1,

    bevelSize: 0.5,

    bevelSegments: 0,
  };

  return (
    <>
      <mesh
        scale={0.5}
        position={shape.vector}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setIsDecrease(false);
        }}
        onPointerLeave={(event) => {
          event.stopPropagation();
          setIsDecrease(true);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsDecrease((prev) => !prev);
        }}
      >
        <extrudeGeometry args={[shape.shape, extrudeSettings]} />
        <meshStandardMaterial color={shape.color} />
      </mesh>
    </>
  );
};

export default PiePart;
