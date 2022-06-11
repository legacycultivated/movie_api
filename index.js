const express = require("express");
morgan = require("morgan");
fs = require("fs"); // import node modules fs and path
path = require("path");

const app = express();
//create a write stream(in append mode)
//a 'log.txt' file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a"
});

let movies = [
  {
    title: "The Godfather",
    director: "Francis For Coppola"
  },
  {
    title: "Top Gun",
    director: "Tony Scott"
  },
  {
    title: "Get Out",
    director: "Jordan Peele"
  },
  {
    title: "Jurassic Park",
    director: "Steven Spielberg"
  },
  {
    title: "Spider-man: No Way Home",
    director: "Jon Watts"
  },
  {
    title: "The Batman",
    director: "Matt Reeves"
  },
  {
    title: "The Avengers",
    director: "Joss Whedon"
  },
  {
    title: "Avatar",
    director: "James Cameron"
  },
  {
    title: "Independence Day",
    director: "Roland Emmerich"
  },
  {
    title: "Good Will Hunting",
    director: "Gus Van Sant"
  }
];

//GET request
app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", {
    root: __dirname
  });
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

//Middleware functions
app.use(
  morgan("combined", {
    stream: accessLogStream
  })
);

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//listen for request
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
