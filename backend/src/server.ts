import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./models";

dotenv.config();
const router = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

router.use(cors(corsOptions));

// parse requests of content-type - application/json
router.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));

const Role = db.role;

db.mongoose
  .connect(process.env.MONGO_URL as string, {
    
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err: any) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Guillaume application." });
});

// routes
require("./routes/auth.route")(router);
require("./routes/user.route")(router);
require("./routes/pins.route")(router);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
router.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err: any, count: number) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
