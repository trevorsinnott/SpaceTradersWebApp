import { screen } from '@testing-library/dom';
import { DefineStepFunction } from 'jest-cucumber';

export const userOpensTheHomePage = (
  given: DefineStepFunction,
  wrapperId: string
) => {
  given('the user opens the home page', () => {
    // check page is rendered
    expect(screen.findByTestId(`${wrapperId}-wrapped`)).toBeVisible();
  });
};
