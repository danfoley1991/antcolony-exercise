const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = 800; //window.innerWidth * 0.8;
canvas.height = 600; //window.innerHeight * 0.8;

// Variables to hold ants and nests data
let ants = [];
let nests = [];
const numAnts = 10; // Adjust the number of ants as needed

// Load the ant image from a file
const antImage = new Image();
antImage.src = 'images/ant.png';  // Ensure this path is correct relative to your HTML file

// Function to calculate the angle based on velocity
function calculateAngle(vx, vy) {
    return Math.atan2(vy, vx);
}


// Function to draw ants and nests on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ants if the image is loaded
    if (antImage.complete && antImage.naturalHeight !== 0) {
        ants.forEach(ant => {
            // Calculate the angle based on velocity
            const angle = calculateAngle(ant.vx, ant.vy);

            // Save the current state
            ctx.save();
            
            // Move the canvas origin to the ant's position
            ctx.translate(ant.x, ant.y);
            
            // Rotate the canvas to match the ant's direction
            ctx.rotate(angle);
            
            // Draw the image centered at (0, 0)
            const imageWidth = 20; // Replace with actual image width
            const imageHeight = 20; // Replace with actual image height
            ctx.drawImage(antImage, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
            
            // Restore the canvas state
            ctx.restore();
        });
    }

    // Draw nests
    nests.forEach(nest => {
        ctx.beginPath();
        ctx.arc(nest.x, nest.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    });
}

// Function to fetch updated ant data from the backend
async function fetchAntUpdates() {
    try {
        const response = await fetch('http://localhost:8080/api/ants', { method: 'GET' });
        const data = await response.json();

        if (data && Array.isArray(data)) {
            ants = data.map(antData => ({
                id: antData.id,
                x: antData.position.x,
                y: antData.position.y
            }));
        }
    } catch (error) {
        console.error('Error fetching ant updates:', error);
    }
}

// Function to update ant positions and velocities
async function updateAnts() {
    await fetchAntUpdates(); // Fetch updated ant data from the backend

    draw(); // Redraw the canvas
}

// Handle clicks to place nests
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    nests.push({ x, y });

    // Simulate a backend call to register the nest
    console.log('Nest registered at:', { x, y });

    draw();
});

// Update ants every 10 milliseconds
setInterval(updateAnts, 75);

// Initial draw once the ant image is loaded
antImage.onload = draw;
