
import React from 'react';
import PropTypes from 'prop-types';

import { dropdown_option_styles } from './single_select.styles';

const NonActionOption = (props) => (
  <div css={dropdown_option_styles}>{props.label}</div>
);

NonActionOption.propTypes = {
  label: PropTypes.string.isRequired
};

export default NonActionOption;