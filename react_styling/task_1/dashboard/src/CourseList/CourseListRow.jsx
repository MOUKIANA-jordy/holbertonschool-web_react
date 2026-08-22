import React from 'react';
import PropTypes from 'prop-types';

function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  const rowClasses = isHeader
    ? 'bg-table-header/[66%]'
    : 'bg-table-rows/[45%]';

  const headerCellClasses =
    'border border-gray-400';

  const dataCellClasses =
    'border border-gray-400 pl-2';

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={rowClasses}>
          <th
            className={headerCellClasses}
            colSpan="2"
          >
            {textFirstCell}
          </th>
        </tr>
      );
    }

    return (
      <tr className={rowClasses}>
        <th className={headerCellClasses}>
          {textFirstCell}
        </th>

        <th className={headerCellClasses}>
          {textSecondCell}
        </th>
      </tr>
    );
  }

  return (
    <tr className={rowClasses}>
      <td className={dataCellClasses}>
        {textFirstCell}
      </td>

      <td className={dataCellClasses}>
        {textSecondCell}
      </td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  textSecondCell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default CourseListRow;
