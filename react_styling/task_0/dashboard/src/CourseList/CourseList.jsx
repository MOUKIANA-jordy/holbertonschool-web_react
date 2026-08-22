/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';
import './CourseList.css';

function CourseList({ courses = [] }) {
  return (
    <table id="CourseList">
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
