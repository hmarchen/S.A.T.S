# 📜 DEV LOGS

---

## 📅 March 29th, 2025

### Overview of Changes
- created a serializable email ID for it to display on the header
---

## 📅 March 28th, 2025

### Overview of Changes
- Admin panel actually works

### Plans for the Near Future
- Make admin panel connect to the app locally
---

## 📅 March 26th, 2025

### Overview of Changes
- Visual updates for the admin panel
- Proper data collection on the local tablet system works now and can be transferred to an email
- Fixed the visuals for the calendar and time selection pages and now the arrow buttons work

### Plans for the Near Future
- The confirm appointment button does not work
- 
---

## 📅 March 22nd, 2025

### Overview of Changes
- Fixed IP address issues between servers
  - Used 10.0.2.2 as it is a loopback address rather than our own public IP's as that will not work
- Remaster of calendar and time selection pages for better visuals and a dynamic pull for available timeslots

### Plans for the Near Future
- Fixing overlapping buttons in the calendar and time selection pages
- make the textbox in the program selection screen searchable
- only make calendar selectable when it is either today's date or a future date.
---

## 📅 March 21st, 2025

### Overview of Changes
- Working on an admin panel prototype
- Fixes pertaining grabbing data for the reasons and calendar page

---

## 📅 March 19th, 2025

### Overview of Changes
- fixed textbox sizes
- created more internal logs for data
- working on email processing

### Plans for the Near Future
- Allowing the display of the appointment date, time and type onto the end screen
  - According to the logs, it is being recorded properly

---

## 📅 March 18th, 2025

### Overview of Changes
- implemented the data file system code for dealing with appointments
  - Appointment Type
  - Appointment Date
  - Appointment Time

### Plans for the Near Future
- Allowing the display of the appointment date, time and type onto the end screen
  - According to the logs, it is being recorded properly

---

## 📅 March 17th, 2025

### Overview of Changes
- Email Address input fix (no capitalization)
- created the GUI for the calendar feature6
- created the GUI for the appointment time screen
- fixed the breadcrumb to accommodate for two new screens
- rewired routing for the reasons above

### Plans for the Near Future
- Implement functionality to appointment date and time screens.

---

## 📅 March 11th, 2025

### Overview of Changes
- Input Validation Enhancements
  - Implemented regular expressions for robust validation of input data across most fields, ensuring data integrity and improving user experience.
- User Interface Updates
  - Clear Button Removal:  Removed the clear button from input fields, except on the "Other Reasons" page.
  - Future plans include implementing navigational arrows for easier page transitions.
- Form Structure Changes
  - Text Field Removal: Eliminated a text field in the institution section, as its functionality is now relocated to a separate page, streamlining the form layout.
- Splash Page Implementation
  - Introduced a splash page that users will be redirected to upon completing the application.
    - This enhancement resolves the issue of users being able to navigate back and view previous iterations of their data. 
    - The splash page effectively clears existing data and starts a fresh session.
- End Screen Redirection Fix
  - Fixed the "Other Reasons" page to ensure proper redirection to the end screen with the user's custom entry, improving the flow of the application.
- Character Limit Enforcement
  - Updated the "Reasons" page to enforce character limits: a minimum of 200 characters and a maximum of 2000 characters. 
  - All preceding data must be valid before users can navigate to this page.

### Plans for the Near Future
- Implement arrow buttons to navigate the app.

---

## 📅 March 10th, 2025

### Overview of Changes
- **Updated Port Configuration**: Changed the port number from `3000` to `3001` in `fetchProgramService.ts` to avoid conflicts.
- **Auth Service Notice**: **IMPORTANT**: Do not run `authService.ts` as it is currently a work in progress (WIP) and needs further development with Yasir.
- **Validation Implemented**: Added input validation for the **Student Number, Firstname, and Lastname** fields to enhance data integrity.

### Pending Tasks
- **Rami**: Finalize input validation across relevant components.
- **Yasir**: Integrate the functionality of `authService` with the main application to streamline authentication processes.
- **Gleb**: Develop and implement search functionality to improve user experience.
- **Sheizah**: Design and prototype the admin web page for enhanced administrative management.

### Upcoming Plans
- **Input Validation**: Ensure input validation is implemented across all pages:
    - **Hlib**: Responsible for implementing input validation on the Reasons page.

