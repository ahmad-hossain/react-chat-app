# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Gif Walkthrough
<img src="https://thumbs.gfycat.com/ImperfectSelfishArthropods-size_restricted.gif" width=350><br>


## Challenges Faced
- Didn't have a good grasp of js, ts and react basic syntax because of lack of going thoroughly through a curriculum. There were holes in my knowledge, which took extra time researching those topics.
- I noticed that Javascript wasn't able to infer types for props. This led me to switch to Typescript in most of my project, which solved that problem for me.
- Sometimes styles were not specific enough which affected elements all over. I was able to learn more about CSS selectors to fix this, but I would like to research more about styling with React such as whether there's a better way to style.
- Docs showed incorrect result for feed post object. Docs models showed a 'username' key, but posts don't have that. They have 'user' key which maps to User object
- One of the listed posts has a JSON of comments rather than an Array like the rest of the posts. I was able to figure this out without spending a lot of time by looking at my logs.

## What I Learned
- Gained much more experience with React and learned about useState
- Gained experience with basic JS & Typescript. Will likely use TS in the future as well
- Gained familiarity with using Material UI Components. These components improved the look of my app significantly.
- Found a use for Flexbox order. I used this to order the profile picture to the right or left depending on whether it was from the signed in user or not 

## What I Could Improve
- Many times, I noticed that I had several different state variables for managing a component or screen. This could be improved by moving the independent states into a single object which holds all the states.
- Given more time, I would have like to implement a form of architecture for this project, so that the code is more organized and easier to maintain.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.