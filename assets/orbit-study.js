(() => {
  const width = 720;
  const height = 480;
  const center = [360, 240];
  const projectionDistance = 1450;
  const turn = 2 * Math.PI;
  const ink = "#191a16";
  const paper = "#f4f1e9";
  const accent = "#a73925";
  const guide = "#191a1633";

  const orbits = [
    { radius: 273, tilt: 1.19, heading: -.22, period: 28, phase: .86, color: accent, markings: { start: 1.98, offset: 18 } },
    { radius: 239, tilt: 1.04, heading: .76, period: -33, phase: 3.73, color: ink, markings: { start: .32, offset: -18 } },
    { radius: 210, tilt: 1.16, heading: -1.08, period: 24, phase: 5.49, color: paper, markings: { start: .29, offset: 18 } },
  ];

  function line(points, stroke, weight) {
    return { points, stroke, weight };
  }

  function circle(origin, radius, fill, stroke, weight) {
    return { origin, radius, fill, stroke, weight };
  }

  function trace(pointAt, start, end, steps) {
    return Array.from({ length: steps + 1 }, (_, step) => pointAt(start + (end - start) * step / steps));
  }

  function polar(angle, radius) {
    return [center[0] + radius * Math.cos(angle), center[1] + radius * Math.sin(angle)];
  }

  const guides = [
    line([[36, center[1]], [684, center[1]]], guide, .7),
    line([[center[0], 24], [center[0], 456]], guide, .7),
  ];
  for (let quadrant = 0; quadrant < 4; quadrant++) {
    const start = quadrant * Math.PI / 2 + .1;
    guides.push(line(trace(angle => polar(angle, 164), start, start + 1.37, 36), guide, .8));
    for (let tick = 0; tick < 7; tick++) {
      const angle = quadrant * Math.PI / 2 + tick * Math.PI / 14;
      guides.push(line([polar(angle, 171), polar(angle, tick % 3 === 0 ? 182 : 176)], guide, .9));
    }
  }
  for (const [x, y] of [[65, 103], [655, 377]]) {
    guides.push(line([[x - 5, y], [x + 5, y]], guide, .9), line([[x, y - 5], [x, y + 5]], guide, .9));
  }

  const core = [
    circle(center, 54, null, "#191a168c", .95),
    circle(center, 41, ink),
    circle(center, 7, "#d75b40"),
  ];

  function rotation(pitch, yaw) {
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);
    return ([x, y, z]) => {
      const depth = y * sinPitch + z * cosPitch;
      return [x * cosYaw + depth * sinYaw, y * cosPitch - z * sinPitch, depth * cosYaw - x * sinYaw];
    };
  }

  function project([x, y, z]) {
    const scale = projectionDistance / (projectionDistance - z);
    return [center[0] + x * scale, center[1] + y * scale, z];
  }

  function orbitMarkings(pointAt, { start, offset }) {
    const span = 1;
    const rail = angle => pointAt(angle, offset);
    const returnTrace = angle => pointAt(angle, -offset);
    const near = [line(trace(rail, start, start + span, 40), "#191a1692", 1)];
    const far = [];

    // Draw the marks on the same plane as the orbit so their spacing follows the view.
    for (let tick = 0; tick <= 12; tick++) {
      const angle = start + span * tick / 12;
      const base = tick % 4 === 0 ? 0 : offset * .6;
      near.push(line([pointAt(angle, base), rail(angle)], "#191a1680", .9));
    }
    for (let dash = 0; dash < 9; dash++) {
      const angle = start + Math.PI + .075 + dash * .096;
      far.push(line(trace(returnTrace, angle, angle + .048, 3), "#191a167a", .95));
    }
    return { near, far };
  }

  function scene(time = 0, pitch = 0, yaw = 0) {
    const view = rotation(pitch, yaw);
    const rear = [];
    const front = [];
    const rearNodes = [];
    const frontNodes = [];

    for (const { radius, tilt, heading, period, phase, color, markings } of orbits) {
      const sinHeading = Math.sin(heading);
      const cosHeading = Math.cos(heading);
      const flattened = radius * Math.cos(tilt);
      const [ax, ay, az] = view([radius * cosHeading, radius * sinHeading, 0]);
      const [bx, by, bz] = view([-flattened * sinHeading, flattened * cosHeading, radius * Math.sin(tilt)]);
      const pointAt = (angle, offset = 0) => {
        const scale = 1 + offset / radius;
        const a = Math.cos(angle) * scale;
        const b = Math.sin(angle) * scale;
        return project([ax * a + bx * b, ay * a + by * b, az * a + bz * b]);
      };

      // Split each tilted circle where it crosses the plane through the core.
      const nearStart = Math.atan2(bz, az) - Math.PI / 2;
      const detail = orbitMarkings(pointAt, markings);
      rear.push(...detail.far, line(trace(pointAt, nearStart + Math.PI, nearStart + turn, 72), "#191a1670", 1.05));
      front.push(...detail.near, line(trace(pointAt, nearStart, nearStart + Math.PI, 72), "#191a16d6", 1.55));

      const angle = phase + time / period * turn;
      const position = pointAt(angle);
      const nodes = position[2] >= 0 ? frontNodes : rearNodes;
      if (color === accent) {
        nodes.push(line(trace(pointAt, angle - .17, angle, 14), accent, 2.05));
        nodes.push(circle(position, 10.5, paper, accent, 1.05), circle(position, 5.6, accent));
      } else {
        nodes.push(circle(position, 4.7, color, ink, 1.4));
      }
    }

    return [...guides, ...rear, ...rearNodes, ...core, ...front, ...frontNodes];
  }

  if (typeof module !== "undefined") {
    module.exports = { width, height, scene };
    return;
  }

  const canvas = document.querySelector("[data-orbit-motion]");
  const context = canvas?.getContext("2d");
  if (!context) return;

  const field = canvas.closest(".artwork-field");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  let onscreen = true;
  let frame = 0;
  let previousTime;
  let time = 0;
  let pitch = 0;
  let yaw = 0;
  let targetPitch = 0;
  let targetYaw = 0;

  function draw() {
    context.clearRect(0, 0, width, height);
    for (const shape of scene(time, pitch, yaw)) {
      context.beginPath();
      if (shape.origin) {
        context.arc(shape.origin[0], shape.origin[1], shape.radius, 0, turn);
      } else {
        context.moveTo(shape.points[0][0], shape.points[0][1]);
        for (const [x, y] of shape.points.slice(1)) context.lineTo(x, y);
      }
      if (shape.fill) {
        context.fillStyle = shape.fill;
        context.fill();
      }
      if (shape.stroke) {
        context.strokeStyle = shape.stroke;
        context.lineWidth = shape.weight;
        context.stroke();
      }
    }
  }

  function fitCanvas() {
    const bounds = field.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
    canvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    context.lineJoin = "round";
    context.lineCap = "round";
    draw();
  }

  function animate(timestamp) {
    const elapsed = previousTime === undefined ? 0 : Math.min((timestamp - previousTime) / 1000, .05);
    previousTime = timestamp;
    time += elapsed;

    const easing = 1 - Math.exp(-6 * elapsed);
    pitch += (targetPitch - pitch) * easing;
    yaw += (targetYaw - yaw) * easing;
    draw();
    frame = requestAnimationFrame(animate);
  }

  function updateAnimation() {
    if (!reducedMotion.matches && onscreen) {
      if (!frame) frame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = undefined;
    }
  }

  field.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") return;
    const bounds = field.getBoundingClientRect();
    targetYaw = ((event.clientX - bounds.left) / bounds.width * 2 - 1) * .32;
    targetPitch = ((event.clientY - bounds.top) / bounds.height * 2 - 1) * -.26;
  });
  field.addEventListener("pointerleave", () => {
    targetYaw = 0;
    targetPitch = 0;
  });
  reducedMotion.addEventListener("change", updateAnimation);

  fitCanvas();
  canvas.hidden = false;
  field.dataset.orbitReady = "";
  updateAnimation();

  new ResizeObserver(fitCanvas).observe(field);
  new IntersectionObserver(([entry]) => {
    onscreen = entry.isIntersecting;
    updateAnimation();
  }).observe(field);
})();
