# Accessibility Decision

## Context and Problem Statement

Inconsistent braches and files name sometimes could be confusing to others, it is hard for the team to keep track of where we are and what needs to be fixed. Using the same naming conversion for branches and files will make things a lot clear.

## Considered Options

* Use different naming conventions for branches and files based on their type or purpose. 
* Use a single, consistent naming convention for all branches and files.

## Decision Outcome

- Naming Convention for branches
  - Starts with your name + `-` + page  + `-` + the milestone. Like `name-page-milestone`.
  - For example, `sisy-events-lofi`.

- Namimg Covention for files 
  - Name every file by the sub-page name. 
  - For example, `events.html`, `events.css`, `events.js`.
  - If the sub-page name has multiple words, use `-` to separte them.

- Naming Convention for unit tests
  - inside the `__test__` folder. name every test by the testing subpage followed by `.test.js`.
  - For example, `events.test.js`


