
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
    let input = e.target.value.toString();
    let error_state = this.validateUserInput(input);

    this.props.handleOnInputBlur({
      value: this.state.value,
      error: error_state
    });

    this.setState({
      error: error_state
    });
  }

  validateUserInput(input) {
    let error_state = {
      enabled: false,
      message: ''
    };

    input = input.trim();

    if(this.props.required && !input.length) {
      error_state.enabled = true;
      error_state.message = 'This is a mandatory field';
    }

    if(this.props.min_length && input.length < this.props.min_length) {
      error_state.enabled = true;
      error_state.message = `Min. ${this.props.min_length} characters required`;
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
            type="text"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleUserInput.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            maxLength={this.props.max_length}
            minLength={this.props.min_length}
            required={this.props.required} />
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
            {this.props.show_text_counter ? `${this.state.counter}/${this.props.max_length}` : ''}
          </div>
        </div>
      </div>
    )
  }
};

Input.propTypes = {
  /** Name to be assigned to input field */
  name: PropTypes.string.isRequired,
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
  /** Triggered on input change */
  handleOnInputChange: PropTypes.func,
  /** Triggered when user moves out of the input */
  handleOnInputBlur: PropTypes.func.isRequired,
  /** Triggered on input change, used to perform custom validations if required. Returns error string */
  customValidation: PropTypes.func
};

Input.defaultProps = {
  help_text: '',
  show_text_counter: false,
  min_length: 0,
  max_length: 100,
  placeholder: 'Type here..',
  required: false,
  error_message: '',
  handleOnInputChange: () => {/* Empty func */},
  customValidation: () => {return '';}
};

export default Input;