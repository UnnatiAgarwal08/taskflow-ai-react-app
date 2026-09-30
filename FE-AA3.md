# FE-AA3 — Signature Hero: A Fullscreen Shader

## Overview
FE-AA3 adds a fullscreen WebGL fragment shader as an interactive hero section for TaskFlow.
The shader creates an animated purple/blue background with layered waves and a soft glow that follows the user's mouse.
## Technologies
* WebGL
* GLSL
* React
* Next.js
* Tailwind CSS


## Shader Uniforms
The fragment shader uses three uniforms:
* `u_time` — controls the continuous animation.
* `u_resolution` — provides the canvas dimensions and helps keep the shader responsive.
* `u_mouse` — controls the position of the interactive mouse glow.


## Shader Structure

### 1. Normalized Coordinates
`gl_FragCoord` is divided by `u_resolution` to convert the current pixel position into normalized coordinates.


### 2. Aspect Ratio Correction
The centered coordinates are adjusted using the canvas width and height so radial effects remain visually consistent across different screen sizes.


### 3. Animated Waves
Multiple sine waves are combined to create the moving background pattern.


### 4. Mouse Glow
The distance between the current pixel and `u_mouse` is calculated. `smoothstep()` creates a soft glow around the cursor.


### 5. Color Palette
The shader combines the wave values, normalized coordinates, and mouse glow to create the purple/blue hero background.


## Performance and Accessibility
Device pixel ratio is capped at `2` to prevent excessive GPU rendering cost on high-density displays.
Animation is paused when the browser tab becomes hidden.
When `prefers-reduced-motion: reduce` is enabled, the animated render loop is disabled and a static shader frame is displayed instead.


## Hero Content
The shader is rendered behind real TaskFlow content:
**Organize. Focus. Complete.**
The text uses a high-contrast white treatment so it remains readable over the animated background.
