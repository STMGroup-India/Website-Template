"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── F1 2025 Calendar Circuit Locations ── */
const F1_CIRCUITS = [
  { name: "Bahrain", lat: 26.0325, lng: 50.5106 },
  { name: "Jeddah", lat: 21.6319, lng: 39.1044 },
  { name: "Melbourne", lat: -37.8497, lng: 144.968 },
  { name: "Suzuka", lat: 34.8431, lng: 136.541 },
  { name: "Shanghai", lat: 31.3389, lng: 121.22 },
  { name: "Miami", lat: 25.9581, lng: -80.2389 },
  { name: "Imola", lat: 44.3439, lng: 11.7167 },
  { name: "Monaco", lat: 43.7347, lng: 7.4206 },
  { name: "Barcelona", lat: 41.57, lng: 2.2611 },
  { name: "Montréal", lat: 45.5017, lng: -73.5228 },
  { name: "Spielberg", lat: 47.2197, lng: 14.7647 },
  { name: "Silverstone", lat: 52.0786, lng: -1.0169 },
  { name: "Spa", lat: 50.4372, lng: 5.9714 },
  { name: "Zandvoort", lat: 52.3888, lng: 4.5409 },
  { name: "Monza", lat: 45.6156, lng: 9.2811 },
  { name: "Baku", lat: 40.3725, lng: 49.8533 },
  { name: "Singapore", lat: 1.2914, lng: 103.8644 },
  { name: "Austin", lat: 30.1328, lng: -97.6411 },
  { name: "Mexico City", lat: 19.4042, lng: -99.0907 },
  { name: "São Paulo", lat: -23.7014, lng: -46.6969 },
  { name: "Las Vegas", lat: 36.1147, lng: -115.1728 },
  { name: "Lusail", lat: 25.49, lng: 51.4542 },
  { name: "Abu Dhabi", lat: 24.4672, lng: 54.6031 },
];

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function F1Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe group (everything rotates together)
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 1.6;

    // Wireframe sphere (the globe)
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 48, 48);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const wireframe = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(wireframe);

    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const curve = new THREE.EllipseCurve(
        0, 0,
        GLOBE_RADIUS * Math.cos(lat * Math.PI / 180),
        GLOBE_RADIUS * Math.cos(lat * Math.PI / 180),
        0, 2 * Math.PI, false, 0
      );
      const points = curve.getPoints(100);
      const geo = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, GLOBE_RADIUS * Math.sin(lat * Math.PI / 180), p.y))
      );
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 }));
      globeGroup.add(line);
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 100; i++) {
        const lat = -90 + (180 * i / 100);
        points.push(latLngToVec3(lat, lng, GLOBE_RADIUS));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 }));
      globeGroup.add(line);
    }

    // Atmosphere glow (outer ring)
    const atmosphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.88, 0.11, 0.29, intensity * 0.3);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphere);

    // F1 circuit markers + labels
    const circuitPoints: { mesh: THREE.Mesh; label: THREE.Sprite; pos: THREE.Vector3 }[] = [];

    F1_CIRCUITS.forEach((circuit) => {
      const pos = latLngToVec3(circuit.lat, circuit.lng, GLOBE_RADIUS);

      // Glowing dot
      const dotGeo = new THREE.SphereGeometry(0.02, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Outer glow ring
      const ringGeo = new THREE.RingGeometry(0.025, 0.04, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe11d48,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);

      // Text label as sprite
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = 256;
      canvas.height = 64;
      ctx.clearRect(0, 0, 256, 64);
      ctx.font = "bold 22px Inter, system-ui, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.textAlign = "center";
      ctx.fillText(circuit.name, 128, 38);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      const labelPos = latLngToVec3(circuit.lat, circuit.lng, GLOBE_RADIUS + 0.12);
      sprite.position.copy(labelPos);
      sprite.scale.set(0.4, 0.1, 1);
      globeGroup.add(sprite);

      circuitPoints.push({ mesh: dot, label: sprite, pos });
    });

    // Tilt the globe slightly
    globeGroup.rotation.x = 0.15;

    // Animation
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.001;

      // Slow auto-rotation
      globeGroup.rotation.y = time * 0.5;

      // Pulse the circuit dots
      circuitPoints.forEach((cp, i) => {
        const scale = 1 + 0.3 * Math.sin(time * 8 + i * 0.5);
        cp.mesh.scale.setScalar(scale);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-none opacity-30 sm:opacity-50"
      aria-hidden="true"
    />
  );
}
