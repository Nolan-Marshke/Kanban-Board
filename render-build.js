const { execSync } = require('child_process');

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

// Install dependencies in server and client
console.log('Installing dependencies...');
runCommand('cd server && npm install');

// For client, install vite and react plugin explicitly
console.log('Installing client dependencies...');
runCommand('cd client && npm install');
runCommand('cd client && npm install --save-dev vite @vitejs/plugin-react');

// Build the client - use direct path to vite executable
console.log('Building client...');
runCommand('cd client && node node_modules/vite/bin/vite.js build --emptyOutDir');

// Build the server
console.log('Building server...');
runCommand('cd server && npm run build');

console.log('Build completed successfully!');