# LIRI-Bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
* This app can take in one of the following commands:
- Concert-this
- Spotify-this-song
- Movie-this
- do-what-it-says
![Image description](https://i.ibb.co/MZL5R7Z/1.png)
# What Each Command Should Do:
1- node liri.js concert-this <artist/band name here>
- Name of the venue
- Venue location
- Date of the Event (use moment to format this as "MM/DD/YYYY")
![Image description](https://i.ibb.co/RcgJ1VP/3.png)
2- node liri.js spotify-this-song '<song name here>'
- This will show the following information about the song in your terminal/bash window
- Artist(s)
- The song's name
- A preview link of the song from Spotify
- The album that the song is from 
![Image description](https://i.ibb.co/3vXNYTk/6.png)

3-node liri.js movie-this '<movie name here>'
- This will output the following information to your terminal/bash window
- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.
![Image description](https://i.ibb.co/wYw9jMJ/7.png)

4- node liri.js do-what-it-says
- LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
![Image description](https://i.ibb.co/t3hRPCM/5.png)

