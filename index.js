const bodyParser = require("body-parser"),
    express = require("express"),
    morgan = require("morgan"),
    uuid = require("uuid");


const app = express();

app.use(bodyParser.json());

let users = [{
        id: 1,
        name: "Kim",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Joe",
        favoriteMovies: ["The Godfather"]
    }
];


let movies = [{
            Title: "The Godfather",
            Description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son."
            Genre: {
                Name: "Thriller",
                Description: "Thriller, also known as suspense, is a broad genre that invokes excitement and suspense to the audience."
            },
            Director: {
                Name: "Francis For Coppola",
                Bio: "American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s.",
                Birth Year: 1939
            },
            ImagePath: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY681_.jpg",
            Feature: true
        },
        {
            Title: "Top Gun",
            Description: "As students at the United States Navy's elite fighter weapons school compete to be best in the class, one daring young pilot learns a few things from a civilian instructor that are not taught in the classroom.",
            Genre: {
                Name: "Action",
                Description: "Also called action-adventure, a genre of film in which the primary feature is the constant focus on fights, chases, explosions, and high-adrenaline scenes."
            },
            Director: {
                Name: "Tony Scott",
                Bio: "British film director and producer. He was known for directing highly successful action and thriller films such as Top Gun (1986), Beverly Hills Cop II (1987), Days of Thunder (1990), The Last Boy Scout (1991), True Romance (1993), Crimson Tide (1995), Enemy of the State (1998), Man on Fire (2004), Déjà Vu (2006), and Unstoppable (2010).",
                Birth Year: 1944,
                Death Year: 2012
            },
            ImagePath: "https://m.media-amazon.com/images/M/MV5BZjQxYTA3ODItNzgxMy00N2Y2LWJlZGMtMTRlM2JkZjI1ZDhhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UY494_.jpg",
            Feature: true
        },
        {
            Title: "Get Out",
            Description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
            Genre: {
                Name: "Thriller",
                Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
            },
            Director: {
                Name: "Jordan Peele",
                Bio: "American actor, comedian and filmmaker. He is best known for his film and television work in the comedy and horror genres.",
                Birth Year: 1979
            },
            ImagePath: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_FMjpg_UY710_.jpg",
            Feature: true
        },
        {
            Title: "Jurassic Park",
            Description: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
            Genre: {
                Name: "Thriller",
                Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
            },
            Director: {
                Name: "Steven Spielberg",
                Bio: "American film director, producer, and screenwriter.",
                Birth Year: 1946
            },
            ImagePath: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_FMjpg_UY479_.jpg",
            Feature: true
        },
        {
            Title: "Spider-man: No Way Home",
            Description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
            Genre: {
                Name: "Action",
                Description: "Also called action-adventure, a genre of film in which the primary feature is the constant focus on fights, chases, explosions, and high-adrenaline scenes."
            },
            Director: {
                Name: "Jon Watts",
                Bio: "American filmmaker. His credits include directing the Marvel Cinematic Universe (MCU) superhero films Spider-Man: Homecoming, Spider-Man: Far From Home, and Spider-Man: No Way Home.",
                Birth Year: 1981
            },
            ImagePath: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UY474_.jpg",
            Feature: true
        },
        {
            Title: "The Batman",
            Description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
            Genre: {
                Name: "Action",
                Description: "Also called action-adventure, a genre of film in which the primary feature is the constant focus on fights, chases, explosions, and high-adrenaline scenes."
                Director: {
                    Name: "Matt Reeves",
                    Bio: "American film director, producer and screenwriter.",
                    Birth Year: 1966
                },
                ImagePath: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_FMjpg_UY337_.jpg",
                Feature: true
            },
            {
                Title: "The Avengers",
                Description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
                Genre: {
                    Name: "Action",
                    Description: "Also called action-adventure, a genre of film in which the primary feature is the constant focus on fights, chases, explosions, and high-adrenaline scenes."
                },
                Director: {
                    Name: "Joss Whedon",
                    Bio: "American filmmaker, composer, and comic book writer.",
                    Birth Year: 1964
                },
                ImagePath: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX800_.jpg",
                Feature: true
            },
            {
                Title: "Avatar",
                Description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
                Genre: {
                    Name: "Sci-Fi",
                    Description: "A fictionalized story wherein the setting and plot are centered around technology, time travel, outer space, or scientific principles with or without the presence of aliens."
                },
                Director: {
                    Name: "James Cameron",
                    Bio: "Canadian filmmaker. Best known for making science fiction and epic films, he first gained recognition for directing The Terminator.",
                    Birth Year: 1954
                },
                ImagePath: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UY337_.jpg",
                Feature: true
            },
            {
                Title: "Independence Day",
                Description: "The aliens are coming and their goal is to invade and destroy Earth. Fighting superior technology, mankind's best weapon is the will to survive.",
                Genre: {
                    Name: "Sci-Fi",
                    Description: "A fictionalized story wherein the setting and plot are centered around technology, time travel, outer space, or scientific principles with or without the presence of aliens."
                },
                Director: {
                    Name: "Roland Emmerich",
                    Bio: "German film director, screenwriter, and producer. He is widely known for his science fiction and disaster films and has been called a 'master of disaster' within the industry.",
                    Birth Year: 1955
                },
                ImagePath: "https://m.media-amazon.com/images/M/MV5BMGQwNDNkMmItYWY1Yy00YTZmLWE5OTAtODU0MGZmMzQ1NDdkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UY720_.jpg",
                Feature: true
            },
            {
                Title: "Good Will Hunting",
                Description: "Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
                Genre: {
                    Name: "Drama",
                    Description: "A drama is a story with high stakes and a lot of conflict."
                },
                Director: {
                    Name: "Gus Van Sant",
                    Bio: "American film director, producer, photographer, and musician who has earned acclaim as both an independent and mainstream filmmaker.",
                    Birth Year: 1952
                },
                ImagePath: "https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UY732_.jpg",
                Feature: true
            },
            {
                Title: "Ready Player One",
                Description: "When the creator of a virtual reality called the OASIS dies, he makes a posthumous challenge to all OASIS users to find his Easter Egg, which will give the finder his fortune and control of his world.",
                Genre: {
                    Name: "Action",
                    Description: "Also called action-adventure, a genre of film in which the primary feature is the constant focus on fights, chases, explosions, and high-adrenaline scenes."
                },
                Director: {
                    Name: "Steven Spielberg",
                    Bio: "Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
                    Birth Year: 1946
                },
                ImagePath: "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_FMjpg_UY711_.jpg",
                Feature: true
            }
        ];







        //Add New Users
        // CREATE
        app.post("/users", (req, res) => {
            const newUser = req.body;
            if (newUser.name) {
                newUser.id = uuid.v4();
                users.push(newUser);
                res.status(201).json(newUser)
            } else {
                res.status(400).send("users need names")
            }

        });



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
            const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

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

        //UPDATE
        app.put("/users/:id", (req, res) => {
            const { id } = req.params;
            const updatedUser = req.body;

            let user = users.find(user => user.id == id);

            if (user) {
                user.name = updatedUser.name;
                res.status(200).json(user);
            } else {
                res.status(400).send("no such user")
            }

        });


        //UPDATE or POST
        app.post("/users/:id/:movieTitle", (req, res) => {
            const { id, movieTitle } = req.params;
            const updatedUser = req.body;

            let user = users.find(user => user.id == id);

            if (user) {
                user.favoriteMovies.push(movieTitle);
                res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
            } else {
                res.status(400).send("no such user")
            }

        });

        // DELETE
        app.delete("/users/:id/:movieTitle", (req, res) => {
            const { id, movieTitle } = req.params;

            let user = users.find(user => user.id == id);


            if (user) {
                user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
                res.status(200).send(`${movieTitle} has been removed from user ${id}'s array.`);
            } else {
                res.status(400).send("no such user")
            }

        });

        // DELETE
        app.delete("/users/:id", (req, res) => {
            const { id } = req.params;

            let user = users.find(user => user.id == id);


            if (user) {
                users = users.filter(user => user.id != id);
                res.status(200).send(`user ${id} has been deleted.`);
            } else {
                res.status(400).send("no such user")
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