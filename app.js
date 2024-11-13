const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Variables to hold ants and nests data
let ants = [];
let nests = [];
let foodSources = [];
let currentMode = 'nest'; // 'nest' or 'food'

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

    // Draw food sources
    foodSources.forEach(food => {
        ctx.beginPath();
        ctx.arc(food.x, food.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'green';
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

// Handle clicks to place nests or food sources
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentMode === 'nest') {
        nests.push({ x, y });

        // Create the payload for the backend to register the nest
        const data = { x: x, y: y };

        // Send a POST request to the backend to register the nest
        fetch('http://localhost:8080/api/ants/nest', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register nest');
            }
            return response.json(); // assuming the backend returns some JSON
        })
        .then(data => {
            console.log('Nest registered successfully:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    } else if (currentMode === 'food') {
        foodSources.push({ x, y });

        // Create the payload for the backend to register the food source
        const data = { x: x, y: y };

        // Send a POST request to the backend to register the food source
        fetch('http://localhost:8080/api/ants/food', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register food source');
            }
            return response.json(); // assuming the backend returns some JSON
        })
        .then(data => {
            console.log('Food source registered successfully:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Redraw the canvas to include the new nest or food source
    draw();
});

// Handle keypress to switch between nest and food modes
document.addEventListener('keydown', (event) => {
    if (event.key === 'n') {
        currentMode = 'nest';
        console.log('Mode switched to: Nest');
    } else if (event.key === 'f') {
        currentMode = 'food';
        console.log('Mode switched to: Food');
    }
});

// Update ants every 10 milliseconds
setInterval(updateAnts, 75);

// Initial draw once the ant image is loaded
antImage.onload = draw;
