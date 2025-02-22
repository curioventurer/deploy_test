import f from "./queries.js";

function routes(app) {
  app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
  });

  app.get('/a', (req, res) => {
    res.send("apple")
  });

  app.get('/b', async (req, res) => {
    await f();
    res.send("orange")
  });
}

export default routes;