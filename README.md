
Word Puzzle Game — Full Stack App

A simple, full stack word guessing game where players attempt to guess a hidden word within limited attempts. Built with a modern JavaScript stack and clean UI/UX.


---

Features

Interactive word guessing game with instant feedback.

Configurable word length and maximum attempts.

Responsive frontend built with React.

Secure and efficient backend API with Node.js and Express.

Persistent score tracking and word history using MongoDB.

RESTful API architecture for game logic and state management.

Environment-based config for easy deployment and scaling.



---

Tech Stack

Frontend: React, Axios, Tailwind CSS

Backend: Node.js, Express

Database: MongoDB

Deployment: Render 
Gameplay Rules

Guess the hidden word within a set number of attempts.

After each guess:

Correct letters in the correct position are highlighted.

Correct letters in the wrong position are indicated.

Incorrect letters are marked.


Track your current streak and best score.



---

API Endpoints

Method	Endpoint	Description

GET	/api/new-word	Fetches a new random word
POST	/api/guess	Submits a word guess
GET	/api/score	Retrieves current player stats



---


