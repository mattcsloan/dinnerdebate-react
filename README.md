# DinnerDebate
A simple recipe application - built on MERN stack
* MongoDB
* ExpressJS
* React
* NodeJS

## Server

### Setup
```npm install```

### DB and Authentication
You will need to set up your `.env` file based on the `.env.sample` provided in order to hook up to a database, as well as being able to authenticate. This application uses Auth0 for handling authentication. Copy the contents from the sample file to your new `.env` file, add the proper values, then run:
```source .env```

### Compile, Minify, and Run app
```npm start```

### Port
```3001```

## Client
To run the React UI, you'll want to first go into the `client` directory with:
```cd src/client```

Note that there is a similar `.env` file needed in the `src/client` directory for Auth0 authentication as well as the one at the root of the project used for backend environment variables. See the `src/client/.env.sample` file.

Then, install packages via:
```yarn```

Then run ```yarn start``` and your app will start on port 3000.

The UI was bootstrapped using Create React App. See their documentation for more details and troubleshooting.