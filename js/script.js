// ---------------------------------------------------------------------------------------------------------
/* Cursor Animation */
// ---------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".cursor");  // Ensure the cursor element is selected
    const shapes = document.querySelectorAll(".shape");

    let mouseX = window.innerWidth / 2;  // Start at the center of the screen horizontally
    let mouseY = window.innerHeight / 2; // Start at the center of the screen vertically

    // Set initial position of the cursor to the center
    gsap.set(cursor, {
        x: mouseX,
        y: mouseY
    });

    // Move the shapes with a slight delay for visual effect
    gsap.set(shapes, {
        x: mouseX,
        y: mouseY
    });

    // Mouse Move Event
    document.body.addEventListener("mousemove", (evt) => {
        mouseX = evt.clientX;
        mouseY = evt.clientY;

        // Update cursor position to follow the mouse movement
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.2,  // Smooth transition duration
            ease: "power3.out"
        });

        // Apply staggered movement to shapes
        gsap.to(shapes, {
            x: mouseX,
            y: mouseY,
            stagger: -0.1,
            duration: 0.2,  // Same duration for the shapes animation
            ease: "power3.out"
        });
    });

    // Reset cursor to the center when mouse is not moving
    setInterval(() => {
        if (mouseX === window.innerWidth / 2 && mouseY === window.innerHeight / 2) {
            gsap.to(cursor, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                duration: 0.3,
                ease: "power3.out"
            });

            gsap.to(shapes, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                stagger: -0.1,
                duration: 0.3,
                ease: "power3.out"
            });
        }
    }, 200); // Check every 200ms to reset if mouse hasn't moved
});
// ---------------------------------------------------------------------------------------------------------
// NAV MENU
// ---------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelector("nav ul");
    const mainContent = document.querySelector("body"); // Body or a specific content wrapper

    // Toggle Hamburger Menu
    hamburger.addEventListener("click", () => {
        nav.classList.toggle("active");
        hamburger.classList.toggle("hamburger-active");
    });

    // Close mobile menu on clicking outside
    mainContent.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove("active");
            hamburger.classList.remove("hamburger-active");
        }
    });

    // Add scroll effect to the navbar
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            hamburger.classList.remove("hamburger-active");
        });
    });
});

// ---------------------------------------------------------------------------------------------------------
// Particle Animation JavaScript
// ---------------------------------------------------------------------------------------------------------
let Particles = [];
let time = 0;

const opt = {
  particles: window.innerWidth > 500 ? 1000 : 500,
  noiseScale: 0.009,
  angle: (Math.PI / 180) * -90,
  h1: rand(0, 360),
  h2: rand(0, 360),
  s1: rand(20, 90),
  s2: rand(20, 90),
  l1: rand(30, 80),
  l2: rand(30, 80),
  strokeWeight: 1.2,
  tail: 82
};

function rand(v1, v2) {
  return Math.floor(v1 + Math.random() * (v2 - v1));
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("animated-bg");
  canvas.parent(document.querySelector(".hero"));

  for (let i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height));
  }

  strokeWeight(opt.strokeWeight);
}

function draw() {
  time++;
  background(0, 100 - opt.tail);

  for (let p of Particles) {
    p.update();
    p.render();
  }
}

