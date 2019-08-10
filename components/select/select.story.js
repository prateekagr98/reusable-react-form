
import React from 'react';
import { storiesOf } from '@storybook/react';

import MainContainer from '@decorators/main_container';
import Section from '@decorators/section';

import SingleSelect from './single_select';
import MultiSelect from './multi_select';

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
      <SingleSelect options={options} />
    </Section>
    <Section heading="Select with help text">
      <SingleSelect options={options} help_text="This is a Help Text" />
    </Section>
    <Section heading="Mandatory Select">
      <SingleSelect options={options} help_text="This is a Help Text" required />
    </Section>
    <Section heading="Select with initial value">
      <SingleSelect options={options} help_text="This is a Help Text" value="blueberry" />
    </Section>
  </MainContainer>
));


SelectStories.add('Multi Select', () => (
  <MainContainer>
    <Section heading="Basic Multi Select">
      <MultiSelect options={options} />
    </Section>
    <Section heading="Multi Select with Help text">
      <MultiSelect options={options} help_text="This is a Help Text" />
    </Section>
    <Section heading="Mandatory Multi Select">
      <MultiSelect options={options} help_text="This is a Help Text" required />
    </Section>
    <Section heading="Multi Select with initial selection">
      <MultiSelect options={options} help_text="This is a Help Text" pre_selection={[options[0], options[3]]} />
    </Section>
  </MainContainer>
));
