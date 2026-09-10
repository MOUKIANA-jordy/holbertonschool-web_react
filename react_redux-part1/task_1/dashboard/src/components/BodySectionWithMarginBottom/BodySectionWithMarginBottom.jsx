import PropTypes from 'prop-types';
import BodySection from '../BodySection/BodySection';

function BodySectionWithMarginBottom({
  title = '',
  children = null,
}) {
  return (
    <div className="bodySectionWithMargin mb-10 max-[520px]:mb-6">
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  );
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default BodySectionWithMarginBottom;
