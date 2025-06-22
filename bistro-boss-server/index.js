const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sam-cluster-01.sjti4dh.mongodb.net/?retryWrites=true&w=majority&appName=SAM-Cluster-01`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // jwt api's
    app.post("/api/authorization/jwt", (req, res) => {
      const user = req.body;
      const payload = { email: user.email };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    // jwt middleware
    const verifyToken = (req, res, next) => {
      console.log({ insideVerifyToken: req.headers.authorization });
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized Access :(" });
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).send({ message: "Unauthorized Access :(" });
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized Access :(" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    };

    // user verfyAdmin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "admin";

      if (!isAdmin) {
        return res.status(403).send({ message: "Access Forbidden :(" });
      }
      next();
    };

    // menu collection
    const menuCollection = client.db("bistroDb").collection("menuCollection");

    app.get("/api/menus", async (req, res) => {
      const result = await menuCollection.find().toArray();

      res.send(result);
    });

    // review collection
    const reviewsCollection = client
      .db("bistroDb")
      .collection("reviewsCollection");

    app.get("/api/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();

      res.send(result);
    });

    // cart collection
    const cartsCollection = client.db("bistroDb").collection("cartsCollection");

    app.post("/api/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartsCollection.insertOne(cartItem);

      res.send(result);
    });

    app.get("/api/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartsCollection.find(query).toArray();

      res.send(result);
    });

    app.delete("/api/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollection.deleteOne(query);

      res.send(result);
    });

    // Users collection
    const usersCollection = client.db("bistroDb").collection("usersCollection");
    app.post("/api/users", async (req, res) => {
      const user = req.body;
      // console.log(req.body);
      // insert email if user does not exists:
      // 1. email unique, 2. upsert, 3. simple checking
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) return; // user exists, do nothing
      const result = await usersCollection.insertOne(user);

      res.send(result);
    });

    app.get("/api/users", verifyToken, verifyAdmin, async (req, res) => {
      // console.log(req.headers);
      const users = await usersCollection.find().toArray();

      res.send(users); // return all users
    });

    app.delete("/api/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);

      res.send(result);
    });

    app.patch(
      "/api/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await usersCollection.updateOne(filter, updatedDoc);

        res.send(result);
      }
    );

    app.get(
      "/api/users/authorization/admin/:email",
      verifyToken,
      async (req, res) => {
        const email = req.params.email;
        if (email !== req.decoded.email) {
          return res.status(403).send({
            message: "Access Forbidden :(",
          });
        }
        const query = { email: email };
        const user = await usersCollection.findOne(query);
        let isAdmin = false;
        if (user) {
          isAdmin = user?.role === "admin";
        }

        res.send({ isAdmin });
      }
    );

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Bistro Boss running");
});

app.listen(port, () => {
  console.log(`Bistro Boss running at post ${port}`);
});

/**
 * ----------------------
 * NAMING CONVENTION
 * ----------------------
 * app.get("/users")
 * app.get("/users/:id")
 * app.post("/users")
 * app.put("/users/:id")
 * app.patch("/users/:id")
 * app.delete("/users/:id")
 */
