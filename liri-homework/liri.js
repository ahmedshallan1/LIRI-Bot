require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var fs = require('fs');
var moment = require("moment");
var Spotify = require("node-spotify-api");

//spotify construction here?
var spotify = new Spotify(keys.spotify);
// //promts then
// inquirer.prompt([{
//   type: "list",
//   message: "Make a selection of what you wish you search for.",
//   choices: ["Concert", "Song", "Movie", "do-what-it-says"],
//   name: "selection"
// },
// {
//   type: "input",
//   message: "Okay, what would you like to search?",
//   name: "searchTerm"
// }
// ])
var userCommand = process.argv[2];
var secondCommand = process.argv[3];


function Commands(userCommand, secondCommand) {
  switch (userCommand) {
    case 'concert-this':
      concertThis(secondCommand);
      break;
    case 'spotify-this-song':
      spotifyThis(secondCommand);
      break;
    case 'movie-this':
      movieThis(secondCommand);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
  }
}


console.log(
  "Please type one of these commands', 'concert-this': to search your favorite artist concerts', 'spotify-this-song': to search your favorite song', 'movie-this': to search your favorite movie', 'do-what-it-says': using command from random.txt.");
// doWhatItSays command
function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    var dataArr = data.split(',');
    Commands(dataArr[0], dataArr[1]);
  });
}
Commands(userCommand, secondCommand);
// concert command
function concertThis(secondCommand) {
  var url = 'https://rest.bandsintown.com/artists/' + secondCommand + '/events?app_id=codingbootcamp';

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
function spotifyThis(secondCommand) {
  if (secondCommand === undefined) {
    secondCommand = 'The Sign';
  }
  spotify.search(
    {
      type: 'track',
      query: secondCommand
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
// OMDB Movie - command: movie-this
// run a request to the OMDB API with the movie specified
// run a request to the OMDB API with the movie rot tomatoes rating specified
// var queryUrl = "http://www.omdbapi.com/?t=" + BirdBox + "&y=&plot=short&tomatoes=true&apikey=trilogy";

function movieThis(search) {
  let movieQueryURL = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&apikey=trilogy';
  axios
    .get(movieQueryURL)
    .then(function (response) {
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
    .catch(function (error) {
      console.log(error);
    });
}
// function doWhatItSays(searchThis) {
//   console.log("We got into the doWhatItSays function at least")
//   spotify.search({ type: 'track', query: searchThis }, function (err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
//     console.log(data);

//   })
// };