import childProcess from "child_process";
import http from "http";
import path from "path";
import repl from "repl";
import url from "url";

import Knex from "knex";
import faker from "faker";
import next from "next";
import * as zod from "zod";

class Server {
  env = zod
    .object({
      NEXT_PORT: zod.string(),
      NODE_ENV: zod.string(),
      PORT: zod.string(),
    })
    .parse(process.env);

  app = next({ dev: this.env.NODE_ENV !== "production" });

  handle = this.app.getRequestHandler();

  knex = Knex({
    client: "sqlite3",
    connection: {
      filename: path.join(process.cwd(), `${this.env.NODE_ENV}.sqlite3`),
    },
    useNullAsDefault: true,
  });

  requestListener: http.RequestListener = (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = url.parse(String(req.url), true);
    const { pathname, query } = parsedUrl;
    if (pathname === "/a") {
      void this.app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      void this.app.render(req, res, "/b", query);
    } else {
      void this.handle(req, res, parsedUrl);
    }
  };

  httpServer?: http.Server;

  onPrepare = (): void => {
    this.httpServer = http
      .createServer(this.requestListener)
      .listen(this.env.NEXT_PORT, () =>
        console.debug(`> Ready on http://localhost:${this.env.NEXT_PORT}`)
      );
  };

  cubejs: childProcess.ChildProcess;

  constructor() {
    this.cubejs = childProcess.fork(
      `${process.cwd()}/node_modules/.bin/cubejs-server`,
      { stdio: "inherit" }
    );

    void this.app.prepare().then(this.onPrepare);
  }
}

Object.assign(repl.start("repl> ").context, { app: new Server(), faker });

export { Server };
