module.exports = {
  apps: [
    {
      name: 'mota-ar-condicionado',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '800M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        ADMIN_SESSION_SECRET: 'mota-refrig-secret-key-2026',
      },
    },
  ],
};
