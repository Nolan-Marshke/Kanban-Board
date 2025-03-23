const { execSync } = require('child_process');

// Function to run a command and log output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing ${command}:`, error);
    process.exit(1);
  }
}

// Install dependencies in server and client
console.log('Installing dependencies...');
runCommand('cd server && npm install');
runCommand('cd client && npm install');

// Build the client
console.log('Building client...');
runCommand('cd client && npm run build');

// Build the server
console.log('Building server...');
runCommand('cd server && npm run build');

console.log('Build completed successfully!');