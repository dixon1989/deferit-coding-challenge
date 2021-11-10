# Deferit-coding-challenge

# README

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

- Deferit Coding Challenge to determine my knowledge of React Native possibly for next stage of interview
- Version 1.0

### How do I get set up?

- Project are set up via Expo manage workflow. You will need to install Expo App to your mobile device and scan the QR to have the project running.
- Be sure you have node.js and Expo-CLI installed.
- Make sure you are at the correct directory named ./deferit-coding-challenge or root folder.
- You will need to run "npm install" or "yarn" on your terminal depending on your preference.
- To view the history progress of my commits, run "git log" on your terminal.
- Run "expo start" to view the web application on my work.
- Dummy data has been added for your reference. You can also access my dummy data here:
- https://my-json-server.typicode.com/LifepayDickson/mockjsondata/posts

### Contribution guidelines

- Developing, Commiting code
- Code review
- Documentation
- Code are deployed and develop personally by Dickson Lim

### Stacks Used

- Expo
- React Native Typescript
- React Hooks
- React-Native-Elements (UI Styling)
- Moment (Date formatting)
- Axios (Web Service)

### Time Spent to Complete this project

- Identify requirements and setup mock api data. (1 hour)
- Initialize Expo Project, add required dependencies, testing api connection. (2 hour)
- Implementing data and infinite scroll (4 hour)
- Design decision (3 hour)
- Code Clean up (1 hour)

### Who do I talk to?

- Repo owner or admin - Dickson Lim
- Kindly email to dixon.lim89@gmail.com for any inquiry.

# Coding Test Overview

## React Native Recruitment Exercise

### Brief: Bills list view

### User Story: As a user, I want to see a list of my deferit bills in one place. This includes:

- A thumbnail of the bill image I uploaded so I know what bill it is. If I click on this thumbnail, I want to see the full image so that I can check it out properly.
- the amount of my bill
- the date of my bill
- the status of my bill (processing, scheduled, unable to pay, paid)
- an additional information pop-up next to fields I may not immediately understand (e.g. status) to give me some more information about this field (e.g:
- Processing: This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day.
- Scheduled: This bill is scheduled to be paid and will be paid on the due date, you're in good hands!, etc.)
- Load only 10 (or some pre-defined number) bills at the time
- An infinite scroll to load next batch of bills if there are any
- We expect to have a reactive (clickable) solution with some dummy data (use some of the mock servers available online: e.g. http://jsonplaceholder.typicode.com/).

- Ideally, we would like to assess technical and styling/designing skills at the same time. Whilst there are no specific styling/design requirements, we would like to see what ideas/design decisions can be made for this task.

- Additionally, we would like to know how long it took to complete the solution.
