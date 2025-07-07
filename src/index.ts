import "module-alias/register";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { config } from "dotenv";
config();
const envFile = path.join(__dirname, "../.env.local");
config({ path: envFile, override: true });
import express, { NextFunction, Request, Response } from "express";
import HttpStatus, { ReasonPhrases, StatusCodes } from "http-status-codes";
import responseTime from "response-time";
import fs from "fs";

import { serverConfig } from "./config";
import { mongoDBConnection } from "./config/dbConnection";
import { ExpressError } from "./commons/helper/errorHandler/expressError";
import { CustomErrorResponse } from "./commons/helper/errorHandler/customErrorResponse";

(async (): Promise<void> => {
  mongoDBConnection();
  await _startExpressApi();
})();

async function _startExpressApi(): Promise<void> {
  const app = express();
  const port = serverConfig.PORT || 7001;

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(responseTime());
  app.disable("x-powered-by");

  // Serve static files from the 'public' folder
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "privacy-policy.html"));
  });

  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "business-info.html"));
  });

  fs.readdirSync(path.resolve(__dirname, "routes")).forEach((file) => {
    if (
      (file.includes(".js") && !file.includes(".js.")) ||
      (file.endsWith(".ts") && !file.includes(".d.ts"))
    ) {
      const { router, basePath } = require(`./routes/${file}`);
      app.use(basePath, router);
    }
  });

  app.get("/", (_req, res) => {
    res
      .status(HttpStatus.OK)
      .send("🚀 Server is up and running! Ready to rock! 🤘");
  });
  app.get("/help", (_req, res) => {
    res
      .status(HttpStatus.OK)
      .send(
        "Need a hand? 🤝 You've reached the help center! How can I assist you?"
      );
  });
  app.get("*", (_req, res) => {
    res
      .status(HttpStatus.FORBIDDEN)
      .send("Oops! Looks like you're lost in the code universe. 🚀💫");
  });

  app.use(
    (
      error: ExpressError,
      _req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
      const errorResponse: CustomErrorResponse = {
        status: statusCode,
        message,
        body: {
          error: error.message || error,
        },
      };

      if (error?.errors?.length) {
        errorResponse.body.error = error.errors;
      }
      return next(res.status(statusCode).send(errorResponse));
    }
  );

  app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
  });
}
