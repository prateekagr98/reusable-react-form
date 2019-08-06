
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
        enabled: false,
        message: ''
      }
    }
  }

  handleUserInput(e) {
    let input = e.target.value.toString();

    this.setState({
      counter: input.length,
      value: input,
      input_clear: !!input.trim().length
    });

    this.validateUserInput(input.trim());
  }

  handleOnBlur(e) {
    let input = e.target.value.toString().trim();
    this.validateUserInput(input);
  }

  validateUserInput(input) {

    if(this.props.min_length && input.length < this.props.min_length) {
      this.setState({
        error: {
          enabled: true,
          message: `Min. ${this.props.min_length} characters required`
        }
      });

      return;
    }

    this.setState({
      error: {
        enabled: false,
        message: ''
      }
    });
  }

  render() {
    return (
      <div>
        <div css={input_container_styles}>
          <input
            css={[input_styles, this.state.error.enabled ? input_error_style : null]}
            type="text"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleUserInput.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            maxLength={this.props.max_length}
            minLength={this.props.min_length} />
        </div>
        <div>
          <div css={[grid_styles, error_text_style]}>
            {
              this.state.error.enabled ? this.state.error.message : null
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
  left_icon_class: PropTypes.string,
  right_icon_class: PropTypes.string,
  help_text: PropTypes.string,
  show_text_counter: PropTypes.bool,
  min_length: PropTypes.number,
  max_length: PropTypes.number,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  left_icon_class: '',
  right_icon_class: '',
  help_text: '',
  show_text_counter: false,
  min_length: 10,
  max_length: 100,
  placeholder: 'Type here..'
};

export default Input;