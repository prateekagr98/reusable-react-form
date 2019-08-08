
import React from 'react';
import PropTypes from 'prop-types';

import DropdownOption from './dropdown_option';

import { dropdown_container_styles } from './single_select.styles';

const Dropdown = (props) => (
  <div css={dropdown_container_styles}>
    {
      props.options.map((item) => <DropdownOption {...item} />)
    }
  </div>
);

export default Dropdown;