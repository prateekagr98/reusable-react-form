
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './dropdown';
import OptionTypes from './option_types';

import '../../styles/fonts.css';
import { help_text_styles, error_text_style, input_error_style } from './select_common.styles';
import { style_container_styles, select_input_styles, input_styles, selected_option_styles } from './multi_select.styles';

class MultiSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      is_open_dropdown: false,
      options: props.options,
      selected_options: props.pre_selection,
      error: {
        enabled: false,
        message: ''
      }
    };

    this.containerRef = null;
    this.inputRef = null;    
  }

  createContainerRef(element) {
    this.containerRef = element;
  }

  createInputRef(element) {
    this.inputRef = element;
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
    
    let isOwnNode = this.containerRef && this.containerRef.contains(ev.target);
    let updated_state = {};

    if(this.state.is_open_dropdown && !isOwnNode) {
      updated_state.is_open_dropdown = false;
    }

    let error_message = this.validateSelection();

    if(error_message) {
      updated_state.error = {
        enabled: true,
        message: error_message
      };
    }

    this.updateState(updated_state);
  }

  validateSelection() {
    let message = '';

    if(this.props.required && !this.state.selected_options.length) {
      message = 'This is a required field';
    }

    return message;
  }

  onSelectInputClick(ev) {
    this.inputRef && this.inputRef.focus();

    let updated_options = Object.assign([], this.props.options);

    if(this.state.selected_options.length) {
      let selected_values = this.state.selected_options.map((item) => item.value);
      updated_options = updated_options.filter((item) => selected_values.indexOf(item.value) === -1 );
    }

    this.updateState({
      is_open_dropdown: !this.state.is_open_dropdown,
      options: updated_options,
      error: {
        enabled: false,
        message: ''
      }
    });
  }

  filterOptions(ev) {
    let input_text = ev.target.value.toString();

    let searched_text = input_text.trim().toLowerCase();

    let filtered_options = this.props.options.filter((item) => item.label.toLowerCase().indexOf(searched_text) !== -1);

    let selected_values = this.state.selected_options.map((item) => item.value);

    filtered_options = filtered_options.filter((item) => selected_values.indexOf(item.value) === -1);

    let updated_state = {
      options: filtered_options
    };

    if(!this.state.is_open_dropdown) {
      updated_state.is_open_dropdown = true;
    }

    updated_state.error = {
      enabled: false,
      message: ''
    };

    this.updateState(updated_state);
  }

  handleOptionSelect(selection) {

    let updated_options = this.state.options.filter((item) => item.value !== selection.value);

    this.updateState({
      options: updated_options,
      selected_options: [...this.state.selected_options, selection],
      error: {
        enabled: false,
        message: ''
      }
    });
  }

  fetchMultiSelectionsLayout() {
    let layout = null;

    layout = this.state.selected_options.map((item) => (
      <div
        key={item.value}
        css={selected_option_styles}
        onClick={this.removeSelection.bind(this, {label: item.label, value: item.value})}>
        {item.label}
      </div>
    ));

    return layout;
  }

  removeSelection(selection) {
    let updated_state = {
      options: [...this.state.options, selection],
      selected_options: this.state.selected_options.filter((item) => item.value !== selection.value)
    };

    this.updateState(updated_state);
  }

  updateState(target_state) {

    let new_state = Object.assign({}, target_state);

    new_state.options = new_state.options || this.state.options;

    // Filter selection from the displayed options
    if(this.state.selected_options.length) {
      let selected_values = this.state.selected_options.map((item) => item.value);
      new_state.options = new_state.options.filter((item) => selected_values.indexOf(item.value) === -1);
    }

    // Add No Options text if after filtering there are no options left
    if(!new_state.options.length && !this.props.is_creatable) {
      new_state.options.push({
        label: 'No Options available',
        value: 'No Options available',
        type: OptionTypes.NO_ACTION
      });
    }

    if(!new_state.options.length && this.props.is_creatable) {
      new_state.options.push({
        label: this.inputRef.value,
        value: this.inputRef.value,
        type: OptionTypes.CREATE
      });
    }

    this.setState(new_state);
  }
 
  render() {
    return (
      <div css={style_container_styles} ref={this.createContainerRef.bind(this)}>
        <div
          css={[select_input_styles, this.state.error.enabled ? input_error_style : null]}
          onClick={this.onSelectInputClick.bind(this)} >
          {this.fetchMultiSelectionsLayout()}
          <input
            type="text"
            css={input_styles}
            ref={this.createInputRef.bind(this)}
            onChange={this.filterOptions.bind(this)}
            placeholder="Type to search.." />
        </div>
        {
          this.state.is_open_dropdown ? (
            <Dropdown
              options={this.state.options}
              onOptionClick={this.handleOptionSelect.bind(this)} />
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

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
      ]).isRequired
  })).isRequired,
  pre_selection: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
      ]).isRequired
  })),
  help_text: PropTypes.string,
  is_creatable: PropTypes.bool,
  required: PropTypes.bool
};

MultiSelect.defaultProps = {
  pre_selection: [],
  help_text: '',
  required: false,
  is_creatable: false
};

export default MultiSelect;