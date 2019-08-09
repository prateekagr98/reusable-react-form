
import React from 'react';
import { storiesOf } from '@storybook/react';

import MainContainer from '@decorators/main_container';
import Section from '@decorators/section';

import SingleSelect from './single_select';

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

let SelectStories = storiesOf('Components/Select', module);

SelectStories.add('Single Select', () => (
  <MainContainer>
    <Section heading="Basic Select">
      <SingleSelect options={options} help_text="This is the Help Text" />
    </Section>
  </MainContainer>
));
