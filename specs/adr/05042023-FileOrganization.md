# Accessibility Decision

## Context and Problem Statement

We discussed about where to put all the files in the github repo to make it organized.

## Considered Options

* Number of CSS files

## Decision Outcome

We will create only one CSS file (home.css) that suits most HTML files, let all HTML files import that CSS file and only add additional CSS files if needed. 

The files layout:
* One folder for main page
  * Home
* One folder for each subpage
  * Navbar
  * about-us
  * archive
  * assets
  * board-member
  * events
  * home
  * intern-program
  * log-in
  * sponsors
