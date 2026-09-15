cat > README.md <<'EOF'
# React Redux - Part 2 - Task 0

## Now You See ME

This task improves the performance of the Notifications component by removing the notification drawer visibility state from Redux.

The notification drawer is now shown and hidden directly using a React `useRef` reference and an Aphrodite `visible` CSS style.

### Changes

- Removed `displayDrawer` from the notifications Redux state.
- Removed `showDrawer` and `hideDrawer` Redux actions.
- Added `useRef` to the Notifications component.
- Added a `visible` Aphrodite style.
- Notification visibility is toggled without triggering unnecessary React re-renders.
- Updated unit tests for the new drawer behavior.
EOF
