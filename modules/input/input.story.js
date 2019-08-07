
import React from 'react';
import { storiesOf } from '@storybook/react';

import MainContainer from '@decorators/main_container';
import Section from '@decorators/section';

import Input from './index';

let InputStories = storiesOf('Modules', module);

InputStories.add('Input', () => (
  <MainContainer>
    <Section heading="Basic Input with default props and validations">
      <Input />
    </Section>
    <Section heading="Input with help text">
      <Input help_text="This is a Help text" />
    </Section>
    <Section heading="Input with help text and counter">
      <Input help_text="This is a Help text" show_text_counter />
    </Section>
  </MainContainer>
));
