
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './dropdown';
import OptionTypes from './option_types';

import { help_text_styles, error_text_style, input_error_style } from './select_common.styles';
import { style_container_styles, input_styles } from './single_select.styles';

class SingleSelect extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      open_dropdown: false,
      value: '',
      options: props.options,
      selected_option: null,
      error: {
        enabled: Boolean(this.props.error_message),
        message: this.props.error_message
      }
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    let _self = this;

    document.addEventListener(
      'mouseup',
      _self.handleOutsideClick.bind(_self)
      );
  }

  componentWillUnMount() {
    let _self = this;

    document.removeEventListener(
      'mouseup',
      _self.handleOutsideClick.bind(_self)
    );
  }

  handleOutsideClick(ev) {

    let isOwnNode = this.myRef && this.myRef.contains(ev.target);

    if(this.state.open_dropdown && !isOwnNode) {
      let new_state = {
        open_dropdown: false
      };

      if(!this.state.selected_option) {
        new_state.value = '';
      }

      this.setState(new_state);
      this.validateSelect();
    }
  }

  toggleDropdown(forced_option) {
    this.setState({
      open_dropdown: typeof forced_option !== 'undefined' ? forced_option : !this.state.open_dropdown
    });
  }

  filterOptions(ev) {
    let input_text = ev.target.value.toString();

    let searched_text = input_text.toLowerCase();

    let filtered_options = this.props.options.filter((item) => item.label.toLowerCase().indexOf(searched_text) !== -1);

    if(!filtered_options.length) {
      filtered_options.push({
        label: 'No Options available',
        value: 'No Options available',
        type: OptionTypes.NO_ACTION
      });
    }

    let updated_state = {
      value: input_text,
      options: filtered_options,
      selected_option: null
    };

    if(this.state.error.enabled) {
      updated_state.error = {
        enabled: false,
        message: ''
      }
    }

    this.setState(updated_state);

  }

  handleOptionSelect(option) {
    let value = '';
    let target_state = {
      open_dropdown: false
    };

    // In case of clicking outside the option won't be passed
    if(option) {
      let selected_option = this.props.options.filter((item) => item.value === option);

      if(selected_option.length) {
        value = selected_option[0].label;
        target_state.value = value;
        target_state.selected_option = selected_option[0];
      }
    }

    this.setState(target_state);
    this.props.handleOnOptionSelection({
      selection: selected_option[0],
      error: this.state.error
    });
  }

  createDOMRef(element) {
    this.myRef = element;
  }

  validateSelect() {
    if(this.props.required && !this.state.value) {
      this.setState({
        error: {
          enabled: true,
          message: 'This is a required field'
        }
      });
    }
  }

  render() {

    return (
      <div css={style_container_styles} ref={this.createDOMRef.bind(this)}>
        <input
          type="text"
          placeholder={this.props.placeholder}
          css={[input_styles, this.state.error.enabled ? input_error_style : null]}
          value={this.state.value}
          onClick={this.toggleDropdown.bind(this, undefined)}
          onChange={this.filterOptions.bind(this)}
          required={this.props.required} />
        {
          this.state.open_dropdown ? (
            <Dropdown options={this.state.options} onOptionClick={this.handleOptionSelect.bind(this)} />
          ) : null
        }
        {
          this.state.error.enabled ? (
            <div css={[help_text_styles, error_text_style]}>
              {this.state.error.message}
            </div>
          ) : this.props.help_text ? (
            <div css={help_text_styles}>
              {this.props.help_text}
            </div>
          ) : null
          
        }
      </div>
    )
  }
};

SingleSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  help_text: PropTypes.string,
  required: PropTypes.bool,
  error_message: PropTypes.string,
  handleOnOptionSelection: PropTypes.func
};

SingleSelect.defaultProps = {
  placeholder: 'Type to search..',
  help_text: '',
  required: true,
  error_message: '',
  handleOnOptionSelection: () => {/* Empty func */}
};

export default SingleSelect;
