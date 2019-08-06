
import React from 'react';
import { storiesOf } from '@storybook/react';

import MainContainer from '@decorators/main_container';
import Section from '@decorators/section';

import Input from './index';

let InputStories = storiesOf('Modules', module);

InputStories.add('Input', () => (
  <MainContainer>
    <Section heading="Basic Input with default validations">
      <Input
        label="Call Now"
        help_text="This is the Help Text"
        show_text_counter />
    </Section>
  </MainContainer>
));
