const rewired = require('react-app-rewired');
const webpack = require('webpack');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return rewireDefinePlugin(rewireSass(config));
}

/**
 * Adds sass support, copy-pasta'd from
 * https://github.com/timarney/react-app-rewired/issues/66#issuecomment-330649196
 * @param {*} config
 */
function rewireSass(config) {
  const cssLoader = rewired.getLoader(
    config.module.rules,
    rule => rule.test && String(rule.test) === String(/\.css$/)
  );

  const sassLoader = {
    test: /\.scss$/,
    use: [...(cssLoader.loader || cssLoader.use), 'sass-loader']
  };

  const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
  oneOf.unshift(sassLoader);

  return config;
}

function rewireDefinePlugin(config) {
  config.plugins.concat(new webpack.DefinePlugin({
    'process.env.SPOTIFY_KEY': process.env.SPOTIFY_KEY,
    'process.env.URL': process.env.URL,
  }));
  return config;
}
