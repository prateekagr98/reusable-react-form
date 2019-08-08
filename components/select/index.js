
import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/fonts.css';

import SingleSelect from './single_select';

const Select = (props) => (
  <div>
    {
      !props.allow_multiple ? <SingleSelect {...props} /> : null
    }
  </div>
);

Select.propTypes = {
  allow_multiple: PropTypes.bool
};

Select.defaultProps = {
  allow_multiple: false
};

export default Select;