- **Calendar Testing**:
    - Investigate and resolve an **infinite loop** issue occurring upon submission when pushing email information.
    - Address potential **port-related issues** that could lead to information interception during the authentication server's operation.

- **Specific Input Validation Requirements**:
    - **Student Number**
    - **First Name**
    - **Last Name**
    - **Email**
    - **Campus Location**
    - **Program Name**
---

## 📅 March 5th, 2025

### Changes Made
- fixed the visuals for breadcrumb
- Reordered the pages and fixed the issue with multiple input fields in one page

### Plan
- Make data save to the JSON file at the end
- ISSUE: File temporary overwrites variables but does not save it permanently
- ISSUE: page not found after institution page
---


## 📅 March 3rd, 2025

# Known Issues
- submit button in Reasons page *shouldn't be*
- buttons in Reasons page don't work
- input fields are not aliened to themselves
- revert breadcrumbs to how they were
- JSON is not saving to the right user.json file where it saves to a random temp directory that disappears after the program is finished looping

## 📅 March 1st, 2025

### Changes Made
- Implementation of CRUD operations (EXPO FILE SYSTEM)

### Plan
- Make data save to the JSON file at the end
- ISSUE: File temporary overwrites variables but does not save it permanently 
---

## 📅 February 28th, 2025

### Changes Made
- Made the app read a JSON file at the end of the login process using Expo Filesystem

### Plan
- Make the app write and delete (hopefully do full CRUD operations)

---

## 📅 February 22nd, 2025

### Changes Made
- Created a new branch called "ramiyan_general"
- Andrei will make a prototype implementation for MS Graph REST API by the end of the sprint
- Make a keyboard appear automatically when a new screen appears for login
- create an ending screen to tell the student that is the end of the application

### PLAN

- Save data to JSON to display at the end as a list

---

## 📅 February 21st, 2025

### 🏆 READING WEEK SPRINT OBJECTIVE LIST

**Main Objective:** RSVP functionality via email  
**Secondary Objective:** UI rework  

**Roles:**
- **Sheizah:** Front-End & 3D model of a kiosk
- **Yasir:** API testing
- **Hlib:** API research (REST methods)
- **Ramiyan:** General programming
- **Andrei:** Documentation & development logs

**Goal:** Have a **minimum viable product (MVP)** ready by Check #2, ensuring a barebones backend is functional alongside a reworked frontend.

---

## 📅 February 19th, 2025
- ✅ **Merged Ramiyan's Branch** (*Breadcrumb*)
  - Implemented breadcrumb layout as a progress tracker at the bottom of the form.
- ✅ **Merged Hlib's Branch** (*Reasons Dashboard*)
  - Created a prototype menu to display appointment reasons.

---

## 📅 February 11th, 2025
- 🚀 Implemented front-end breadcrumbs.
- 🎨 Revised button layout for better flow & UX.
- 🔧 Fixed tab space inconsistencies.

---

## 📅 February 10th, 2025
- 🔄 **Rebased** the database with GitHub Projects.
- 📝 Wireframe development (**literally on paper**).

---

## 📅 February 5th, 2025
- 📱 Redesigned login system for mobile-friendliness.
- ✨ Fixed formatting errors & style inconsistencies.

---

## 📅 February 2nd, 2025
- 📌 Implemented index page.
- 🔑 Created login page prototype.
- 🎭 Improved 404 page aesthetics.
- 🎨 Separated JavaScript into a dedicated stylesheet.

---

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [create-expo-app](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   
bash
   npm install


2. Start the app

   
bash
    npx expo start


---

## 📅 February 26nd, 2025
- 📌 Implemented the CalendarTest page for the calendar.
- 🔑 Created the functionality to send emails to the advisors.
- 📌 Added the functionality to fetch the programs from the advisors website.
- 🎨 Added the ProgramLists page to display the programs.

---

## Starting the Backend Services

### Starting the Auth Service

To start the `authService`, follow these steps:

1. Navigate to the directory where `authService.ts` is located.
2. Run the following command to start the service:

   ```bash
   npx ts-node authService.ts
   ```

Remember to close the service when you're done. You cannot run both services at the same time. Dont ask me why. IDK - Yasir.

### Starting the Fetch Program Service

To start the `fetchProgramService`, follow these steps:

1. Navigate to the directory where `fetchProgramService.ts` is located.
2. Run the following command to start the service:

   ```bash
   npx ts-node fetchProgramService.ts
   ```
