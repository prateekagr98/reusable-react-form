
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './dropdown';
import OptionTypes from './option_types';

import '../../styles/fonts.css';
import { help_text_styles, error_text_style, input_error_style } from './select_common.styles';
import { style_container_styles, input_styles } from './single_select.styles';

class SingleSelect extends React.PureComponent {

  constructor(props) {
    super(props);

    let initial_selection = null;

    if(props.value) {
      initial_selection = props.options.filter((item) => item.value === props.value);

      if(initial_selection.length) {
        initial_selection = initial_selection[0];
      } else {
        initial_selection = null;
      }
    }

    this.state = {
      open_dropdown: false,
      value: initial_selection && initial_selection.label || '',
      options: props.options,
      selected_option: initial_selection,
      error: {
        enabled: Boolean(this.props.error_message),
        message: this.props.error_message
      }
    };
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

      let validation_message = this.validateSelect();

      if(validation_message) {
        new_state.error = {
          enabled: true,
          message: validation_message
        };
      }

      this.setState(new_state, () => {
        this.props.handleOnOptionSelection({
          selection: this.state.selected_option,
          error: this.state.error
        });
      });
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

    if(!filtered_options.length && !this.props.is_creatable) {
      filtered_options.push({
        label: 'No Options available',
        value: 'No Options available',
        type: OptionTypes.NO_ACTION
      });
    }

    if(!filtered_options.length && this.props.is_creatable) {
      filtered_options.push({
        label: searched_text,
        value: searched_text,
        type: OptionTypes.CREATE
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

  handleOptionSelect(selection) {
    let value = '';
    let target_state = {
      open_dropdown: false,
      error: {
        enabled: false,
        message: ''
      }
    };

    // In case of clicking outside the selection won't be passed
    if(selection) {
      target_state.value = selection.label;
      target_state.selected_option = selection;
    }

    this.setState(target_state, () => {
      this.props.handleOnOptionSelection({
        selection: this.state.selected_option,
        error: this.state.error
      });
    });
  }

  createDOMRef(element) {
    this.myRef = element;
  }

  validateSelect() {
    if(this.props.required && !this.state.value) {
      return 'This is a required field';
    }

    return '';
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
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
      ]).isRequired
  })).isRequired,
  placeholder: PropTypes.string,
  help_text: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  error_message: PropTypes.string,
  is_creatable: PropTypes.bool,
  handleOnOptionSelection: PropTypes.func
};

SingleSelect.defaultProps = {
  placeholder: 'Type to search..',
  help_text: '',
  required: false,
  error_message: '',
  value: '',
  is_creatable: false,
  handleOnOptionSelection: () => {/* Empty func */}
};

export default SingleSelect;
