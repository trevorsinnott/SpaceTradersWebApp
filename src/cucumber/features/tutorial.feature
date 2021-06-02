Feature: Gameplay Tutorial

              As a first time player of Space Traders, I want a tutorial option, so that I can learn how to play the game.

        Scenario: New game with tutorial
            Given a user starts a new game
             When the user chooses the Play Tutorial option
             Then the tutorial introduction is shown

        Scenario: New game without tutorial
            Given a user starts a new game
             When the user chooses the Play Without Tutorial option
             Then the enter username screen is shown