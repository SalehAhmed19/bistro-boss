const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// stripe
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);

const port = process.env.PORT || 4000 || 5000;

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
    // TODO: For locally - uncomment this
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

    app.post("/api/upload/menu", verifyToken, verifyAdmin, async (req, res) => {
      const menuItem = req.body;
      const result = await menuCollection.insertOne(menuItem);

      res.send(result);
    });

    app.delete(
      "/api/delete/menus/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        console.log("Delete request for ID:", id);

        let query;
        try {
          // Attempt to create an ObjectId from the ID string
          // This will throw an error if 'id' is not a valid 24-character hex string
          query = { _id: new ObjectId(id) };
          console.log("Attempting delete with ObjectId query:", query);
        } catch (error) {
          // If new ObjectId(id) fails, it means the ID is likely a plain string
          console.warn(
            `ID "${id}" is not a valid ObjectId format. Attempting delete with string ID.`
          );
          query = { _id: id }; // Use the ID as a plain string
          console.log("Attempting delete with string ID query:", query);
        }

        try {
          const result = await menuCollection.deleteOne(query);
          console.log("Delete operation result:", result);
          res.send(result);
        } catch (dbError) {
          console.error("Database error during deletion:", dbError);
          res
            .status(500)
            .send({ message: "Internal server error during deletion." });
        }
      }
    );

    app.get("/api/menus/:_id", async (req, res) => {
      const id = req.params._id;
      console.log("Get request for ID:", id);

      // If you know _id in DB are always plain strings:
      // const query = { _id: id }; // Directly use string ID
      // console.log("Attempting find with string ID query:", query);

      // If you have a mix and the try-catch for ObjectId failed to catch string-stored ObjectIds
      // You might need a more sophisticated check, or just try both
      // const queryObjectId = { _id: new ObjectId(id) };
      // const queryPlainString = { _id: id };

      try {
        // Try to find by ObjectId first. If it returns null, try by string.
        // This is for mixed ID types, and if new ObjectId() doesn't error for string _id that looks like ObjectId
        let result = await menuCollection.findOne({ _id: new ObjectId(id) });
        if (!result) {
          // If not found with ObjectId, try with plain string
          result = await menuCollection.findOne({ _id: id });
          console.log(
            "Tried ObjectId, found null. Attempting find with string ID query:",
            { _id: id }
          );
        } else {
          console.log("Attempting find with ObjectId query:", {
            _id: new ObjectId(id),
          });
        }

        console.log("Find:", result);

        if (result) {
          res.send(result);
        } else {
          res.status(404).send({ message: "Menu item not found" });
        }
      } catch (dbError) {
        console.error("Database error during getting:", dbError);
        res
          .status(500)
          .send({ message: "Internal server error during getting." });
      }
    });

    app.patch("/api/update/menus/:_id", async (req, res) => {
      const updatedMenu = req.body;
      const id = req.params._id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: updatedMenu,
      };

      const result = await menuCollection.updateOne(filter, updatedDoc);

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

    app.delete("/api/delete/carts/:id", verifyToken, async (req, res) => {
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

    app.delete(
      "/api/delete/users/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.deleteOne(query);

        res.send(result);
      }
    );

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

    // Payments
    const paymentCollection = client
      .db("bistroDb")
      .collection("paymentCollection");

    // stripe payment
    app.post(
      "/api/create-payment-intent/stripe",
      verifyToken,
      async (req, res) => {
        const { price } = req.body;
        const amount = parseInt(price * 100); // convert to cents
        const payementIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: payementIntent.client_secret,
        });
      }
    );

    // payment - post
    app.post("/api/payments", verifyToken, async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);

      // delete each item from cart
      console.log({ paymentInfo: payment });
      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };

      const deleteResult = await cartsCollection.deleteMany(query);
      res.send({ paymentResult, deleteResult });
    });

    app.get("/api/all-payments/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      console.log(query);
      const payments = await paymentCollection.find(query).toArray();

      res.send(payments);
    });

    // stats
    app.get("/api/admin/stats", verifyToken, verifyAdmin, async (req, res) => {
      const users = await usersCollection.estimatedDocumentCount();
      const menus = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();
      // this is not the best way
      // const payments = await paymentCollection.find().toArray();
      // const revenue = payments.reduce(
      //   (total, payment) => total + payment.price,
      //   0
      // );
      const result = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              revenue: { $sum: "$price" },
            },
          },
        ])
        .toArray();
      console.log(result);
      const revenue = result.length > 0 ? result[0].revenue : 0;

      res.send({ users, menus, orders, revenue });
    });

    // order status
    /**
     * ---------------------
     * Non efficient way
     * ---------------------
     * 1. load all the payments
     * 2. for every menuItems (wich is an array), go find the item from menu
     * 3. for every item in the menu collection that you found from payment entry (document)
     */

    // using aggregate pipeline
    app.get(
      "/api/admin/orders/stats",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const result = await paymentCollection
          .aggregate([
            { $unwind: "$menuIds" },
            {
              // === CRITICAL FIX: Convert the string ID to ObjectId type ===
              $addFields: {
                convertedMenuId: {
                  $cond: {
                    if: { $ne: ["$menuIds", null] }, // Check if the ID exists and isn't null
                    then: { $toObjectId: "$menuIds" }, // Convert to ObjectId
                    else: null, // Handle cases where menuIds might be null or missing
                  },
                },
              },
            },
            {
              $lookup: {
                from: "menuCollection",
                localField: "convertedMenuId",
                foreignField: "_id",
                as: "menuItems",
              },
            },
            {
              $unwind: "$menuItems",
            },
            {
              $group: {
                _id: "$menuItems.category",
                quantity: {
                  $sum: 1, // Count the number of orders for each category
                },
                revenue: {
                  $sum: "$menuItems.price",
                },
              },
            },
            {
              $project: {
                _id: 0,
                category: "$_id",
                quantity: "$quantity",
                revenue: "$revenue", // Remove the _id field from the output
              },
            },
          ])
          .toArray();

        res.send(result);
      }
    );

    // Send a ping to confirm a successful connection
    // TODO: For locally - uncomment this
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
