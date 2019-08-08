
import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/fonts.css';
import { input_styles, grid_styles, counter_styles, error_text_style, input_error_style, close_icon_style, input_container_styles } from './input.styles';

class Input extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      input_clear: false,
      counter: 0,
      value: '',
      error: {
        enabled: Boolean(this.props.error_message),
        message: this.props.error_message
      }
    }
  }

  handleUserInput(e) {
    let input = e.target.value.toString();

    let error_state = this.validateUserInput(input);

    this.props.handleOnInputChange({
      value: input,
      error: error_state
    });

    this.setState({
      counter: input.length,
      value: input,
      input_clear: !!input.trim().length,
      error: error_state
    });
  }

  handleOnBlur(e) {
    let input = e.target.value.toString().trim();
    let error_state = this.validateUserInput(input);
    
    if(!this.props.required && !input) {
      error_state = {
        enabled: false,
        message: ''
      };
    }

    this.props.handleOnInputBlur({
      value: input,
      error: error_state
    });

    this.setState({
      error: error_state
    });
  }

  validateNumberInput(input) {
    let int_input = parseFloat(input);

    // Check works when the first input is not number.
    if(isNaN(int_input)) {
      return 'Only numbers allowed as input';
    }

    // Check works when first input is a number and post that there is a letter.
    if(int_input.toString().length !== input.length) {
      return 'Only numbers allowed as input';
    }
  }

  validateEmailInput(input) {
    let email_regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let matches = input.match(email_regex);

    if(!matches) {
      return 'Enter valid email address';
    }
  }

  validateUserInput(input) {
    let error_state = {
      enabled: false,
      message: ''
    };

    let type_error_msg;

    input = input.trim();

    if(this.props.required && !input.length) {
      error_state.enabled = true;
      error_state.message = 'This is a mandatory field';
    }

    if(this.props.min_length && input.length < this.props.min_length) {
      error_state.enabled = true;
      error_state.message = `Min. ${this.props.min_length} characters required`;
    }

    switch(this.props.type) {
      case 'number':
        type_error_msg = this.validateNumberInput(input);
        break;
      case 'email':
        type_error_msg = this.validateEmailInput(input);
        break;
    }

    if(type_error_msg) {
      error_state.enabled = true;
      error_state.message = type_error_msg;
    }

    let custom_error_message = this.props.customValidation(input);

    if(typeof custom_error_message === 'string' && custom_error_message.trim()) {
      error_state.enabled = true;
      error_state.message = custom_error_message;
    }

    return error_state;
  }

  render() {
    return (
      <div>
        <div css={input_container_styles}>
          <input
            name={this.props.name}
            css={[input_styles, this.state.error.enabled ? input_error_style : null]}
            type={this.props.type}
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleUserInput.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            maxLength={this.props.max_length}
            minLength={this.props.min_length}
            required={this.props.required}
            autoFocus={this.props.auto_focus} />
        </div>
        <div>
          <div css={[grid_styles, this.state.error.enabled ? error_text_style : null]}>
            {
              this.state.error.enabled ? this.state.error.message : (
                this.props.help_text ? this.props.help_text : ''
              )
            }
          </div>
          <div css={[grid_styles, counter_styles, this.state.error.enabled ? error_text_style : null]}>
            {this.props.show_text_counter && this.props.type !== 'number' ? `${this.state.counter}/${this.props.max_length}` : ''}
          </div>
        </div>
      </div>
    )
  }
};

Input.propTypes = {
  /** Name to be assigned to input field */
  name: PropTypes.string.isRequired,
  /* Type of input to be provided. Accepted values: text, number, email */
  type: PropTypes.oneOf(['text', 'number', 'email']),
  /** Help text to be displayed below the input, can be used to convey the constraints on input */
  help_text: PropTypes.string,
  /** Show/Hide the input counter length, used with max_length property */
  show_text_counter: PropTypes.bool,
  /** Min. length of the input required */
  min_length: PropTypes.number,
  /** Max. length of the input required */
  max_length: PropTypes.number,
  /** Placeholder for empty input */
  placeholder: PropTypes.string,
  /** Specifies if the input is mandatpry or not */
  required: PropTypes.bool,
  /** To pass custom error message, this will enable error state */
  error_message: PropTypes.string,
  /** Auto focus input on page load */
  auto_focus: PropTypes.bool,
  /** Triggered on input change */
  handleOnInputChange: PropTypes.func,
  /** Triggered when user moves out of the input */
  handleOnInputBlur: PropTypes.func.isRequired,
  /** Triggered on input change, used to perform custom validations if required. Returns error string */
  customValidation: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  help_text: '',
  show_text_counter: false,
  min_length: 0,
  max_length: 100,
  placeholder: 'Type here..',
  required: false,
  error_message: '',
  auto_focus: false,
  handleOnInputChange: () => {/* Empty func */},
  customValidation: () => {return '';}
};

export default Input;