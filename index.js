const bodyParser = require("body-parser");
const express = require("express");
morgan = require("morgan");
fs = require("fs"); // import node modules fs and path
path = require("path");
uuid = require("uuid");


const app = express();
//create a write stream(in append mode)
//a 'log.txt' file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a"
});
/*


let users = [

]

let movies = [

];


*/

app.use(bodyParser.json());

let movies = [{
        "Title": "The Godfather",
        "Genre": "Thriller",
        "Director": "Francis For Coppola"
    },
    {
        "Title": "Top Gun",
        "Genre": "Action",
        "Director": "Tony Scott"
    },
    {
        "Title": "Get Out",
        "Genre": "Suspense/Horror",
        "Director": "Jordan Peele"
    },
    {
        "Title": "Jurassic Park",
        "Genre": "Thriller/Action",
        "Director": "Steven Spielberg"
    },
    {
        "Title": "Spider-man: No Way Home",
        "Genre": "Action",
        "Director": "Jon Watts"
    },
    {
        "Title": "The Batman",
        "Genre": "Action",
        "Director": "Matt Reeves"
    },
    {
        "Title": "The Avengers",
        "Genre": "Action",
        "Director": "Joss Whedon"
    },
    {
        "Title": "Avatar",
        "Genre": "Sci-Fi",
        "Director": "James Cameron"
    },
    {
        "Title": "Independence Day",
        "Genre": "Sci-Fi",
        "Director": "Roland Emmerich"
    },
    {
        "Title": "Good Will Hunting",
        "Genre": "Drama",
        "Director": "Gus Van Sant"
    }
];

//GET request
app.get("/", (req, res) => {
    res.send("Welcome to myFlix!");
});

app.get("public/documentation", (req, res) => {
    res.sendFile("public/documentation.html", {
        root: __dirname
    });
});

//READ
app.get("/movies", (req, res) => {
    res.status(200).json(movies);
});

//READ
app.get("/movies/title/:titleName", (req, res) => {
    const { titleName } = req.params;
    const title = movies.find(movie => movie.Title === titleName);

    if (title) {
        res.status(200).json(title);
    } else {
        res.status(400).send('no such movie')
    }

});

//READ
app.get("/movies/genre/:genreName", (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }

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