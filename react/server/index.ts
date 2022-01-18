import express from "express";
import axios from "axios";
import http from "http";
import path from "path";

async function startServer(): Promise<http.Server> {
  // Initialize Server Application
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Manage configurations
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

  // Handle API Requests
  app.all(["/users", "/todos", "/todos/:id"], async function (req, res, next) {
    const method = req.method.toLowerCase();
    const jsonServerUrl = `http://localhost:5001${req.originalUrl}`;

    // Make sure we send back the `/todos` page if it's requested.
    if (method === "get" && req.path === "/todos" && !req.query.userId) return next();

    try {
      let data: unknown;

      if (method === "get") ({ data } = await axios[method](jsonServerUrl));
      else if (method === "delete") await axios[method](jsonServerUrl);
      else if (method === "post") ({ data } = await axios[method](jsonServerUrl, req.body));

      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });

  // Send back the page
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
