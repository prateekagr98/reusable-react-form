import { configure, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';

const custom_theme = create({
  base: 'light',
    // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
  barTextColor: 'white',
  barSelectedColor: 'white',
  barBg: '#434ea2',
  colorSecondary: '#434ea2'
});
 
addParameters({
  options: {
    enableShortcuts: false,
    showPanel: true,
    panelPosition: 'right',
    theme: custom_theme
  },
  readme: {
    codeTheme: 'github'
  }
});


// Fetch All Module stories
const moduleStories = require.context('../modules', true, /\.story\.js$/);

function loadStories() {
  moduleStories.keys().forEach(moduleStories);
}

configure(loadStories, module);