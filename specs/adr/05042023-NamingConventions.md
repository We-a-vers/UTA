# Naming Conventions

## Context and Problem Statement

Inconsistent branch and file names sometimes could be confusing to others, and it is hard for the team to keep track of where we are and what needs to be fixed. Using the same naming convention for branches and files will make things a lot clearer.

## Considered Options

* Use different naming conventions for branches and files based on their type or purpose. 
* Use a single, consistent naming convention for all branches and files.

## Decision Outcome

- Naming Convention for branches
  - Starts with your name + `-` + assigned website sub-page + `-` + current milestone, like `name-page-milestone`.
  - For example, `sisy-events-lofi`.

- Naming Covention for files
  - Name every file by the sub-page name. 
  - For example, `events.html`, `events.css`, `events.js`.
  - If the sub-page name has multiple words, use `-` to separate them.

- Naming Convention for unit tests
  - Inside the `__test__` folder, name every test file by the sub-page getting tested followed by `.test.js`.
  - For example, `events.test.js`.
