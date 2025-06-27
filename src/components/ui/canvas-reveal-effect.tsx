
"use client";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors ?? [[0, 255, 255]]}
          dotSize={dotSize ?? 3}
          opacities={opacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
          shader={`
            float animation_speed_factor = ${animationSpeed.toFixed(1)};
            float intro_offset = 0.01;
            float step_value = 150.0;
            float block_size = step_value * 2.0;
            float grada_size = block_size;
            float fade_factor = 0.9;

            float a(float x) {
              return pow(x, 5.0);
            }
            
            float s(float x) {
              return smoothstep(0.0, 1.0, x);
            }

            float amax(float x, float y) {
              return max(x, y);
            }
            
            float pulse(float x) {
              return pow(amax(0.0, sin(x * 3.1415) * 0.5 + 0.5), 10.0);
            }
            
            float random(vec2 st) {
              return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }
            
            vec3 hsv2rgb(vec3 c) {
              vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
              vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
              return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }

            float get_density(vec2 coord, float t) {
              float intro = pow(amax(0.0, 1.0 - t * animation_speed_factor * 0.2), 2.0);
              return intro;
            }

            float get_grada(vec2 coord, float t) {
              float intro = pow(amax(0.0, 1.0 - t * animation_speed_factor * 0.2), 2.0);
              
              vec2 p = coord * grada_size;
              float x = p.x;
              float y = p.y;
              
              float r = random(floor(p / 1.0) * 1.0) * 10.0;
              float pulse_value = pulse((t * animation_speed_factor * 0.5) - r);
              
              float grada_val = 1.0 - s(pulse_value * 2.0);
              return grada_val;
            }

            float get_block(vec2 coord, float t) {
              float intro = pow(amax(0.0, 1.0 - t * animation_speed_factor * 0.2), 2.0);
              float x = coord.x * block_size;
              float y = coord.y * block_size;
              float r = random(floor(vec2(x, y) / step_value) * step_value);
              float pulse_value = pulse(t * animation_speed_factor * 0.2 - r);
              return 1.0 - pulse_value;
            }

            void main() {
              vec2 coord = gl_PointCoord.xy;
              float t = u_time * animation_speed_factor;

              float density = get_density(coord, t);
              float block = get_block(coord, t);
              float grada = get_grada(coord, t);
              
              float d = distance(coord, vec2(0.5));
              
              float val = 0.0;
              val = grada;
              
              vec3 hsv = vec3(u_hue, 0.8, val);
              vec3 rgb = hsv2rgb(hsv);
              
              gl_FragColor = vec4(rgb, val * pow(1.0 - d * 2.0, 2.0));
            }
        `}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-gradient-to-t from-background via-background/50 to-transparent w-full h-full" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors: number[][];
  opacities: number[];
  shader: string;
  dotSize: number;
  center?: [number, number];
}

const DotMatrix = ({
  colors,
  opacities,
  shader,
  dotSize,
  center = [0, 0],
}: DotMatrixProps) => {
  const SIZES = [32, 64, 128, 256, 512, 1024];

  const size = SIZES[Math.floor(Math.random() * SIZES.length)];

  return (
    <Canvas
      flat
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Dots
        colors={colors}
        opacities={opacities}
        shader={shader}
        size={size}
        dotSize={dotSize}
        center={center}
      />
    </Canvas>
  );
};

const Dots = ({
  size,
  colors,
  opacities,
  shader,
  dotSize,
  center,
}: {
  size: number;
  colors: number[][];
  opacities: number[];
  shader: string;
  dotSize: number;
  center: [number, number];
}) => {
  const ref = useRef<THREE.Points | null>(null);
  const { viewport } = useThree();

  const [ww, wh] = [viewport.width, viewport.height];

  const [hue, saturation, value] = colors[Math.floor(Math.random() * colors.length)];
  const huef = hue! / 360;

  const geo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < size * size; i++) {
      vertices.push((i % size) - size / 2, Math.floor(i / size) - size / 2, 0);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, [size]);

  const mat = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_hue: { value: huef },
      },
      vertexShader: `
        attribute vec3 position;
        uniform float u_time;

        void main() {
          vec3 pos = position;
          pos.z = 1.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = ${dotSize.toFixed(1)};
        }
      `,
      fragmentShader: shader,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: false,
      depthWrite: false,
    });
    return mat;
  }, [shader, huef, dotSize]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <points
      ref={ref}
      position={[center[0], center[1], 0]}
      scale={[ww / size, wh / size, 1]}
      geometry={geo}
      material={mat}
    />
  );
};
