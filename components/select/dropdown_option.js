
import React from 'react';
import PropTypes from 'prop-types';

import { dropdown_option_styles, actionable_option_styles } from './select_common.styles';

const DropdownOption = (props) => {

  let onOptionClickHandler = function(ev) {
    ev.stopPropagation();
    props.onOptionClick({
      label: props.label,
      value: props.value
    });
  }

  return (
  <div css={[dropdown_option_styles, actionable_option_styles]} onClick={onOptionClickHandler}>{props.label}</div>
)};

DropdownOption.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onOptionClick: PropTypes.func
}

export default DropdownOption;