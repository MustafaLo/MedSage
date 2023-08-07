<p align="center">
  <img src="https://github.com/MustafaLo/MedSage/assets/57977880/0490d4fc-10cb-46e1-8a6d-87e2ba34b356"/>
</p>
<p align="center">
  <img src="https://api.netlify.com/api/v1/badges/fb37c3dd-78d5-4385-b1c4-a111b8dd8e14/deploy-status"/>
</p>


💊 Navigate through your Medication Schedules with Confidence!


# What is MedSage?

MedSage is a platform that empowers users to build and monitor their medication schedules with ease. Create and customize your medication components and watch them synchronize into a beautiful and dynamic schedule.

## Features

- Medication Component Builder
<p align="center">
  <img src="https://github.com/MustafaLo/MedSage/assets/57977880/33c8ba96-e68d-4468-90a1-8d637775a18b" width="85%"></img>
</p>


- Dynamic Weekly Medication Schedule
<p align="center">
  <img src="https://github.com/MustafaLo/MedSage/assets/57977880/5d62d985-9bd9-4f4a-853c-4f65a43b34f9" width="85%"></img>
</p>


- Minimalistic Design
- Detailed Medication Notes
- Schedule Checklist
- Text Message Reminders
- And More? 👀

## Motivation
For all of my life, my grandparents have been on constant, strict medication schedules. In my family, I am the designated "medication guru" for them, keeping track of daily dosage requirements, refilling medication containers, and remembering complicated medication names (Talimogene Laherparepvec ???). Manually writing all of this information down was tiresome and other medication manager apps that I used weren't very intuitive. Thus MedSage was born 🌟.

## Setup and Installation
You can create an account and start using MedSage [here](https://medsage.netlify.app/), or you can install it locally. To do so run
```bash
  git clone https://github.com/MustafaLo/MedSage.git MedSage
  cd MedSage
  npm install
  npm start
```
### Enviornment Variables
MedSage is integrated with Firebase and Firestore to complete an authentication flow and store user-specific medication information. As such, you will need to create an account on Firebase and add your apps configuration. Instruction on this can be found [here] (https://firebase.google.com/docs/web/setup).

After this, create an env file and add your configuration to it
```bash
  touch .env
```
Make sure your keys are written in proper React format like this
```bash
REACT_APP_apiKey=""
REACT_APP_authDomain=""
REACT_APP_projectId=""
etc...
```
## Tech Stack 💻
MedSage was created using React, Material UI, Firebase, and FullCalendar.
















