function routes(app) {
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, world!',
    })
  });

  app.get('/a', (req, res) => {
    res.send("apple")
  });
}

export default routes;