// Reactive interactivity: update color and angle on mouse click
function mouseClicked() {
  opt.h1 = rand(0, 360);
  opt.h2 = rand(0, 360);
  opt.s1 = rand(20, 90);
  opt.s2 = rand(20, 90);
  opt.l1 = rand(30, 80);
  opt.l2 = rand(30, 80);
  opt.angle += (Math.PI / 180) * 60 * (Math.random() > 0.5 ? 1 : -1);

  for (let p of Particles) {
    p.randomize();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lx = x;
    this.ly = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.randomize();
  }

  randomize() {
    this.hueSemen = Math.random();
    this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
    this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
    this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
    this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
  }

  update() {
    this.follow();

    this.vx += this.ax;
    this.vy += this.ay;

    let p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    let a = Math.atan2(this.vy, this.vx);
    let m = Math.min(this.maxSpeed, p);
    this.vx = Math.cos(a) * m;
    this.vy = Math.sin(a) * m;

    this.x += this.vx;
    this.y += this.vy;
    this.ax = 0;
    this.ay = 0;

    this.edges();
  }

  follow() {
    let angle =
      noise(
        this.x * opt.noiseScale,
        this.y * opt.noiseScale,
        time * opt.noiseScale
      ) *
        Math.PI *
        0.5 +
      opt.angle;

    this.ax += Math.cos(angle);
    this.ay += Math.sin(angle);
  }

  updatePrev() {
    this.lx = this.x;
    this.ly = this.y;
  }

  edges() {
    if (this.x < 0) {
      this.x = width;
      this.updatePrev();
    }
    if (this.x > width) {
      this.x = 0;
      this.updatePrev();
    }
    if (this.y < 0) {
      this.y = height;
      this.updatePrev();
    }
    if (this.y > height) {
      this.y = 0;
      this.updatePrev();
    }
  }

  render() {
    stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`);
    line(this.x, this.y, this.lx, this.ly);
    this.updatePrev();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




// ---------------------------------------------------------------------------------------------------------
// Trackiing Page JS
// ---------------------------------------------------------------------------------------------------------

const graphData = {
    1: [10, 15, 20, 25, 30, 35, 40, 42, 45, 50, 55, 60, 65], // Example sales data for product 1
    2: [5, 10, 15, 10, 5, 20, 25, 30, 35, 20, 15, 10, 5],   // Product 2 sales data
    3: [30, 25, 20, 15, 10, 5, 10, 15, 20, 25, 30, 35, 40]   // Product 3 sales data
};

// Time labels: 00:00 to 12:00 with 1-hour intervals
const timeLabels = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", 
                    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

let currentGraphRow = null;
let chart;

// Toggle dropdown graph
document.querySelectorAll("#productTable tbody tr").forEach(row => {
    row.addEventListener("click", () => {
        if (currentGraphRow && currentGraphRow.previousElementSibling === row) {
            currentGraphRow.remove();
            currentGraphRow = null;
            return;
        }

        if (currentGraphRow) currentGraphRow.remove();

        currentGraphRow = document.createElement("tr");
        const graphCell = document.createElement("td");
        graphCell.colSpan = 6;
        graphCell.innerHTML = `
            <div class="graph-container">
                <canvas id="dropdownGraph"></canvas>
            </div>
        `;
        currentGraphRow.appendChild(graphCell);
        row.after(currentGraphRow);

        renderGraph(row.dataset.id);
    });
});

function renderGraph(productId) {
    const ctx = document.getElementById('dropdownGraph').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels, // Set 1-hour interval labels (00:00 to 12:00)
            datasets: [{
                label: "Sales Over Time",
                data: graphData[productId], // Use data corresponding to product ID
                backgroundColor: 'rgba(12, 129, 149, 0.2)',
                borderColor: '#0c8195',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#f1c111'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: "Time (24 Hour Format)" },
                    ticks: {
                        autoSkip: false, // Ensure every hour is displayed
                        maxRotation: 0,
                        minRotation: 0
                    }
                },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: "Sales" }
                }
            },
            plugins: { legend: { display: true } }
        }
    });
}




// Search Filter
document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll("#productTable tbody tr").forEach(row => {
        const productName = row.children[1].textContent.toLowerCase();
        row.style.display = productName.includes(searchText) ? "" : "none";
    });
});

// Sort Filter
document.getElementById("sortFilter").addEventListener("change", (e) => {
    const rows = Array.from(document.querySelectorAll("#productTable tbody tr"));
    const sortValue = e.target.value;

    rows.sort((a, b) => {
        const priceA = parseFloat(a.children[2].textContent);
        const priceB = parseFloat(b.children[2].textContent);

        if (sortValue === "price-low-high") return priceA - priceB;
        if (sortValue === "price-high-low") return priceB - priceA;
        return 0;
    });

    const tbody = document.querySelector("#productTable tbody");
    rows.forEach(row => tbody.appendChild(row));
});

// Date Filter
document.getElementById("dateFilter").addEventListener("input", (e) => {
    const selectedDate = e.target.value;
    document.querySelectorAll("#productTable tbody tr").forEach(row => {
        const rowDate = row.children[5].textContent.trim();
        row.style.display = rowDate === selectedDate ? "" : "none";
    });
});

// Reset Button JS
// pta ni bhai maine try kra pr ye ni chala

// Filter in Mobile
document.addEventListener("DOMContentLoaded", function () {
    const openFilterBtn = document.getElementById("openFilterBtn");
    const closeFilterBtn = document.getElementById("closeFilterBtn");
    const filterModal = document.getElementById("filterModal");
    const resetButton = document.getElementById("resetButton");

    // Open the filter modal
    openFilterBtn.addEventListener("click", () => {
        filterModal.style.display = "block";
    });

    // Close the filter modal
    closeFilterBtn.addEventListener("click", () => {
        filterModal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
        if (e.target === filterModal) {
            filterModal.style.display = "none";
        }
    });

    // Reset all filters
    resetButton.addEventListener("click", () => {
        document.getElementById("searchInput").value = "";
        document.getElementById("sortFilter").value = "default";
        document.getElementById("dateFilter").value = "";
    });
});


// Pagination Configuration
const productsPerPage = 20;
const products = document.querySelectorAll('#productTable tbody tr');
const totalPages = Math.ceil(products.length / productsPerPage);
let currentPage = 1;

// Function to display the current page of products
function showPage(page) {
  // Hide all products
  products.forEach((product, index) => {
    product.style.display = 'none';
  });

  // Show products for the current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  for (let i = startIndex; i < endIndex && i < products.length; i++) {
    products[i].style.display = '';
  }

  // Update the page number display
  updatePagination();
}

// Function to update the pagination controls
function updatePagination() {
  const paginationList = document.getElementById('paginationList');
  paginationList.innerHTML = ''; // Clear existing pagination numbers

  // Create page numbers dynamically
  const maxPagesToShow = 5; // Number of page numbers to show at once (e.g., 1 2 3 4 5)
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust start page if there are fewer pages than maxPagesToShow
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Create the page number links
  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add('pagination-item');
    if (i === currentPage) {
      pageItem.classList.add('current');
    }

    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.textContent = i;

    pageLink.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = i;
      showPage(currentPage);
    });

    pageItem.appendChild(pageLink);
    paginationList.appendChild(pageItem);
  }

  // Update previous/next button disabled state
  document.getElementById('prevPageBtn').classList.toggle('disabled', currentPage === 1);
  document.getElementById('nextPageBtn').classList.toggle('disabled', currentPage === totalPages);
}

// Event listeners for prev and next buttons
document.getElementById('prevPageBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
});

document.getElementById('nextPageBtn').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
  }
});

// Initialize the first page and pagination controls
showPage(currentPage);
