let buttons = document.querySelectorAll('.color-buttons');
let colorDisplay = document.getElementById('editable');
let colorStack = document.getElementById('colorStack');
let clickSound = document.getElementById('clickSound');
let clickedColors = [];

// Add background color change with sound
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Play sound
    clickSound.play();

    // Disable gradient if it's active
    document.body.classList.remove('gradient');

    // Change background color
    document.body.style.backgroundColor = btn.id;

    // Update the displayed text
    colorDisplay.textContent = btn.id;

    // Add the clicked color to the queue (first in, first out)
    updateColorQueue(btn.id);

    // Update the gradient background for the stack (queue)
    updateGradientBackground();
  });
});

/* Update the queue of clicked colors */
function updateColorQueue(color) {
  // Add the new color to the queue
  clickedColors.push(color);

  // If more than 6 colors, remove the oldest one (FIFO behavior)
  if (clickedColors.length > 6) {
    clickedColors.shift();
  }

  // Update the color stack display
  renderColorQueue();
}

/* Render the color queue inside the stack container */
function renderColorQueue() {
  colorStack.innerHTML = ""; // Clear the stack

  clickedColors.forEach((color) => {
    let li = document.createElement('li');
    li.textContent = color;
    colorStack.appendChild(li);
  });
}

/* Update the gradient background for the queue container */
function updateGradientBackground() {
  if (clickedColors.length > 1) {
    let lastTwoColors = clickedColors.slice(-2); // Get the last two clicked colors
    let gradientColors = lastTwoColors.join(', ');

    // Apply gradient to the stack container (queue box)
    document.querySelector('.color-stack-container').style.background = `linear-gradient(to right, ${gradientColors})`;
  } else {
    // If there are not enough colors, set it to a default background
    document.querySelector('.color-stack-container').style.background = `rgba(0, 0, 0, 0.7)`;
  }
}

/* Particle Effect */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Resize canvas on window resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Adjust particles to be fewer and smaller
function createParticles() {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,  // Smaller particle radius
      d: Math.random() * 2 + 1,  // Slower downward movement
      color: `rgba(255, 255, 255, ${Math.random()})`
    });
  }
}
createParticles();

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();

    // Move particles
    particle.y += particle.d;

    // Reset if out of bounds
    if (particle.y > canvas.height) {
      particle.x = Math.random() * canvas.width;
      particle.y = -10;
    }
  });
  requestAnimationFrame(updateParticles);
}

updateParticles();

/* Enable Gradient on Load */
document.body.classList.add('gradient');
