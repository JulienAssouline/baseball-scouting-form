# Scouting Report Form Application

## Setup the Backend

`cd into server` then run `yarn`

I'm using postgresql so make sure you have that installed on your computer.

Check default.json in config for postgres settings.

To start the graphql apollo server run `NODE_ENV=development yarn start:dev`

Then you can run in your terminal `yarn db:up` to initialize your db.

You can find example queries and mutations in the `test_queries_and_mutations` file.

To restart your database run `yarn db:reset`.

## Setup Front End

`cd into client` then run `yarn`

Run `yarn start` and it should work. 

It order for the app to work make sure you have both the backend and frontend running.

