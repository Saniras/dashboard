// server.js
const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch"); // You will need to install node-fetch with npm install node-fetch
const { createRequire } = require("module");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/{id}", function (req, res) {
  res.sendFile(path.join(__dirname, "{id}.html"));
});

app.use(express.static(__dirname + "/vendors"));

// Define the /api/data endpoint
app.get("/api/data", (req, res) => {
  const url =
    "https://www.aishub.net/coverage.json?minLat=-13.41099&maxLat=54.26522&minLon=-274.04297&maxLon=302.87109&zoom=2&view=false&t=1684857267";
  const options = {
    method: "GET",
    headers: {
      scheme: "https",
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "ko,en;q=0.9,en-US;q=0.8",
      dnt: "1",
      referer: "https://www.aishub.net/coverage",
      "sec-ch-ua":
        '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50",
      "x-requested-with": "XMLHttpRequest",
    },
  };

  // Fetch the data and pipe it back to the client
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(500).json({ error: "An error occurred while fetching data" })
    );
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
