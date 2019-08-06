import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  padding: 24,
  background: 'white'
};

const MainContainer = props => <div style={styles}>{props.children}</div>;

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContainer;