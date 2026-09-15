const { spawn } = require('child_process');
const path = require('path');

console.log('\n======================================================');
console.log('🏛️   Starting CoopSathi AI Platform (Full Stack)');
console.log('📡  Backend:  http://localhost:5000');
console.log('💻  Frontend: http://localhost:5173');
console.log('======================================================\n');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Spawn backend
const backend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: isWindows
});

// Spawn frontend
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: isWindows
});

function cleanup() {
  console.log('\n🛑 Shutting down CoopSathi AI servers...');
  try { backend.kill(); } catch {}
  try { frontend.kill(); } catch {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
