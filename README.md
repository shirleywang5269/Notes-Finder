# Notes software

Reaches out to UMLS and displays a dashboard that allows the user to search for various words. This repo contains the entire blueprint for how to adapt this project according to your UMLS needs

Node version: 8.12

- `frontend/` creates the react frontend application. `cd` into the folder and run `yarn start` in order to launch the frontend. Modification: In the `Notes.tsx` file, there is a function called searchClicked(). Feel free to modify that with a fetch() request to the localhost backend server. That should return a list of new words
- `backend/` includes all the backend javascript code. All the porting of the pythong code has been complete. Modification: adjust the search route to get
