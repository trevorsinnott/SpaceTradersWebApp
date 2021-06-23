Feature: login
       As a User you open the main page to start the game

    Background:
       Given the user opens the home page

    Scenario: the user creates new game
       Given the user see a Create New Game button
       When the user presses the New Game button
       And the user enter a new Username
       And the user press the Start button
       Then the User is redirected to the game page

    Scenario: the user opens a previous save
       Given there is one or more existing saves available
       When the user clicks the button for a previous save
       Then the User is redirected to the game page