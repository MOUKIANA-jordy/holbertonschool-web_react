import React from 'react';
import PropTypes from 'prop-types';

function BodySection({ title, children }) {
  return (
    <div className="bodySection mx-10 max-[912px]:mx-5 max-[520px]:mx-2">
      <h2 className="mb-4 text-2xl font-bold max-[520px]:text-xl">
        {title}
      </h2>

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
