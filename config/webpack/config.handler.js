require('babel-register');
module.exports = (env) => require(`./${env.target}/${env.target}.${env.dev ? 'dev' : 'prod'}.js`);
