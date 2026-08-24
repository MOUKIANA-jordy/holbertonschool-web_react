/* eslint-disable react-refresh/only-export-components */

import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
  return (
    <div className="mx-auto my-10 w-[80%] overflow-x-auto max-[912px]:my-6 max-[912px]:w-full">
      <table
        id="CourseList"
        className="w-full min-w-[320px] border-collapse"
      >
        <thead>
          {courses.length === 0 ? (
            <CourseListRow
              isHeader
              textFirstCell="No course available yet"
            />
          ) : (
            <>
              <CourseListRow
                isHeader
                textFirstCell="Available courses"
              />

              <CourseListRow
                isHeader
                textFirstCell="Course name"
                textSecondCell="Credit"
              />
            </>
          )}
        </thead>

        <tbody>
          {courses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
    })
  ),
};

export default WithLogging(CourseList);
