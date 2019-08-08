
import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './dropdown';

import { style_container_styles, input_styles } from './single_select.styles';

const options = [
  {
    label: 'Option 1',
    value: 1
  },
  {
    label: 'Option 2',
    value: 2
  },
  {
    label: 'Option 3',
    value: 3
  },
  {
    label: 'Option 4',
    value: 4
  },
  {
    label: 'Option 5',
    value: 5
  }
];

class SingleSelect extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      open_dropdown: false,
      value: '',
      options: options
    };
  }

  toggleDropdown(forced_option) {
    this.setState({
      open_dropdown: typeof forced_option !== 'undefined' ? forced_option : !this.state.open_dropdown
    });
  }

  filterOptions(ev) {
    let input_text = ev.target.value.toString();

    let filtered_options = options.filter((item) => item.label.indexOf(input_text) !== -1);

    if(!filtered_options.length) {
      filtered_options.push({
        label: 'No Options found',
        value: 'No Options found'
      });
    }

    this.setState({
      value: input_text,
      options: filtered_options
    });

  }

  render() {

    return (
      <div css={style_container_styles}>
        <input
          type="text"
          css={input_styles}
          value={this.state.value}
          onClick={this.toggleDropdown.bind(this, undefined)}
          onChange={this.filterOptions.bind(this)}
          onBlur={this.toggleDropdown.bind(this, false)} />
        {
          this.state.open_dropdown ? (
            <Dropdown options={this.state.options} />
          ) : null
        }
      </div>
    )
  }
};

export default SingleSelect;