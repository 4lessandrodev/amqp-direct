module.exports = {
  apps: [{
    name: 'publisher',
    script: './publisher/dist/index.js',
    watch: './publisher/*'
  }, {
    name: 'subscriber',
    script: './subscriber/dist/index.js',
    watch: './subscriber/*'
  }],
};
