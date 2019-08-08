
import React from 'react';
import PropTypes from 'prop-types';

import { dropdown_option_styles } from './single_select.styles';

const DropdownOption = (props) => (
  <div css={dropdown_option_styles}>{props.label}</div>
);

export default DropdownOption;