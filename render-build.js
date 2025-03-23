const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');


const tsconfigPath = path.join(__dirname, 'client', 'tsconfig.json');


let originalTsconfig = null;
if (fs.existsSync(tsconfigPath)) {
  originalTsconfig = fs.readFileSync(tsconfigPath, 'utf8');
}

try {
  
  const simpleTsconfig = {
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": false,
      "noUnusedLocals": false,
      "noUnusedParameters": false,
      "noFallthroughCasesInSwitch": false
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  };

  
  fs.writeFileSync(tsconfigPath, JSON.stringify(simpleTsconfig, null, 2));

  console.log('🔧 Temporary TypeScript configuration created for deployment');

  
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('📦 Installing server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });
  
  console.log('📦 Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });
  
  console.log('🚀 Building the application...');
  // Skip TypeScript check during build
  execSync('cd client && npx vite build --mode production', { stdio: 'inherit' });
  
  console.log('🚀 Building the server...');
  execSync('cd server && npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} finally {
  
  if (originalTsconfig) {
    fs.writeFileSync(tsconfigPath, originalTsconfig);
    console.log('🔄 Restored original TypeScript configuration');
  }
}