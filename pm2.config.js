module.exports = {
  apps: [
    {
      name: 'dashboard-gateway',
      script: './dist/bin/www.js',
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    }
  ]
};
