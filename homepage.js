const body = document.body;
const themeButton = document.querySelector('#theme-toggle');
function setColorTheme(dark) {
  body.classList.toggle('dark', dark);
  themeButton.textContent = dark ? '☼' : '☾';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
try { setColorTheme(localStorage.getItem('homepage-color-theme') !== 'light'); } catch {}
themeButton.addEventListener('click', () => {
  const dark = !body.classList.contains('dark');
  setColorTheme(dark);
  draw();
  try { localStorage.setItem('homepage-color-theme', dark ? 'dark' : 'light'); } catch {}
});

const canvas = document.querySelector('#flow');
const ctx = canvas.getContext('2d');
const motionButton = document.querySelector('#motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches, visible = true;
let width = 0, height = 0, time = 5, previous = 0, frameId = 0;
function updateMotion() {
  motionButton.textContent = paused ? '▷' : 'Ⅱ';
  motionButton.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
  motionButton.setAttribute('aria-pressed', String(paused));
}
function draw() {
  if (!width || !height) return;
  ctx.clearRect(0, 0, width, height);
  const cx = width * .76, cy = height * .48;
  const size = Math.min(height * .51, width * .37);
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 1.45);
  glow.addColorStop(0, body.classList.contains('dark') ? '#b8a0d11c' : '#8f6cb51a'); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
  for (let ring = 0; ring < 75; ring++) {
    const v = ring / 74;
    const tilt = -.55 + Math.sin(time * .16) * .13;
    ctx.beginPath();
    for (let j = 0; j <= 180; j++) {
      const a = j / 180 * Math.PI * 2;
      const r = size * (1 + .17 * Math.sin(a * 3 + v * 5 + time * .3));
      const x = Math.cos(a) * r * (1 - v * .34);
      const y = Math.sin(a) * r * .65 + (v - .5) * size * 1.25;
      const px = x * Math.cos(tilt) - y * Math.sin(tilt) + cx;
      const py = x * Math.sin(tilt) + y * Math.cos(tilt) + cy;
      j ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    const lightness = body.classList.contains('dark') ? 53 + v * 25 : 36 + v * 23;
    ctx.strokeStyle = `hsla(${260 + v * 16}, ${24 + v * 12}%, ${lightness}%, ${.25 + v * .45})`;
    ctx.lineWidth = .7; ctx.stroke();
  }
}
function resize() {
  const rect = canvas.getBoundingClientRect();
  width = rect.width; height = rect.height;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
}
function frame(stamp) {
  frameId = 0;
  if (paused || !visible || document.hidden) { previous = 0; return; }
  if (previous) time += Math.min((stamp - previous) / 1000, .05);
  previous = stamp; draw(); frameId = requestAnimationFrame(frame);
}
function animate() { if (!frameId) frameId = requestAnimationFrame(frame); }
motionButton.addEventListener('click', () => { paused = !paused; updateMotion(); animate(); });
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updateMotion(); animate(); });
new ResizeObserver(resize).observe(canvas);
new IntersectionObserver(entries => { visible = entries[0].isIntersecting; animate(); }).observe(canvas);
document.addEventListener('visibilitychange', animate);
updateMotion(); resize(); animate();

const navLinks = [...document.querySelectorAll('.page-nav a')];
let scrollQueued = false;
function updateNavigation() {
  scrollQueued = false;
  let current = navLinks[0];
  for (const link of navLinks) {
    if (document.querySelector(link.getAttribute('href')).getBoundingClientRect().top <= 150) current = link;
  }
  for (const link of navLinks) {
    link.classList.toggle('active', link === current);
    if (link === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNavigation); } }, { passive: true });
updateNavigation();
