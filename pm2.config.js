module.exports = {
  apps: [
    {
      name: 'absensi',
      script: './dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};
