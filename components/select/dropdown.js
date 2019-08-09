
import React from 'react';
import PropTypes from 'prop-types';

import DropdownOption from './dropdown_option';
import NonActionOption from './non_action_option';

import OptionTypes from './option_types';

import { dropdown_container_styles } from './select_common.styles';

const Dropdown = (props) => (
  <div css={dropdown_container_styles}>
    {
      props.options.length && props.options.map((item) => {
        switch(item.type) {
          
          case OptionTypes.NO_ACTION:
            return (
              <NonActionOption {...item} />
            );
            break;
          
          case OptionTypes.OPTION:
          default:
            return (
              <DropdownOption
                key={item.value}
                onOptionClick={props.onOptionClick}
                {...item} />
            );
            break;
        }
      })
    }
  </div>
);

Dropdown.propTypes = {
  options: PropTypes.array,
  onOptionClick: PropTypes.func
};

Dropdown.defaultProps = {
  options: []
};

export default Dropdown;