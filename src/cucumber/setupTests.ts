import '@testing-library/jest-dom';
import { setJestCucumberConfiguration } from 'jest-cucumber';

setJestCucumberConfiguration({
  errors: {
    missingScenarioInStepDefinitions: false, // Error when a scenario is in the feature file, but not in the step definition
    missingStepInStepDefinitions: true, // Error when a step is in the feature file, but not in the step definitions
    missingScenarioInFeature: true, // Error when a scenario is in the step definitions, but not in the feature
    missingStepInFeature: true, // Error when a step is in the step definitions, but not in the feature
  },
});
