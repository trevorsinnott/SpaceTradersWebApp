import { loadFeature, defineFeature } from 'jest-cucumber';
import { screen } from '@testing-library/react';

import server from '../../../mocks/server';
import render from '../utils/render';

import Home from '../../../container/Home';
import { userOpensTheHomePage } from './steps';

const feature = loadFeature('./src/cucumber/features/login/login.feature');

defineFeature(feature, (test) => {
  beforeAll(() => {
    // Enable the mocking in tests.
    server.listen();
  });

  beforeEach(() => {
    render(<Home />);
  });

  afterEach(() => {
    // Reset any runtime handlers tests may use.
    server.resetHandlers();
  });

  afterAll(() => {
    // Clean up once the tests are done.
    server.close();
  });

  test('the user creates new game', ({ given, when, and, then }) => {
    userOpensTheHomePage(given, 'homePage');

    given('the user see a Create New Game button', () => {
      // assert url page that is rendered
      screen.debug();
    });
    when('the user presses the New Game button', () => {
      // press New Game button
    });
    and('the user enter a new Username', () => {
      // input a username
    });
    and('the user press the Start button', () => {
      // press Start button
    });
    then('the User is redirected to the game page', () => {
      // assert page change
    });
  });

  test('the user opens a previous save', ({ given, when, then }) => {
    userOpensTheHomePage(given, 'homePage');

    given('there is one or more existing saves available', () => {
      // check is UI for saved game
    });

    when('the user clicks the button for a previous save', () => {
      // click UI for saved game
    });

    then('the User is redirected to the game page', () => {
      // Check redirect
    });
  });
});
