import React from 'react';
import PropTypes from 'prop-types';

const infoBoxStyles = {
  fontSize: '12px',
  marginBottom: '12px',
  backgroundColor: '#dff8f6',
  color: '#14aa9b',
  padding: '12px',
  borderRadius: '4px',
  border: '1px solid #dff8f6'
};

const InfoBox = props => (
  <div style={infoBoxStyles}>
    {props.children}
  </div>
);

InfoBox.propTypes = {
  children: PropTypes.node.isRequired
};

export default InfoBox;