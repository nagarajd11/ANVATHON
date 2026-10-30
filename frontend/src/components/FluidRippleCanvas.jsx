import React, { useEffect, useRef } from 'react';

/**
 * Interactive WebGL Water Ripple & Fluid Wave Shader
 * 
 * - Simulates 2D discrete shallow water wave equations at silky 60fps.
 * - Spawns fluid ripples dynamically on continuous mousemove, click, and touch.
 * - Computes surface normals from wave heights for Fresnel reflections, specular highlights,
 *   and emerald caustic liquid refractions.
 * - Zero external dependencies; 100% pure WebGL with graceful fallbacks.
 */
export default function FluidRippleCanvas({ enabled = true, videoRef = null }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastMouseRef = useRef({ x: -1, y: -1, time: 0 });
  const idleTimerRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get WebGL context (WebGL 2 or WebGL 1)
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported for fluid ripple effect.');
      return;
    }

    // Check for float texture support
    const extFloat = gl.getExtension('OES_texture_float');
    const extHalfFloat = gl.getExtension('OES_texture_half_float');
    const extLinear = gl.getExtension('OES_texture_float_linear') || gl.getExtension('OES_texture_half_float_linear');

    // Determine best texture type (Float if available, else UNSIGNED_BYTE)
    let textureType = gl.UNSIGNED_BYTE;
    if (extFloat) {
      textureType = gl.FLOAT;
    } else if (extHalfFloat) {
      textureType = extHalfFloat.HALF_FLOAT_OES;
    }

    // Grid simulation resolution (256x256 or 512x512 is optimal for 60fps physics)
    const SIM_RES = 384;
    const simWidth = SIM_RES;
    const simHeight = SIM_RES;

    // --- Shader Sources ---
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Drop Shader: Injects a wave perturbation
    const dropShaderSource = `
      precision highp float;
      uniform sampler2D u_texture;
      uniform vec2 u_center;
      uniform float u_radius;
      uniform float u_strength;
      varying vec2 v_uv;

      void main() {
        vec4 info = texture2D(u_texture, v_uv);
        float d = distance(v_uv, u_center);
        if (d < u_radius) {
          float factor = (cos(d / u_radius * 3.14159265) * 0.5 + 0.5) * u_strength;
          info.r += factor;
        }
        gl_FragColor = info;
      }
    `;

    // Update Shader: 2D wave equation ping-pong step
    const updateShaderSource = `
      precision highp float;
      uniform sampler2D u_texture;
      uniform vec2 u_delta;
      uniform float u_damping;
      varying vec2 v_uv;

      void main() {
        vec4 info = texture2D(u_texture, v_uv);
        
        float left   = texture2D(u_texture, v_uv - vec2(u_delta.x, 0.0)).r;
        float right  = texture2D(u_texture, v_uv + vec2(u_delta.x, 0.0)).r;
        float bottom = texture2D(u_texture, v_uv - vec2(0.0, u_delta.y)).r;
        float top    = texture2D(u_texture, v_uv + vec2(0.0, u_delta.y)).r;
        
        // Discretized wave equation
        float average = (left + right + bottom + top) * 0.5;
        float newHeight = (average - info.g) * u_damping;
        
        // r = new height, g = current height (which becomes old height)
        gl_FragColor = vec4(newHeight, info.r, 0.0, 1.0);
      }
    `;

    // Render Shader: Normal vectors, caustics, and specular sunlight glints
    const renderShaderSource = `
      precision highp float;
      uniform sampler2D u_water;
      uniform vec2 u_delta;
      varying vec2 v_uv;

      void main() {
        float left   = texture2D(u_water, v_uv - vec2(u_delta.x, 0.0)).r;
        float right  = texture2D(u_water, v_uv + vec2(u_delta.x, 0.0)).r;
        float bottom = texture2D(u_water, v_uv - vec2(0.0, u_delta.y)).r;
        float top    = texture2D(u_water, v_uv + vec2(0.0, u_delta.y)).r;
        
        // Surface normal
        vec2 normal2D = vec2((right - left) * 5.0, (top - bottom) * 5.0);
        vec3 normal = normalize(vec3(normal2D, 1.0));
        
        // Directional sunlight onto terrace water surface
        vec3 lightDir = normalize(vec3(-0.4, 0.6, 0.7));
        vec3 viewDir  = vec3(0.0, 0.0, 1.0);
        vec3 halfVec  = normalize(lightDir + viewDir);
        
        // Specular glint
        float spec = pow(max(dot(normal, halfVec), 0.0), 28.0);
        float waveDist = length(normal2D);
        
        // Organic emerald water caustics
        vec3 causticEmerald = vec3(0.20, 0.88, 0.58);
        vec3 sunGlint = vec3(0.96, 1.0, 0.94);
        
        vec3 color = causticEmerald * waveDist * 1.8;
        color += sunGlint * (spec * 1.8);
        
        // Transparency: invisible when calm, sparkling emerald waves when rippling
        float alpha = clamp(waveDist * 2.8 + spec * 2.0, 0.0, 0.78);
        
        gl_FragColor = vec4(color, alpha);
      }
    `;

    // --- Helper to create and compile shaders ---
    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(vertSrc, fragSrc) {
      const vert = createShader(gl.VERTEX_SHADER, vertSrc);
      const frag = createShader(gl.FRAGMENT_SHADER, fragSrc);
      const prog = gl.createProgram();
      gl.attachShader(prog, vert);
      gl.attachShader(prog, frag);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(prog));
        return null;
      }
      return prog;
    }

    const dropProg = createProgram(vertexShaderSource, dropShaderSource);
    const updateProg = createProgram(vertexShaderSource, updateShaderSource);
    const renderProg = createProgram(vertexShaderSource, renderShaderSource);

    if (!dropProg || !updateProg || !renderProg) return;

    // Fullscreen Quad Buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
      ]),
      gl.STATIC_DRAW
    );

    // Framebuffer setup for ping-pong texture simulation
    function createTexture() {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, extLinear ? gl.LINEAR : gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, extLinear ? gl.LINEAR : gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, simWidth, simHeight, 0, gl.RGBA, textureType, null);
      return tex;
    }

    function createFBO(tex) {
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return fbo;
    }

    let textureA = createTexture();
    let textureB = createTexture();
    let fboA = createFBO(textureA);
    let fboB = createFBO(textureB);

    // Resize Canvas to device screen size
    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(window.innerWidth * dpr);
      const displayHeight = Math.floor(window.innerHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Uniform locations
    const dropUniforms = {
      texture: gl.getUniformLocation(dropProg, 'u_texture'),
      center: gl.getUniformLocation(dropProg, 'u_center'),
      radius: gl.getUniformLocation(dropProg, 'u_radius'),
      strength: gl.getUniformLocation(dropProg, 'u_strength')
    };

    const updateUniforms = {
      texture: gl.getUniformLocation(updateProg, 'u_texture'),
      delta: gl.getUniformLocation(updateProg, 'u_delta'),
      damping: gl.getUniformLocation(updateProg, 'u_damping')
    };

    const renderUniforms = {
      water: gl.getUniformLocation(renderProg, 'u_water'),
      delta: gl.getUniformLocation(renderProg, 'u_delta')
    };

    // Pending drops queue
    const pendingDrops = [];

    function addDrop(x, y, radius = 0.035, strength = 0.045) {
      // Invert Y coordinate for WebGL texture space
      pendingDrops.push({ x, y: 1.0 - y, radius, strength });
    }

    // --- Interactive Mouse & Touch Listeners ---
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      const now = performance.now();
      const dx = x - lastMouseRef.current.x;
      const dy = y - lastMouseRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Only spawn ripple if mouse moved enough distance
      if (dist > 0.008 || now - lastMouseRef.current.time > 80) {
        const speedFactor = Math.min(Math.max(dist * 2.5, 0.02), 0.07);
        addDrop(x, y, 0.032, speedFactor);
        lastMouseRef.current = { x, y, time: now };
      }

      idleTimerRef.current = now;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const x = touch.clientX / window.innerWidth;
        const y = touch.clientY / window.innerHeight;
        addDrop(x, y, 0.042, 0.055);
        idleTimerRef.current = performance.now();
      }
    };

    const handleClick = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      // Stronger splash on click
      addDrop(x, y, 0.055, 0.09);
      idleTimerRef.current = performance.now();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Initial welcoming splash
    setTimeout(() => {
      addDrop(0.5, 0.45, 0.06, 0.08);
    }, 600);

    // --- Render Loop (60fps requestAnimationFrame) ---
    const render = () => {
      const now = performance.now();

      // Ambient raindrop when user is idle for > 3 seconds
      if (now - idleTimerRef.current > 3200) {
        const rx = 0.2 + Math.random() * 0.6;
        const ry = 0.2 + Math.random() * 0.6;
        addDrop(rx, ry, 0.025, 0.035);
        idleTimerRef.current = now - 1800; // Schedule next idle drop in ~1.4s
      }

      gl.viewport(0, 0, simWidth, simHeight);

      // 1. Process all pending cursor drops
      while (pendingDrops.length > 0) {
        const drop = pendingDrops.shift();

        gl.bindFramebuffer(gl.FRAMEBUFFER, fboB);
        gl.useProgram(dropProg);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureA);
        gl.uniform1i(dropUniforms.texture, 0);

        gl.uniform2f(dropUniforms.center, drop.x, drop.y);
        gl.uniform1f(dropUniforms.radius, drop.radius);
        gl.uniform1f(dropUniforms.strength, drop.strength);

        const aPosDrop = gl.getAttribLocation(dropProg, 'a_position');
        gl.enableVertexAttribArray(aPosDrop);
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.vertexAttribPointer(aPosDrop, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Swap ping-pong textures
        let tempTex = textureA;
        textureA = textureB;
        textureB = tempTex;

        let tempFbo = fboA;
        fboA = fboB;
        fboB = tempFbo;
      }

      // 2. Physics Wave Equation Update Step
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB);
      gl.useProgram(updateProg);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureA);
      gl.uniform1i(updateUniforms.texture, 0);

      gl.uniform2f(updateUniforms.delta, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1f(updateUniforms.damping, 0.985); // Natural gentle water damping

      const aPosUpdate = gl.getAttribLocation(updateProg, 'a_position');
      gl.enableVertexAttribArray(aPosUpdate);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.vertexAttribPointer(aPosUpdate, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Swap buffers
      let tempTex = textureA;
      textureA = textureB;
      textureB = tempTex;

      let tempFbo = fboA;
      fboA = fboB;
      fboB = tempFbo;

      // 3. Screen Render Pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.useProgram(renderProg);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureA);
      gl.uniform1i(renderUniforms.water, 0);

      gl.uniform2f(renderUniforms.delta, 1.0 / simWidth, 1.0 / simHeight);

      const aPosRender = gl.getAttribLocation(renderProg, 'a_position');
      gl.enableVertexAttribArray(aPosRender);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.vertexAttribPointer(aPosRender, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Cleanup resources on unmount or when disabled
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('click', handleClick);

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      gl.deleteBuffer(quadBuffer);
      gl.deleteTexture(textureA);
      gl.deleteTexture(textureB);
      gl.deleteFramebuffer(fboA);
      gl.deleteFramebuffer(fboB);
      gl.deleteProgram(dropProg);
      gl.deleteProgram(updateProg);
      gl.deleteProgram(renderProg);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-[2] pointer-events-none select-none transition-opacity duration-700 ease-in-out"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.92
      }}
    />
  );
}

