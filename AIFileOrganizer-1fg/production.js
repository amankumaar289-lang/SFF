import { spawn } from 'child_process';

const server = spawn('tsx', ['server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});

process.on('SIGTERM', () => {
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
});
