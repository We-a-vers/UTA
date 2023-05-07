# Accessibility Decision

## Context and Problem Statement

We have many website hosting options. Firebase provides hosting and realtime database that could be a good fit for the project. 

## Considered Options

* Availabilities of different domain names
* Various hosting options

## Decision Outcome
- Domain: Since 'ucsduta' is not available, we'll use 'ucsd-uta' followed by the default '.web.app'
- Set up: The firebase project is already set up and connected to the repo. Follow [this](https://firebase.google.com/docs/cli) to download the Firebase CLI in order to use the firebase commands. Everyone should be able to access the Firebase project now.
- Command Line Usage
  - Log in: `firebase login`
  - Start local server: `firebase emulators:start`
  - Deploy: `firebase deploy` (should only be done after every milestone ends)
- Database Usage & Rules
  - Look at [firebase-example.html](./../../source/firebase-example.html) and [firebase-exmaple.js](./../../source/scripts/firebase-example.js) for reference
  - Only the protected file should use the write(set) function
  - Every sub-page’s file can read(get) the data needed for that specific page
