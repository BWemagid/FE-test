# BankTransfer

Angular version 11.2.8.

## Development server

Run npm i --save to install packages

Run npm i json-server --global (if you want to run globally).

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run json:server`. Navigate to `http://localhost:3000`. This runs the local database that host my json.

## Build

Run ng build to build the project. The build artifacts will be stored in the dist/ directory. Use the --prod flag for a production build.

## Project Explanation

I created 2 components and called them in the app.component:
    Transfer component ( Handles the Form)
    Transactions component ( Handles the user's transaction list)

Modules used:
    Reactive forms
    Modal (MatDialog)

Pipes:
    filter ( for search results)

Services:
    handles client/server errors
    Used Subject to refresh the user's transaction list from json.

Models (To post data to http):
    accounts.ts (data for tranfer component)
    data.ts (data for transaction list component)
