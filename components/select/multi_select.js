
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './dropdown';
import OptionTypes from './option_types';

import '../../styles/fonts.css';
import { style_container_styles, select_input_styles, input_styles, selected_option_styles } from './multi_select.styles';

class MultiSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      is_open_dropdown: false,
      options: props.options,
      selected_options: props.pre_selection
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

    if(this.state.is_open_dropdown && !isOwnNode) {
      this.setState({
        is_open_dropdown: false
      });
    }
  }

  onSelectInputClick(ev) {
    this.inputRef && this.inputRef.focus();

    let updated_options = Object.assign([], this.state.options);

    if(this.state.selected_options.length) {
      let selected_values = this.state.selected_options.map((item) => item.value);
      updated_options = updated_options.filter((item) => selected_values.indexOf(item.value) === -1 );
    }

    if(!updated_options.length) {
      updated_options.push({
        label: 'No Options available',
        value: 'No Options available',
        type: OptionTypes.NO_ACTION
      });
    }

    this.setState({
      is_open_dropdown: !this.state.is_open_dropdown,
      options: updated_options
    });
  }

  filterOptions(ev) {
    let input_text = ev.target.value.toString();

    let searched_text = input_text.toLowerCase();

    let filtered_options = this.props.options.filter((item) => item.label.toLowerCase().indexOf(searched_text) !== -1);

    let selected_values = this.state.selected_options.map((item) => item.value);

    filtered_options = filtered_options.filter((item) => selected_values.indexOf(item.value) === -1);

    if(!filtered_options.length) {
      filtered_options.push({
        label: 'No Options available',
        value: 'No Options available',
        type: OptionTypes.NO_ACTION
      });
    }

    let updated_state = {
      options: filtered_options
    };

    if(!this.state.is_open_dropdown) {
      updated_state.is_open_dropdown = true;
    }

    this.setState(updated_state);
  }

  handleOptionSelect(selection) {

    let updated_options = this.state.options.filter((item) => item.value !== selection.value);

    if(!updated_options.length) {
      updated_options.push({
        label: 'No Options available',
        value: 'No Options available',
        type: OptionTypes.NO_ACTION
      });
    }

    this.setState({
      options: updated_options,
      selected_options: [...this.state.selected_options, selection]
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

    this.setState({
      options: [...this.state.options, selection],
      selected_options: this.state.selected_options.filter((item) => item.value !== selection.value)
    });
  }
 
  render() {
    return (
      <div css={style_container_styles} ref={this.createContainerRef.bind(this)}>
        <div
          css={select_input_styles}
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
      </div>
    )
  }
};

MultiSelect.propTypes = {
  options: PropTypes.array,
  pre_selection: PropTypes.array
};

MultiSelect.defaultProps = {
  pre_selection: []
};

export default MultiSelect;