"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // Center the coordinates and correct for screen aspect ratio.
    vec2 centered = uv - 0.5;
    centered.x *= u_resolution.x / u_resolution.y;

    // Convert mouse position to normalized coordinates.
    vec2 mouse = u_mouse / u_resolution;
    vec2 mouseCentered = mouse - 0.5;
    mouseCentered.x *= u_resolution.x / u_resolution.y;

    // Create a soft glow around the mouse.
    float mouseDistance = distance(centered, mouseCentered);
    float mouseGlow = smoothstep(0.45, 0.0, mouseDistance);

    // Create slowly moving layered waves.
    float wave1 = sin(centered.x * 7.0 + u_time * 0.8) * 0.08;
    float wave2 = sin(centered.y * 5.0 - u_time * 0.6) * 0.05;
    float wave3 = sin((centered.x + centered.y) * 8.0 + u_time * 0.5) * 0.04;

    float wave = wave1 + wave2 + wave3;

    // Build the purple/blue color palette.
    vec3 color = vec3(
      0.08 + uv.x * 0.16 + wave + mouseGlow * 0.12,
      0.03 + uv.y * 0.10 + mouseGlow * 0.04,
      0.18 + uv.x * 0.24 + wave + mouseGlow * 0.18
    );

    // Add a subtle central light.
    float centerGlow = smoothstep(0.7, 0.0, length(centered));
    color += vec3(0.04, 0.02, 0.10) * centerGlow;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function FEAA3Page() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl");

    if (!gl) {
      alert("WebGL is not supported in this browser.");
      return;
    }

    function createShader(type, source) {
      const shader = gl.createShader(type);

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    const vertexShader = createShader(
      gl.VERTEX_SHADER,
      vertexShaderSource
    );

    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,

      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      positions,
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(
      program,
      "a_position"
    );

    gl.enableVertexAttribArray(positionLocation);

    gl.vertexAttribPointer(
      positionLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    const resolutionLocation = gl.getUniformLocation(
      program,
      "u_resolution"
    );

    const timeLocation = gl.getUniformLocation(
      program,
      "u_time"
    );

    const mouseLocation = gl.getUniformLocation(
      program,
      "u_mouse"
    );

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function resize() {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      );

      gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
      );

      // Start the mouse glow near the center.
      gl.uniform2f(
        mouseLocation,
        canvas.width / 2,
        canvas.height / 2
      );
    }

    const startTime = performance.now();

    let animationFrameId;

    function drawFrame() {
      const elapsed =
        (performance.now() - startTime) / 1000;

      gl.uniform1f(
        timeLocation,
        elapsed
      );

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );
    }

    function render() {
      drawFrame();

      animationFrameId =
        requestAnimationFrame(render);
    }

    function handleMouseMove(event) {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      const x = event.clientX * dpr;

      const y =
        (window.innerHeight - event.clientY) * dpr;

      gl.uniform2f(
        mouseLocation,
        x,
        y
      );

      if (reducedMotionQuery.matches) {
        drawFrame();
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!reducedMotionQuery.matches) {
        render();
      }
    }

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    if (reducedMotionQuery.matches) {
      drawFrame();
    } else {
      render();
    }

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      cancelAnimationFrame(
        animationFrameId
      );

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center text-white">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-white/70">
            TaskFlow
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Organize. Focus. Complete.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            A smarter way to manage your tasks with clarity,
            focus, and intelligent assistance.
          </p>
        </div>
      </div>
    </main>
  );
}

