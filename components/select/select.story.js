
import React from 'react';
import { storiesOf } from '@storybook/react';

import MainContainer from '@decorators/main_container';
import Section from '@decorators/section';

import Select from './index';

let SelectStories = storiesOf('Components', module);

SelectStories.add('Select', () => (
  <MainContainer>
    <Section heading="Basic Select">
      <Select />
    </Section>
  </MainContainer>
));
