# What's Cookin'? 

The details of this project are outlined in the project specs
- [part one](https://frontend.turing.edu/projects/module-2/whats-cookin-part-one.html)
- [part two](https://frontend.turing.edu/projects/module-2/whats-cookin-part-two-agile.html)

## CONTRIBUTORS

- [Benjamin Holden](https://github.com/BenHolden010)
- [Jamie Caudill](https://github.com/JamieCaudill)
- [Parvin A. Sattorova](https://github.com/Sulton88Mehron90)
- [Marisa Wyatt](https://github.com/Marisa5280)

## DESCRIPTION

"What's Cookin'?" is a group project completed as a part of Module 2 at Turing School of Software Design's Front-End curriculum. The application hosts a variety of recipes that can be viewed as a whole, by course (salads, hor d'oevres, main courses, sides), or searched by a tag or recipe name to show relevent recipes. When looking at a recipe's page that recipe can be saved to the users saved recipes page. When looking at the saved recipe collection the user may search through their recipes and delete recipes of their choosing.

### 🌐 Live Demo

[View the App here](https://whats-cookin-group-project.vercel.app/)

## LEARNING GOALS

- Use object and array prototype methods to perform data manipulation
- Create a user interface that is easy to use and clearly displays information.
- Write DRY, reusable code that follows SRP and trends toward function purity
- Implement a robust testing suite using TDD
- Make network requests to retrieve data
- Collaborate productively and professionally as a team. Ensure all team members are able to be heard and contribute throughout the project.
- Understand the use of new technologies introduced in this project:
  -  WebPack
  -  Fetch API
- Work with a local server and make network requests to API endpoints to retrieve and manipulate data.
- Follow best practices for accessibility
- Implement feedback from a usability test to improve product

## TECHNOLOGIES USED

- JavaScript 
- HTML
- CSS 
- Npm
- Mocha 
- Chai
- Git 
- WebPack
- Fetch API

## APP PREVIEW
https://www.loom.com/share/d4e78185aee34262b0315096767db4a0

## FEATURES

- Clickable images that filter recipes by tag
- Search bar that filters recipes by name or tag
- Clickable recipe images that display all recipe details, including: ingredients, instructions, and estimated ingredient cost
- Individual recipes can be saved by a user to a collection of saved recipes
- User is randomly generated on page load
- User page that displays all saved recipes
- User can filter saved recipes using search bar
- User can delete selected recipes from their saved recipes
- Back button returns to last page 
- A local server that provides the APIs for the data on the page

## APP SET UP/INSTALLATION

1. Fork this repository [here](https://github.com/JamieCaudill/whats-cookin-group-project)
1. Clone down your new, forked repo
1. cd into the repository
1. Open it in your text editor
1. View the project in the browser by running `npm start` in your terminal, and `cmd + click` on the link generated

## LOCAL SERVER SET UP 
In a separate terminal:
1. Clone [this repository](https://github.com/turingschool-examples/whats-cookin-api) 
1. Run `npm install`
1. Run `npm start`

## Testing

This project utilized Test Driven Development practices.
Mocha (testing framework) and Chai (assertion library) are required to run tests,
once installed and running: 
-cd into the repo
-run `npm test` in the terminal
