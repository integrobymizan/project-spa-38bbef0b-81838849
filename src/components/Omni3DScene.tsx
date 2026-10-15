import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Omni3DSceneProps {
  currentSectionKey: string;
  onOmniClick?: () => void;
}

export function Omni3DScene({ currentSectionKey, onOmniClick }: Omni3DSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<any>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    let canvas = container.querySelector("canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "w-full h-full pointer-events-auto cursor-pointer";
      container.appendChild(canvas);
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let small = window.innerWidth < 760;
    const AMBER = 0xffb04a;
    const STEEL = 0x7fa7d9;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 10);

    // Studio Environment Lighting
    (() => {
      const env = new THREE.Scene();
      env.add(
        new THREE.Mesh(
          new THREE.BoxGeometry(12, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0x0d151d, side: THREE.BackSide }),
        ),
      );
      function panel(color: number, w: number, h: number, x: number, y: number, z: number) {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
        );
        m.position.set(x, y, z);
        m.lookAt(0, 0, 0);
        env.add(m);
      }
      panel(0xffffff, 6, 3, 0, 5.5, 2);
      panel(0xffc27a, 3, 6, -5.5, 0, 2);
      panel(0x8fb4e6, 3, 6, 5.5, 1, -2);
      panel(0xffffff, 4, 2, 2, 1, 5.5);
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(env, 0.04).texture;
      pmrem.dispose();
    })();

    scene.add(new THREE.AmbientLight(0x9fb3c8, 0.45));
    const key = new THREE.DirectionalLight(0xfff1e0, 1.5);
    key.position.set(-4, 6, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(STEEL, 1.2);
    rim.position.set(5, 3, -4);
    scene.add(rim);

    // Materials
    const shell = new THREE.MeshPhysicalMaterial({
      color: 0xeef1f4,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const dark = new THREE.MeshPhysicalMaterial({
      color: 0x111a23,
      roughness: 0.2,
      metalness: 0.6,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x04070b,
      roughness: 0.05,
      metalness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
    });
    const amberGlow = new THREE.MeshBasicMaterial({ color: AMBER, toneMapped: false });
    const steelGlow = new THREE.MeshBasicMaterial({ color: STEEL, toneMapped: false });

    // Glow Texture Helper
    const glowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(255,255,255,0.35)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();

    function glowSprite(color: number, size: number, opacity: number) {
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color,
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
        }),
      );
      s.scale.set(size, size, 1);
      return s;
    }

    // Build Robot Agent
    const agent = new THREE.Group();
    const rig = new THREE.Group();
    agent.add(rig);
    scene.add(agent);
    const pickables: THREE.Object3D[] = [];

    function addMesh(parent: THREE.Object3D, mesh: THREE.Mesh) {
      parent.add(mesh);
      pickables.push(mesh);
      return mesh;
    }

    // Torso Body
    const bodyProfile = [
      [0, -0.8],
      [0.42, -0.78],
      [0.66, -0.62],
      [0.76, -0.25],
      [0.75, 0.25],
      [0.64, 0.62],
      [0.42, 0.8],
      [0, 0.83],
    ].map((p) => new THREE.Vector2(p[0], p[1]));
    addMesh(rig, new THREE.Mesh(new THREE.LatheGeometry(bodyProfile, 64), shell));
    const belt = new THREE.Mesh(new THREE.TorusGeometry(0.755, 0.025, 12, 80), dark);
    belt.rotation.x = Math.PI / 2;
    belt.position.y = -0.2;
    rig.add(belt);

    // Chest Core
    const chest = new THREE.Group();
    chest.position.set(0, 0.22, 0.73);
    chest.rotation.x = -0.12;
    rig.add(chest);
    chest.add(new THREE.Mesh(new THREE.CircleGeometry(0.26, 48), glass));
    chest.add(new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.028, 12, 64), amberGlow));
    const diamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), amberGlow);
    diamond.position.z = 0.04;
    diamond.scale.set(1, 1, 0.4);
    chest.add(diamond);
    const chestGlow = glowSprite(AMBER, 1.1, 0.45);
    chestGlow.position.z = 0.05;
    chest.add(chestGlow);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.2, 32), dark);
    neck.position.y = 0.9;
    rig.add(neck);

    // Head Unit
    const head = new THREE.Group();
    head.position.y = 1.62;
    rig.add(head);
    const skull = addMesh(head, new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), shell));
    skull.scale.set(0.95, 0.76, 0.82);

    // Visor Face
    const visor = addMesh(
      head,
      new THREE.Mesh(
        new THREE.SphereGeometry(
          1,
          64,
          48,
          Math.PI * 0.13,
          Math.PI * 0.74,
          Math.PI * 0.24,
          Math.PI * 0.5,
        ),
        glass,
      ),
    );
    visor.scale.set(0.87, 0.74, 0.88);
    visor.position.z = 0.02;

    // Glowing Eyes
    const eyes: THREE.Mesh[] = [];
    [-0.3, 0.3].forEach((x) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 16), amberGlow);
      eye.scale.set(1, 1.45, 0.35);
      eye.position.set(x, 0.1, 0.9);
      head.add(eye);
      eyes.push(eye);
    });
    const eyeGlow = glowSprite(AMBER, 1.5, 0.3);
    eyeGlow.position.set(0, 0.1, 0.95);
    head.add(eyeGlow);

    // Waveform Mouth Bars
    const mouth: THREE.Mesh[] = [];
    for (let b = 0; b < 5; b++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.1, 0.02), amberGlow);
      bar.position.set((b - 2) * 0.085, -0.22, 0.875);
      bar.rotation.x = -0.28;
      head.add(bar);
      mouth.push(bar);
    }

    // Ear Pods
    [-1, 1].forEach((side) => {
      const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 32), dark);
      pod.rotation.z = Math.PI / 2;
      pod.position.set(side * 0.93, 0, 0);
      head.add(pod);
      const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.022, 10, 40), amberGlow);
      ringMesh.rotation.y = Math.PI / 2;
      ringMesh.position.set(side * 1.02, 0, 0);
      head.add(ringMesh);
    });

    // Headset Boom Mic
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.97, 0.035, 12, 64, Math.PI), dark);
    band.position.set(0, 0.02, -0.08);
    band.rotation.x = -0.12;
    head.add(band);
    const boomCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.0, -0.05, 0.08),
      new THREE.Vector3(-1.02, -0.42, 0.55),
      new THREE.Vector3(-0.42, -0.36, 0.84),
    );
    head.add(new THREE.Mesh(new THREE.TubeGeometry(boomCurve, 24, 0.022, 8, false), dark));
    const mic = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), dark);
    mic.position.copy(boomCurve.v2);
    head.add(mic);
    const micLight = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), amberGlow);
    micLight.position.copy(boomCurve.v2).add(new THREE.Vector3(0.02, 0.02, 0.05));
    head.add(micLight);

    // Antenna Light
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.32, 12), dark);
    stalk.position.set(0, 0.9, 0);
    head.add(stalk);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 16), amberGlow);
    tip.position.set(0, 1.1, 0);
    head.add(tip);
    const tipGlow = glowSprite(AMBER, 0.9, 0.6);
    tipGlow.position.copy(tip.position);
    head.add(tipGlow);

    // Floating Robotic Hands
    function makeHand() {
      const h = new THREE.Group();
      const palm = addMesh(h, new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 24), shell));
      palm.scale.set(1, 1.08, 0.85);
      const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.035, 10, 40), dark);
      cuff.rotation.x = Math.PI / 2;
      cuff.position.y = -0.17;
      h.add(cuff);
      rig.add(h);
      return h;
    }
    const handL = makeHand(),
      handR = makeHand();
    handL.position.set(-1.05, -0.15, 0.2);
    handR.position.set(1.05, -0.15, 0.2);

    // Hover Thruster Base
    const base = new THREE.Group();
    base.position.y = -1.2;
    agent.add(base);
    const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.03, 12, 80), steelGlow);
    baseRing.rotation.x = Math.PI / 2;
    base.add(baseRing);
    const baseRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.012, 8, 80), amberGlow);
    baseRing2.rotation.x = Math.PI / 2;
    base.add(baseRing2);
    const baseGlow = glowSprite(STEEL, 2.6, 0.35);
    baseGlow.scale.set(2.6, 0.9, 1);
    base.add(baseGlow);

    // Dust Particles
    const dust = (() => {
      const count = small ? 300 : 700;
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const z = Math.random() * 2 - 1,
          t = Math.random() * Math.PI * 2,
          r = 14 + Math.random() * 26,
          q = Math.sqrt(1 - z * z);
        arr[i * 3] = q * Math.cos(t) * r;
        arr[i * 3 + 1] = z * r * 0.6;
        arr[i * 3 + 2] = q * Math.sin(t) * r - 12;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      const d = new THREE.Points(
        g,
        new THREE.PointsMaterial({
          color: STEEL,
          size: 0.07,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
        }),
      );
      scene.add(d);
      return d;
    })();

    // Flight Positions per section
    const CORNER = [-1.35, -3.1, 0.25, 0.3, 0];
    const defaultSpot = { d: [3.2, 0, 1, -0.3, 1], m: [-0.9, 2.15, 0.45, 0.3, 1] };
    const LAYOUT: Record<string, { d: number[]; m: number[] }> = {
      core: defaultSpot,
      services: { d: [3.5, 2.0, 0.5, -0.45, 1], m: CORNER },
      audiences: { d: [3.5, 2.35, 0.48, -0.4, 1], m: CORNER },
      kk: { d: [5.8, 2.7, 0.4, -0.5, -1], m: CORNER },
      process: { d: [3.5, 2.2, 0.55, -0.4, 1], m: CORNER },
      calculator: { d: [3.5, 2.2, 0.55, -0.4, 1], m: CORNER },
      faq: { d: [-4.4, -1.6, 0.7, 0.45, -1], m: CORNER },
      finale: { d: [0, 1.4, 0.85, 0, 1], m: [-0.9, 1.6, 0.45, 0.3, 1] },
      contact: { d: [-4.5, -1.6, 0.6, 0.45, -1], m: CORNER },
    };
    const POSE: Record<string, string> = {
      core: "wave",
      finale: "wave",
      services: "present",
      audiences: "present",
      kk: "present",
      process: "present",
      calculator: "think",
      faq: "think",
      contact: "present",
    };

    let elapsed = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    let lastX: number | null = null,
      lean = 0;
    const blink = { next: 2, t: -1 };
    const wave = { until: 2.6 };
    const spin = { t: -1 };
    const v3 = new THREE.Vector3(),
      hL = new THREE.Vector3(),
      hR = new THREE.Vector3();

    function update(dt: number) {
      elapsed += dt;

      const spot = LAYOUT[currentSectionKey] || defaultSpot;
      const targetArr = spot[small ? "m" : "d"] || defaultSpot.d;
      const tx = targetArr[0] ?? 3.2;
      const ty = targetArr[1] ?? 0;
      const ts = targetArr[2] ?? 1;
      const tf = targetArr[3] ?? -0.3;

      if (lastX !== null && dt > 0)
        lean += (((tx - lastX) / dt) * -0.04 - lean) * Math.min(1, dt * 4);
      lastX = tx;

      const lerpSpeed = reduceMotion ? 1 : Math.min(1, dt * 4);
      agent.position.x += (tx - agent.position.x) * lerpSpeed;
      agent.position.y += (ty - 0.8 * ts - agent.position.y) * lerpSpeed;
      agent.scale.setScalar(agent.scale.x + (ts - agent.scale.x) * lerpSpeed);

      rig.position.y = reduceMotion ? 0 : Math.sin(elapsed * 1.6) * 0.08;
      rig.rotation.z =
        Math.max(-0.35, Math.min(0.35, lean)) +
        (reduceMotion ? 0 : Math.sin(elapsed * 0.9) * 0.025);

      let spinAngle = 0;
      if (spin.t >= 0) {
        spin.t += dt;
        const k = Math.min(1, spin.t / 1.1);
        spinAngle = Math.PI * 2 * (1 - Math.pow(1 - k, 3));
        if (k >= 1) spin.t = -1;
      }
      agent.rotation.y += (tf + spinAngle - agent.rotation.y) * lerpSpeed;

      head.localToWorld(v3.set(0, 0, 0));
      v3.project(camera);
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 5);
      const lookX = pointer.active
        ? Math.max(-0.75, Math.min(0.75, (pointer.x - v3.x) * 1.1))
        : Math.sin(elapsed * 0.4) * 0.15;
      const lookY = pointer.active ? Math.max(-0.4, Math.min(0.45, (pointer.y - v3.y) * 0.8)) : 0;
      const ease = reduceMotion ? 1 : Math.min(1, dt * 6);
      head.rotation.y += (lookX - tf - head.rotation.y) * ease;
      head.rotation.x += (-lookY - head.rotation.x) * ease;
      head.rotation.z = -head.rotation.y * 0.08;

      if (elapsed > blink.next && blink.t < 0 && !reduceMotion) blink.t = 0;
      let eyeY = 1.45;
      if (blink.t >= 0) {
        blink.t += dt;
        eyeY = 1.45 * Math.abs(Math.cos(Math.min(1, blink.t / 0.16) * Math.PI));
        if (blink.t > 0.16) {
          blink.t = -1;
          blink.next = elapsed + 2 + Math.random() * 3.5;
        }
      }
      eyes.forEach((e, i) => {
        e.scale.y = Math.max(0.12, eyeY);
        e.position.x = (i ? 0.3 : -0.3) + lookX * 0.03;
      });

      // Subtle talking animation
      const talking = Math.sin(elapsed * 4) > 0;
      mouth.forEach((m, i) => {
        m.scale.y = talking
          ? 0.35 + Math.abs(Math.sin(elapsed * 12 + i * 1.7)) * 1.4
          : 0.5 + Math.sin(elapsed * 2 + i * 0.8) * 0.15;
      });

      const pulse = 0.5 + 0.5 * Math.sin(elapsed * 2.2);
      chestGlow.material.opacity = 0.3 + pulse * 0.3;
      tipGlow.material.opacity = 0.4 + pulse * 0.4;
      diamond.rotation.z = elapsed * 0.8;
      baseRing.rotation.z = elapsed * 0.5;
      baseRing2.scale.setScalar(1 + pulse * 0.08);
      baseGlow.material.opacity = 0.25 + pulse * 0.15;

      // Gestures (Wave, Present, Think)
      const currentPose = POSE[currentSectionKey] || "idle";
      const waving = elapsed < wave.until && !reduceMotion;
      const contentSide = tx > 0.5 ? -1 : 1;
      const t2 = elapsed;

      hL.set(-1.05, -0.15 + Math.sin(t2 * 1.6 + 1) * 0.05, 0.2);
      hR.set(1.05, -0.15 + Math.sin(t2 * 1.6) * 0.05, 0.2);

      if (currentPose === "present") {
        (contentSide < 0 ? hL : hR).set(contentSide * 1.35, 0.35 + Math.sin(t2 * 1.4) * 0.05, 0.75);
      } else if (currentPose === "think") {
        (contentSide < 0 ? hL : hR).set(contentSide * 0.42, 0.95 + Math.sin(t2 * 1.2) * 0.02, 0.85);
      }

      const waveHand = contentSide < 0 ? hR : hL,
        waveSign = contentSide < 0 ? 1 : -1;
      if (waving || currentPose === "wave") {
        const w = waving ? 1 : 0.35;
        waveHand.set(
          waveSign * (1.2 + Math.sin(t2 * 9) * 0.18 * w),
          1.35 + Math.cos(t2 * 9) * 0.05 * w,
          0.35,
        );
      }
      const hk = reduceMotion ? 1 : Math.min(1, dt * 7);
      handL.position.lerp(hL, hk);
      handR.position.lerp(hR, hk);

      dust.rotation.y = elapsed * 0.01;
    }

    function render() {
      renderer.render(scene, camera);
    }

    function resize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      small = w < 760;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (reduceMotion) {
        update(0);
        render();
      }
    }

    window.addEventListener("resize", resize);
    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.active = true;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const raycaster = new THREE.Raycaster(),
      ndc = new THREE.Vector2();
    const onClick = (e: MouseEvent) => {
      ndc.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.intersectObjects(pickables, false).length) return;
      wave.until = elapsed + 2.2;
      if (!reduceMotion) spin.t = 0;
      if (onOmniClick) onOmniClick();
    };
    window.addEventListener("click", onClick);

    let lastTime = performance.now();
    let rafId = 0;
    function frame(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      update(dt);
      render();
      rafId = requestAnimationFrame(frame);
    }

    resize();
    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame);
    } else {
      update(0);
      render();
    }

    agentRef.current = {
      triggerSpin: () => {
        spin.t = 0;
        wave.until = elapsed + 2.5;
      },
    };

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      renderer.dispose();
    };
  }, [currentSectionKey, onOmniClick]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
