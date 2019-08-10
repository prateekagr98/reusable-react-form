
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ReadMe from './README.md';

import MainContainer from '@decorators/main_container';
import Section from '@decorators/section';
import InfoBox from '@decorators/info_box';

import Input from './index';

let InputStories = storiesOf('Components', module)
  .addParameters({
    readme: {
      sidebar: ReadMe
    }
  });

InputStories.add('Input', () => (
  <MainContainer>
    <Section heading="Basic Text Input with default props and validations with auto focus">
      <Input
        auto_focus={true}
        handleOnInputBlur={action('Basic Input: On Input Blur')}
        handleOnInputChange={action('Basic Input: On Input Change')}/>
    </Section>
    <Section heading="Input with help text">
      <Input help_text="This is a Help text" />
    </Section>
    <Section heading="Input with help text and counter">
      <InfoBox>
        Displayes help text and counter. Default value of max characters is 100.
        Trailing spaces are excluded from validation. Counter is only available on type text and email.
      </InfoBox>
      <Input help_text="This is a Help text" show_text_counter />
    </Section>
    <Section heading="Number Input">
      <InfoBox>
        This input only accepts numbers. However entering a number greater than the Float range will throw error
      </InfoBox>
      <Input
        type="number"
        help_text="Input can only be numbers" />
    </Section>
    <Section heading="Email Input">
      <InfoBox>
        This input only accepts valid emails. Emails are verified agains validations on HTML input type.
      </InfoBox>
      <Input
        type="email"
        max_length={20}
        help_text="Input can only be an email"
        show_text_counter />
    </Section>
    <Section heading="Input with min and max length">
      <InfoBox>
        Entering less than 10 characters will throw an error. However since this is not a required field
        hence moving out of the input will not throw any error.
      </InfoBox>
      <Input
        help_text="Should be atleast 10 characters"
        min_length={10}
        max_length={50}
        show_text_counter />
    </Section>
    <Section heading="Required Input">
      <InfoBox>
        This is a required input field. Focusing on the input and moving out will throw away an error.
      </InfoBox>
      <Input
        help_text="This is a mandatory field"
        show_text_counter
        required />
    </Section>
    <Section heading="Input with custom error message">
      <InfoBox>
        This input is shown with a custom error message.
      </InfoBox>
      <Input
        type="text"
        help_text="Error shown at start"
        error_message="This is a custom error"
        show_text_counter />
    </Section>
    <Section heading="Input with custom validation">
      <InfoBox>
        This input throws error if input is not "tom and jerry".
      </InfoBox>
      <Input
        type="text"
        help_text="Fixed input value"
        customValidation={(input) => (input !== 'tom and jerry' ? 'Text should be tom and jerry' : '')}
        show_text_counter />
    </Section>
  </MainContainer>
));
