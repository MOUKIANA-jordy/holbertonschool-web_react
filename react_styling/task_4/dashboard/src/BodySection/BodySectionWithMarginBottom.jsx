import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';

function BodySectionWithMarginBottom({
  title,
  children,
}) {
  return (
    <div className="bodySectionWithMargin mb-10 max-[520px]:mb-6">
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
