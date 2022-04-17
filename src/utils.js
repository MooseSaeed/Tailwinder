import { Appwrite } from "appwrite";

const appwrite = new Appwrite();

appwrite
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("625c01036a46258fd693"); // Your project ID

export { appwrite };
