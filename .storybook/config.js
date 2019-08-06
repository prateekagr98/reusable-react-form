import { configure } from '@storybook/react';

// Fetch All Module stories
const moduleStories = require.context('../modules', true, /\.story\.js$/);

function loadStories() {
  moduleStories.keys().forEach(moduleStories);
}

configure(loadStories, module);