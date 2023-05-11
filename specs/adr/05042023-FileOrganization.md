# File Organization

## Context and Problem Statement

We discussed where to put all the coding files in the GitHub repo to make it organized.

## Considered Options

* Number of HTML/CSS/JavaScript files
* Location of HTML/CSS/JavaScript files
* Number of folders

## Decision Outcome

We will have 1 HTML, CSS, and JavaScript file per sub-page, and they will all locate in each sub-page's own folder under /source, except for index.html (the html file for home), which will locate in the root of the repo so that Netlify works.

Folder layout under /source:
* One folder for main page
  * home
* One folder for each subpage
  * about-us
  * archive
  * board-member
  * events
  * intern-program
  * log-in
  * sponsors
* Other folders
  * navbar - for the navigation bar at the top of every page
  * assets - for images or other assets to be used for the website
