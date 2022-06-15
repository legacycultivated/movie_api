const bodyParser = require("body-parser"),
    express = require("express"),
    morgan = require("morgan"),
    uuid = require("uuid");


const app = express();

app.use(bodyParser.json());

let movies = [{
        "Title": "The Godfather",
        "Genre": "Thriller",
        "Director": {
            "Name": "Francis For Coppola",
            "Bio": "American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s.",
            "Birth Year": 1939
        }
    },
    {
        "Title": "Top Gun",
        "Genre": "Action",
        "Director": {
            "Name": "Tony Scott",
            "Bio": "British film director and producer. He was known for directing highly successful action and thriller films such as Top Gun (1986), Beverly Hills Cop II (1987), Days of Thunder (1990), The Last Boy Scout (1991), True Romance (1993), Crimson Tide (1995), Enemy of the State (1998), Man on Fire (2004), Déjà Vu (2006), and Unstoppable (2010).",
            "Birth Year": 1944
        }
    },
    {
        "Title": "Get Out",
        "Genre": "Suspense/Horror",
        "Director": {
            "Name": "Jordan Peele",
            "Bio": "American actor, comedian and filmmaker. He is best known for his film and television work in the comedy and horror genres.",
            "Birth Year": 1979
        }
    },
    {
        "Title": "Jurassic Park",
        "Genre": "Thriller/Action",
        "Director": {
            "Name": "Steven Spielberg",
            "Bio": "American film director, producer, and screenwriter.",
            "Birth Year": 1946
        }
    },
    {
        "Title": "Spider-man: No Way Home",
        "Genre": "Action",
        "Director": {
            "Name": "Jon Watts",
            "Bio": "American filmmaker. His credits include directing the Marvel Cinematic Universe (MCU) superhero films Spider-Man: Homecoming, Spider-Man: Far From Home, and Spider-Man: No Way Home.",
            "Birth Year": 1981
        }
    },
    {
        "Title": "The Batman",
        "Genre": "Action",
        "Director": {
            "Name": "Matt Reeves",
            "Bio": "American film director, producer and screenwriter.",
            "Birth Year": 1966
        }
    },
    {
        "Title": "The Avengers",
        "Genre": "Action",
        "Director": {
            "Name": "Joss Whedon",
            "Bio": "American filmmaker, composer, and comic book writer.",
            "Birth Year": 1964
        }
    },
    {
        "Title": "Avatar",
        "Genre": "Sci-Fi",
        "Director": {
            "Name": "James Cameron",
            "Bio": "Canadian filmmaker. Best known for making science fiction and epic films, he first gained recognition for directing The Terminator.",
            "Birth Year": 1954
        }
    },
    {
        "Title": "Independence Day",
        "Genre": "Sci-Fi",
        "Director": {
            "Name": "Roland Emmerich",
            "Bio": "German film director, screenwriter, and producer. He is widely known for his science fiction and disaster films and has been called a 'master of disaster' within the industry.",
            "Birth Year": 1955
        }
    },
    {
        "Title": "Good Will Hunting",
        "Genre": "Drama",
        "Director": {
            "Name": "Gus Van Sant",
            "Bio": "American film director, producer, photographer, and musician who has earned acclaim as both an independent and mainstream filmmaker.",
            "Birth Year": 1952
        }
    }
];

//GET request
app.get("/", (req, res) => {
    res.send("Welcome to myFlix!");
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

//READ
app.get("/movies/director/:directorName", (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }

});





//Middleware functions
app.use(morgan("common"));

app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

//listen for request
app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});