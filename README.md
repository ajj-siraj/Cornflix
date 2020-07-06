### CornFlix, A Movie Database
This project was supposed to be a Netflix-like clone at first, but slowly I started to realize the scale and resources limitations imposed on me by reality would not allow a project of that scale. Hence, a simple movie database with extra steps. This project also works with a NodeJS/Express API implemented in this repository.

## Features

- A MongoDB database including 4800+ movies (up to movies from 2014, newer movies are not included).
- Watch a movie (includes a youtube embedded video only, no actual movies are available).
- A signup/login system (protected with Google's recaptcha).
- A user account page.
- The ability to add and remove favorites per user.
- The ability to upload an avatar and change account information and password.
- Integrated with a NodeJS/Express API I created that handles all the requests and the communication with the database.

## Things to add

I grew tired of this project after a while but there are a few things I would like to add still when I have time:
- A community feature including: 
  - Comments on each movie.
  - Creating or joining 'Clubs' or 'Groups'.
  - A personal messaging system to allow users to contact and add each other as friends.
  - User ratings. The current ratings included are IMDB ratings. There are rating stars on each watch page but as of now clicking on them does not do anything or submit your ratings.
 - Record and display user watch history.
 
 ## Working prototype
 You can try the app on this link: http://cornflix.herokuapp.com
