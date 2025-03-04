import cors from "cors";
import helmet from "helmet";
import path from "path";
import { config } from 'dotenv'
config();
const envFile = path.join(__dirname, '../.env.local')
config({ path: envFile, override: true })
import express, { Express } from "express";
import HttpStatus from "http-status-codes";
import responseTime from "response-time";
import fs from "fs";

import { serverConfig } from "./config";

(async (): Promise<void> => {
  // mongoDBConnection();

  await _startExpressApi();
})();

async function _startExpressApi(): Promise<void> {
  const app = express();
  const port = serverConfig.PORT || 3001;
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(responseTime());
  app.disable('x-powered-by')

  await _useRoute(app, ["routes"]);
  app.get("/", (req, res) => {
    res
      .status(HttpStatus.OK)
      .send("🚀 Server is up and running! Ready to rock! 🤘");
  });
  app.get("/help", (req, res) => {
    res
      .status(HttpStatus.OK)
      .send(
        "Need a hand? 🤝 You've reached the help center! How can I assist you?"
      );
  });
  app.get("*", (req, res) => {
    res
      .status(HttpStatus.FORBIDDEN)
      .send("Oops! Looks like you're lost in the code universe. 🚀💫");
  });

  app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
  });
}

async function _useRoute(app: Express, paths: Array<string>): Promise<void> {
  const routesDirectory = path.resolve(__dirname, ...paths);
  const files = fs.readdirSync(routesDirectory);
  for (const file of files) {
    if (file.endsWith(".js") && !file.endsWith(".js.")) {
      const routePath = path.join(routesDirectory, file);
      const { router, basePath } = await import(routePath);
      app.use(basePath, router);
    }
  }
}
