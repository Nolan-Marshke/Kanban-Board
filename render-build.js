const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Runs a command in the shell and logs output
 * @param {string} command - The command to execute
 */
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing ${command}:`, error);
    process.exit(1);
  }
}

// Install server dependencies only
console.log('Installing server dependencies...');
runCommand('cd server && npm install');

// Create a minimal client dist directory with a static page
console.log('Creating static client files...');
const clientDistDir = path.join(__dirname, 'client', 'dist');
if (!fs.existsSync(clientDistDir)) {
  fs.mkdirSync(clientDistDir, { recursive: true });
}

// Create a simple index.html file
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kanban Board</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      max-width: 600px;
      width: 100%;
      text-align: center;
    }
    h1 {
      color: #b864c4;
    }
    .loading {
      margin-top: 20px;
      color: #555;
    }
    .button {
      background-color: #b864c4;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #9d4ba3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Kanban Board</h1>
    <p id="message">Loading application...</p>
    <div class="loading">
      This is a temporary page. The full application will be available soon.
    </div>
    <button class="button" onclick="location.reload()">Refresh</button>
  </div>
  <script>
    // Basic script to verify the backend is working
    fetch('/api/status')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok');
      })
      .then(data => {
        document.getElementById('message').textContent = data.message || 'Server is running!';
      })
      .catch(error => {
        document.getElementById('message').textContent = 'Error connecting to server. Please try again later.';
        console.error('Error:', error);
      });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(clientDistDir, 'index.html'), indexHtml);

// Build the server
console.log('Building server...');
runCommand('cd server && npm run build');

// Add a status endpoint to the server
console.log('Adding status endpoint to server...');
const addStatusEndpoint = `
// Add a status endpoint to check if the server is running
app.get('/api/status', (_req, res) => {
  res.json({ message: 'Server is running correctly!' });
});
`;

// Read the server file
const serverDistPath = path.join(__dirname, 'server', 'dist', 'server.js');
if (fs.existsSync(serverDistPath)) {
  let serverCode = fs.readFileSync(serverDistPath, 'utf8');
  // Insert status endpoint before the app.get('*') line
  serverCode = serverCode.replace(
    "app.get('*', (_req, res) => {",
    addStatusEndpoint + "\napp.get('*', (_req, res) => {"
  );
  fs.writeFileSync(serverDistPath, serverCode);
}

console.log('Build completed successfully!');