require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

//spotify construction here?
var spotify = new Spotify(keys.spotify);
//promts then
inquirer.prompt([{
  type: "list",
  message: "Make a selection of what you wish you search for.",
  choices: ["Concert", "Song", "Movie", "do-what-it-says"],
  name: "selection"
},
{
  type: "input",
  message: "Okay, what would you like to search?",
  name: "searchTerm"
}
])
  .then(function (answers) {
    let searchThis = answers.searchTerm;
    console.log(answers);
    console.log(searchThis);
    switch (answers.selection) {
      case 'Concert':
        console.log("The Concert case was hit")
        searchConcert(searchThis);
      case 'Song':
        console.log("The Song case was hit")
        searchSong(searchThis);
      case 'Movie':
        console.log("The Movie case was hit")
        searchMovie(searchThis);
      case 'doWhatItSays':
        console.log("The doWhatItSays case was hit")
        doWhatItSays(searchThis);

    }
  });
// Concert Function
function searchConcert(searchThis) {
  console.log("We got into the searchConcert function at least")
  spotify.search({ type: 'track', query: searchThis }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);
  })
};
// Song Function

function searchSong(searchThis) {
  console.log("We got into the searchSong function at least")
  spotify.search({ type: 'track', query: searchThis }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);
  })
};
// Movie Function
function searchMovie(searchThis) {
  console.log("We got into the searchMovie function at least")
  spotify.search({ type: 'track', query: searchThis }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);
  })
};

// concert command
function searchConcert(search) {
  var url = 'https://rest.bandsintown.com/artists/' + search + '/events?app_id=codingbootcamp';

  axios
    .get(url)
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        console.log('------------------');
        console.log(`Venue: ${response.data[i].venue.name}`);
        console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
        console.log(`Date: ${moment(response.data[i].datetime).format('MM/DD/YYYY')}`);
        console.log('-----------------');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
// song command
function searchSong(search) {
  if (search === undefined) {
    search = 'The Sign';
  }
  spotify.search(
    {
      type: 'track',
      query: search
    },
    function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log(`Artist(s) ${songs[i].artists[0].name}`);
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-------------");
      }
    }
  );
}
// movie command
function searchMovie(search) {
  let movieQueryURL = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&apikey=trilogy';
    axios
      .get(movieQueryURL)
      .then(function(response) {
        if (response.data.Response === 'False') {
          console.log(
            "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
          );
          console.log("It's on Netflix!");
        } else {
          console.log('---------');
          console.log(`Title: ${response.data.Title}`);
          console.log(`Year: ${response.data.Year}`);
          console.log(`IMDB Rating: ${response.data.imdbRating}`);
          console.log(`Rotten Tomatoes: ${response.data.Ratings[1]}`);
          console.log(`Country: ${response.data.Country}`);
          console.log(`Language: ${response.data.Language}`);
          console.log(`Plot: ${response.data.Plot}`);
          console.log(`Actors: ${response.data.Actors}`);
          console.log('-----------');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
// doWhatItSays function
function doWhatItSays(searchThis) {
  console.log("We got into the doWhatItSays function at least")
  spotify.search({ type: 'track', query: searchThis }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);

  })
};

// // movie
// //OMDB Movie - command: movie-this
//   // OMDB Movie - this MOVIE base code is from class files, I have modified for more data and assigned parse.body to a Var
//   // grab the movieName which will always be the third node argument we just renammed it to secondCommand
//   var BirdBox = secondCommand;
//   // Then run a request to the OMDB API with the movie specified
//   // run a request to the OMDB API with the movie rot tomatoes rating specified
//   var queryUrl = "http://www.omdbapi.com/?t=" + BirdBox + "&y=&plot=short&tomatoes=true&apikey=trilogy";

//   // this line is just to help us debug against the actual URL
//   // console.log(queryURL);

//   request(queryUrl, function (error, response, body) {

//     // If the request is successful = 200
//     // the response status code has to be 200 to run
//     if (!error && response.statusCode === 200) {

//       //Simultaneously output to console and log.txt via NPM simple-node-logger
//       // parse the body of the site and recover the title, release year, imdb rating, country, language, plot, actors, rotten tomatoes rating, and rotten tomatoes url
//       console.log('================ Movie Info ================');
//       console.log("Title: " + JSON.parse(body).Year);
//       console.log("Release Year: " + body.Year);
//       console.log("IMdB Rating: " + body.imdbRating);
//       console.log("Country: " + body.Country);
//       console.log("Language: " + body.Language);
//       console.log("Plot: " + body.Plot);
//       console.log("Actors: " + body.Actors);
//       // when i am trying to console.log the rating it is breaking the code in terminal and i am not sure how to fix it 
//       // console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
//       console.log("Rotten Tomatoes URL: " + body.tomatoURL);
//       console.log("================= THE END ==========");
//     } else {
//       //else - throw error
//       console.log("Error occurred.")
//     }
//     //Response if user does not type in a movie title
//     if (movieName === "Bird Box") {
//       console.log("-----------------------");
//       console.log("If you haven't watched 'The Secret Window,' then you should: https://www.imdb.com/title/tt2737304/?ref_=nv_sr_1?ref_=nv_sr_1");
//       console.log("It's on Netflix!");
//     }
//   });
// }

//   // ////////////////////////////////////////////////

// //function searchMovie(searchThis)

// //function searchConcert(searchThis)