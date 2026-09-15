import React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';

import {
  selectCourse,
  unSelectCourse,
} from '../../features/courses/coursesSlice';

function CourseList() {
  const dispatch = useDispatch();

  const courses = useSelector(
    (state) => state.courses.courses
  );

  const onChangeRow = (id, checked) => {
    if (checked) {
      dispatch(selectCourse(id));
    } else {
      dispatch(unSelectCourse(id));
    }
  };

  if (courses.length === 0) {
    return (
      <div className="mx-auto my-10 w-[80%] overflow-x-auto max-[912px]:my-6 max-[912px]:w-full">
        <table
          id="CourseList"
          className="w-full min-w-[320px] border-collapse"
        >
          <thead>
            <CourseListRow
              isHeader={true}
              textFirstCell="No course available yet"
            />
          </thead>

          <tbody />
        </table>
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 w-[80%] overflow-x-auto max-[912px]:my-6 max-[912px]:w-full">
      <table
        id="CourseList"
        className="w-full min-w-[320px] border-collapse"
      >
        <thead>
          <CourseListRow
            isHeader={true}
            textFirstCell="Available courses"
          />

          <CourseListRow
            isHeader={true}
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </thead>

        <tbody>
          {courses.map((course) => (
            <CourseListRow
              key={course.id}
              id={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
              isSelected={course.isSelected}
              changeRow={onChangeRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CourseListWithLogging =
  WithLogging(CourseList);

export { CourseList };

export default CourseListWithLogging;
