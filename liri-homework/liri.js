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
var command = process.argv[2];
var search = process.argv[3];

function callCommands(command, search) {
  switch (command) {
    case 'concert-this':
      concertThis(search);
      break;
    case 'spotify-this-song':
      spotifyThis(search);
      break;
    case 'movie-this':
      movieThis(search);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
  }
}


console.log(
  "Please type one of these commands', 'concert-this': to search your favorite artist concerts', 'spotify-this-song': to search your favorite song', 'movie-this': to search your favorite movie', 'do-what-it-says': using command from random.txt."
);
console.log('-------');

// doWhatItSays command
function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err);
    var dataArr = data.split(',');
    callCommands(dataArr[0], dataArr[1]);
  });
}
callCommands(command, search);
// concert command
function concertThis(search) {
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
function spotifyThis(search) {
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