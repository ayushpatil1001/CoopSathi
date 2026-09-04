import React, { useEffect, useRef } from 'react';

interface StitchShaderWaveformProps {
  isActive?: boolean;
}

export const StitchShaderWaveform: React.FC<StitchShaderWaveformProps> = ({ isActive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;

    const syncSize = () => {
      const w = canvas.clientWidth || 600;
      const h = canvas.clientHeight || 180;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        
        // Multiple sine waves for the equalizer effect
        float wave1 = sin(uv.x * 20.0 + u_time * 5.0) * 0.12 * sin(u_time * 2.0);
        float wave2 = sin(uv.x * 35.0 - u_time * 7.0) * 0.06 * cos(u_time * 1.5);
        float wave3 = sin(uv.x * 50.0 + u_time * 10.0) * 0.03 * sin(u_time * 3.0);
        
        float combinedWave = wave1 + wave2 + wave3;
        
        // Vertical lines centered vertically
        float linePos = 0.5 + combinedWave;
        float dist = abs(uv.y - linePos);
        
        // Colors inspired by India's tricolor and the Deep Navy theme
        vec3 colorSaffron = vec3(1.0, 0.6, 0.2);  // #FF9933
        vec3 colorEmerald = vec3(0.07, 0.53, 0.03); // #138808
        vec3 colorWhite = vec3(1.0, 1.0, 1.0);
        
        vec3 finalColor = mix(colorSaffron, colorEmerald, uv.x);
        finalColor = mix(finalColor, colorWhite, 0.5 + 0.5 * sin(u_time));
        
        // Glow effect
        float glow = smoothstep(0.12, 0.0, dist);
        vec3 outColor = finalColor * glow;
        
        gl_FragColor = vec4(outColor, glow * 0.85);
      }
    `;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vert = createShader(gl.VERTEX_SHADER, vs);
    const frag = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let startTime = performance.now();

    const render = (time: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      const elapsed = (time - startTime) * 0.001;
      if (uTime) gl.uniform1f(uTime, elapsed);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl opacity-65"
      style={{ display: 'block' }}
    />
  );
};
