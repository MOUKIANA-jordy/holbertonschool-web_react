# Holberton School Web React

This repository contains my React and frontend development projects completed during my Full-Stack Web Development training at Holberton School.

It brings together several progressive projects focused on modern frontend development, from JavaScript and TypeScript fundamentals to React components, hooks, state management, styling, and Redux.

## Screenshot

![React Project Screenshot](screenshots/react-dashboard.png)

## About This Repository

This repository documents my progression through several frontend development concepts and projects.

The goal was not only to learn React syntax, but also to understand how to structure applications, build reusable components, manage state, handle side effects, test components, and progressively introduce more advanced tools such as Redux Toolkit.

Each folder corresponds to a different stage of the learning process and focuses on a specific frontend concept.

## Main Topics Covered

### React Introduction

The `react_intro` projects introduced the core concepts of React, including:

- React application structure
- Components
- JSX
- Props
- Basic rendering
- Project configuration

### React Props

The `react_props` projects focused on:

- Passing data through props
- Reusable components
- Prop validation
- Component composition

### React Components

The `react_component` projects introduced:

- Class and functional components
- Component lifecycle
- Higher Order Components
- Reusable UI logic
- Component testing

### React Styling

The `react_styling` projects focused on:

- CSS integration
- Responsive interfaces
- Styling reusable components
- UI consistency
- Layout improvements

### React State

The `react_state` projects introduced:

- Component state
- Event handling
- Controlled inputs
- State updates
- User interactions

### React Hooks

The `react_hooks` projects focused on:

- `useState`
- `useEffect`
- Custom hooks
- Functional component logic
- Reusable stateful behavior

### React Redux

The `react_redux-part1` projects introduced Redux Toolkit and centralized state management.

Topics include:

- Redux slices
- `createSlice`
- `createAsyncThunk`
- Root reducers
- Redux store configuration
- `useSelector`
- `useDispatch`
- Authentication state
- Notifications state
- Course state
- Redux integration with React components
- API requests with Axios
- Unit testing Redux-connected components

### TypeScript

The `TypeScript` section focuses on:

- Type annotations
- Interfaces
- Functions
- Classes
- Type safety
- Working with typed JavaScript applications

### Webpack

The `Webpack` projects cover:

- Project bundling
- Asset management
- Development configuration
- Module handling
- Frontend build tooling

## Development Story

This repository represents my progression from basic frontend concepts to more structured React applications.

At the beginning, most components relied heavily on props and local component state. As the projects became more advanced, I learned how to separate responsibilities between components, hooks, state management, and API services.

One of the most important steps was moving from local state management to Redux Toolkit.

This required restructuring several components so that authentication, notifications, courses, and user actions were managed through a centralized Redux store instead of being passed through props.

I also had to update tests so that Redux-connected components were rendered inside a `Provider` and could interact with a test store.

## Challenges

One of the most difficult parts of this repository was progressively refactoring applications without breaking existing functionality.

For example, when Redux was introduced, several components that previously received data and handlers through props had to be rewritten to use `useSelector` and `useDispatch`.

This also affected the test suite. Components using Redux hooks could no longer be rendered independently without a `Provider`, so the unit tests had to be adapted to create and use Redux stores.

Other challenges included:

- Maintaining the same UI while changing internal state management
- Debugging import paths after reorganizing project structures
- Fixing test environments
- Mocking Axios API requests
- Handling async Redux thunks
- Maintaining lint compliance
- Working with reusable Higher Order Components
- Preserving component behavior during refactoring

These challenges helped me understand how frontend architecture changes affect both application code and testing.

## Testing

The projects use Jest and React Testing Library for unit testing.

Tests cover areas such as:

- Component rendering
- Props and state behavior
- User interactions
- Form validation
- Redux actions
- Redux reducers
- Async API requests
- Conditional rendering
- Login/logout behavior
- Notifications
- Courses

Example:


npm test


Linting is also used throughout the projects:


npm run lint


## Installation

Clone the repository:


git clone git@github.com:MOUKIANA-jordy/holbertonschool-web_react.git
cd holbertonschool-web_react


Each project has its own dependencies.

For example:


cd react_redux-part1/task_8/dashboard
npm install


Start the development server:


npm run dev


Run tests:

npm test

Run lint:

npm run lint


## Technologies

- React
- JavaScript
- TypeScript
- Redux Toolkit
- React Redux
- Axios
- Jest
- React Testing Library
- Vite
- Webpack
- HTML5
- CSS3
- Tailwind CSS
- ESLint

## Implemented Work

This repository includes completed exercises and projects covering:

- React components
- Reusable components
- Props
- State
- Hooks
- Higher Order Components
- Forms
- User interactions
- Responsive interfaces
- Redux Toolkit
- Authentication slices
- Notifications slices
- Course slices
- Async API requests
- Redux store configuration
- Redux-connected components
- Unit testing
- Frontend build tools

## Future Improvements

Some improvements I would like to continue making include:

- Improve documentation for individual tasks
- Add more screenshots
- Add more integration tests
- Improve accessibility
- Improve component reuse
- Improve consistency between project structures
- Continue cleaning and refactoring older exercises
- Add more complete demonstrations of the final React projects

## About the Developer

I am Jordy Wenceslas Moukiana, a Full-Stack Web Development student at Holberton School.

I am developing my skills in frontend and full-stack development, with a particular interest in React, Django, REST APIs, state management, testing, and building practical web applications.

This repository shows my progression through React and modern frontend development concepts.

My main Portfolio Project is StaffHub, a full-stack Human Resources management platform built with React and Django.

## Connect With Me

- LinkedIn: [Jordy Wenceslas Moukiana](https://www.linkedin.com/in/jordy-wenceslas-moukiana-636842274)
- X / Twitter: [@Jordinateur_242](https://x.com/Jordinateur_242)
- Portfolio Project: [StaffHub](https://github.com/MOUKIANA-jordy/STAFFHUB)

## Author

Jordy Wenceslas Moukiana

Full-Stack Web Developer  
Holberton School
