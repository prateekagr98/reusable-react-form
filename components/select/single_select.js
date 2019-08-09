
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './dropdown';
import OptionTypes from './option_types';

import { style_container_styles, input_styles, help_text_styles } from './single_select.styles';

class SingleSelect extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      open_dropdown: false,
      value: '',
      options: props.options,
      selected_option: null
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

    this.setState({
      value: input_text,
      options: filtered_options,
      selected_option: null
    });

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
  }

  createDOMRef(element) {
    this.myRef = element;
  }

  render() {

    return (
      <div css={style_container_styles} ref={this.createDOMRef.bind(this)}>
        <input
          type="text"
          placeholder={this.props.placeholder}
          css={input_styles}
          value={this.state.value}
          onClick={this.toggleDropdown.bind(this, undefined)}
          onChange={this.filterOptions.bind(this)} />
        {
          this.state.open_dropdown ? (
            <Dropdown options={this.state.options} onOptionClick={this.handleOptionSelect.bind(this)} />
          ) : null
        }
        {
          this.props.help_text ? (
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
  help_text: PropTypes.string
};

SingleSelect.defaultProps = {
  placeholder: 'Type to search..',
  help_text: ''
};

export default SingleSelect;
