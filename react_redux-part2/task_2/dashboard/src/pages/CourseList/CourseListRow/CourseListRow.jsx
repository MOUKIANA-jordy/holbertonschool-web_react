import React from 'react';
import PropTypes from 'prop-types';

function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
  id = null,
  isSelected = false,
  changeRow = () => {},
}) {
  const rowClasses = isHeader
    ? 'bg-table-header opacity-[66%]'
    : 'bg-table-rows opacity-[45%]';

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
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(event) =>
            changeRow(
              id,
              event.target.checked
            )
          }
        />

        <span className="ml-2">
          {textFirstCell}
        </span>
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

  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  isSelected: PropTypes.bool,

  changeRow: PropTypes.func,
};

export default CourseListRow;
