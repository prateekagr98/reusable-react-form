import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import { withPropsTable } from 'storybook-addon-react-docgen';

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
    panelPosition: 'bottom',
    theme: custom_theme
  },
  readme: {
    codeTheme: 'github'
  }
});

addDecorator(withPropsTable({
  propTablesExclude: ["MainContainer", "Section"]
}));


// Fetch All Module stories
const moduleStories = require.context('../components', true, /\.story\.js$/);

function loadStories() {
  moduleStories.keys().forEach(moduleStories);
}

configure(loadStories, module);