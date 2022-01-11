import express from "express";
import http from "http";
import path from "path";

async function startServer(): Promise<http.Server> {
  // Initialize Server Application
  const app = express();
  const port = Number(process.env.PORT);

  // Webpack only needed in development
  if (process.env.NODE_ENV === "development") {
    const { default: webpack } = await import("webpack");
    const { default: config } = await import("../webpack.config.dev");
    const compiler = webpack(config);

    // Setup express with webpack dev middleware and webpack hot middleware
    const { default: webpackDevMiddleware } = await import("webpack-dev-middleware");
    const { default: webpackHotMiddleware } = await import("webpack-hot-middleware");

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
  }

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Create and start the server
  const server = http.createServer(app);

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`App listening on port ${port}`);
      resolve(server);
    });
  });
}

startServer();
