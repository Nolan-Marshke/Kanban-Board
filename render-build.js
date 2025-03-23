const { execSync } = require('child_process');
const fs = require('fs');

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

// Log current directory and contents for debugging
console.log('Current directory:', process.cwd());
console.log('Directory contents:', fs.readdirSync('.'));

try {
  // Install dependencies
  console.log('Installing root dependencies...');
  runCommand('npm install');

  // Install server dependencies
  console.log('Installing server dependencies...');
  runCommand('cd server && npm install');

  // Install client dependencies
  console.log('Installing client dependencies...');
  runCommand('cd client && npm install');

  // Build server (TypeScript compilation)
  console.log('Building server...');
  runCommand('cd server && npm run build');

  // Build client
  console.log('Building client...');
  runCommand('cd client && npm run build');

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}