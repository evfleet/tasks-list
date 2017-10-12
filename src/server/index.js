const path = require('path');
const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist/client')));

if (process.env.NODE_ENV === 'development') {
  const config = require('../../webpack.config.dev');
  const compiler = require('webpack')(config);

  compiler.plugin('done', () => {
    Object.keys(require.cache).forEach((id) => {
      if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
    });
  });

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});