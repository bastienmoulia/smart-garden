const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/devices/e00fce68ecae511856da9204/waterlevels', (req, res) => {
  const topLevel = Math.round(Math.random() * 100);
  const bottomLevel = Math.round(Math.random() * 100);
  const date = new Date().toISOString();
  res.jsonp({
    name: 'waterlevels',
    result: {
      topLevel: topLevel,
      bottomLevel: bottomLevel,
    },
    coreInfo: {
      name: 'smart-garden',
      deviceID: 'e00fce68ecae511856da9204',
      connected: true,
      last_handshake_at: date,
      last_app: '',
    },
  });
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
