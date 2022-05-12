const express = require("express");
const path = require("path");
const app = express(),
  bodyParser = require("body-parser");
port = 3080;

// Init SDK
const sdk = require("node-appwrite");
let client = new sdk.Client();
let users = new sdk.Users(client);
let storage = new sdk.Storage(client);
let database = new sdk.Database(client);

client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("tailwinder") // Your project ID
  .setKey(
    "516ab942fb7ea7439486dec71be12a566aec844ed3370b06a29d8c49f0eede4f1516efc45ad791a70d6be898d8d383cb0f4082f24c44ff509d7b7d3b14128721caf2c964b537568772a4b0d8aab52f9a55c0360eb39f9002eb7ee25d58848a351b4315388ee67eef527536e266d28601b6b25cdbdb5f881f674871cdbeaa7547"
  ); // Your secret API key

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../appwrite-app/build")));

//get user by ID
app.get("/v1/users/:id", (req, res) => {
  let promise = users.get(req.params.id);

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      console.log(error);
    }
  );
});

//get user by ID
app.get("/v1/users/:userid/prefs", (req, res) => {
  let promise = users.getPrefs(req.params.userid);

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      console.log(error);
    }
  );
});

// List collections
app.get("/v1/database/collections", (req, res) => {
  let promise = database.listCollections();

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      res.json(error);
    }
  );
});

// create new bucket
app.post("/v1/storage/buckets", function (req, res) {
  let promise = storage.createBucket(
    req.body.bucketId,
    req.body.bucketName,
    "file"
  );

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      console.log(error);
    }
  );
});

//get list of files in bucket
app.get("/v1/storage/buckets/:id/files", (req, res) => {
  let promise = storage.listFiles(req.params.id);

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      res.json(error);
    }
  );
});

//Delete Bucket
app.delete("/v1/storage/buckets/:bucketId", (req, res) => {
  let promise = storage.deleteBucket(req.params.bucketId);

  promise.then(
    function (response) {
      res.json(response);
    },
    function (error) {
      console.log(error);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
