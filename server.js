const express = require("express");
const path = require("path");

const app = express();

// Create a virtual path prefix (where the path does not actually exist in the file system)
// for files that are served by the express.static function, specify a mount path for the static directory.
// Now, you can load the files that are in the public directory from the /src path prefix.
app.use("/src", express.static(path.resolve(__dirname, "src")));
// app.use(express.static('/public'));

// All requests go to index.html
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
