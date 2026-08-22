import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import './BodySectionWithMarginBottom.css';

function BodySectionWithMarginBottom({
  title,
  children,
}) {
  return (
    <div className="bodySectionWithMargin">
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}

BodySectionWithMarginBottom.defaultProps = {
  title: '',
  children: null,
};

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default BodySectionWithMarginBottom;
