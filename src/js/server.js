const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Create a virtual path prefix (where the path does not actually exist in the file system)
// for files that are served by the express.static function, specify a mount path for the static directory.
// Now, you can load the files that are in the public (src) directory from the /static path prefix.
// app.use("/dist", express.static(path.resolve(__dirname, "src")));
app.use(express.static(path.resolve(__dirname, "src")));

// All requests go to index.html
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
