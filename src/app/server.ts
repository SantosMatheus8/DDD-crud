import * as express from "express";
import routes from "../infra/routes/routes";
import connectToDatabase from "../infra/database/connection";

connectToDatabase
  .initialize()
  .then(async () => {
    const app = express();

    app.set("view engine", "pug");
    app.set("views", `${__dirname}/views`);

    app.use(express.json({ limit: "10kb" }));

    app.use("/", routes);

    const port = 3000;
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.error(error));
