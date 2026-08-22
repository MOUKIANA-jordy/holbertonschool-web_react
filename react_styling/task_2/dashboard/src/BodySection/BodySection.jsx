import React from 'react';
import PropTypes from 'prop-types';

function BodySection({ title, children }) {
  return (
    <div className="bodySection">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

BodySection.defaultProps = {
  title: '',
  children: null,
};

BodySection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default BodySection;
