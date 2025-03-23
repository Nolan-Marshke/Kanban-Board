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

// For client, install dependencies including vite
console.log('Installing client dependencies...');
runCommand('cd client && npm install');
runCommand('cd client && npm install --save-dev vite@latest @vitejs/plugin-react@latest');

// Update package.json script to make it more reliable
console.log('Updating client build script...');
runCommand('cd client && npm pkg set scripts.build:render="NODE_ENV=production npx vite build"');

// Build the client using npm script
console.log('Building client...');
runCommand('cd client && npm run build:render');

// Build the server
console.log('Building server...');
runCommand('cd server && npm run build');

console.log('Build completed successfully!');