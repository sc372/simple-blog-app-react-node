module.exports = {
  apps: [{
    name: 'SimpleBlog',
    cwd: './dist/',
    script: 'www.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
