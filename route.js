function routes(app) {
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, world!',
    })
  });

  app.get('/a', (req, res) => {
    res.send("orange")
  });
}

export default routes;