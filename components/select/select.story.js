
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ReadMe from './README.md';

import MainContainer from '@decorators/main_container';
import Section from '@decorators/section';
import InfoBox from '@decorators/info_box';

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

let SelectStories = storiesOf('Components/Select', module)
  .addParameters({
    readme: {
      sidebar: ReadMe
    }
  });

SelectStories.add('Single Select', () => (
  <MainContainer>
    <Section heading="Basic Select">
      <SingleSelect
        options={options}
        handleOnOptionSelection={action('Basic Select: On Option Select')} />
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
    <Section heading="Select with option to create">
      <InfoBox>
        Shows an option to create a new option in case none is found in the list
      </InfoBox>
      <SingleSelect options={options} help_text="This is a Help Text" is_creatable />
    </Section>
  </MainContainer>
));


SelectStories.add('Multi Select', () => (
  <MainContainer>
    <Section heading="Basic Multi Select">
      <MultiSelect
        options={options}
        handleOnOptionSelection={action('Basic Multi Select: On Option Select')}
        handleOnOptionRemove={action('Basic Multi Select: On Option Remove')} />
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
    <Section heading="Multi Select with initial selection">
      <InfoBox>
        Shows an option to create a new option in case none is found in the list
      </InfoBox>
      <MultiSelect options={options} help_text="This is a Help Text" is_creatable />
    </Section>
  </MainContainer>
));
