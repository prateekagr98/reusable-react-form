
import React from 'react';
import { storiesOf } from '@storybook/react';

import MainContainer from '@decorators/main_container';
import Section from '@decorators/section';

import Select from './index';

const options = [
  {
    label: 'Choclate',
    value: 'choclate'
  },
  {
    label: 'Choco Lava',
    value: 'choco lava'
  },
  {
    label: 'Vanilla',
    value: 'vanilla'
  },
  {
    label: 'Strawberry',
    value: 'strawberry'
  },
  {
    label: 'Blueberry',
    value: 'blueberry'
  },
  {
    label: 'Tender Coconut',
    value: 'tender coconut'
  }
];

let SelectStories = storiesOf('Components', module);

SelectStories.add('Select', () => (
  <MainContainer>
    <Section heading="Basic Select">
      <Select options={options} help_text="This is the Help Text" />
    </Section>
  </MainContainer>
));
