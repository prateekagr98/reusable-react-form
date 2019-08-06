import React from 'react';
import PropTypes from 'prop-types';

const sectionStyles = {
  paddingBottom: '64px'
};

const headingStyles = {
  fontSize: '14px'
};

const Section = props => (
  <div style={sectionStyles}>
    {props.heading ? <p style={headingStyles}>{props.heading}</p> : null} 
    {props.children}
  </div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string
};

export default Section;