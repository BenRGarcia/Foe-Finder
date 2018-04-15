# Foe-Finder

> Complete the survey to discover the identity of your Arch Enemy!

* See the live web app on Heroku [here](https://sleepy-crag-44280.herokuapp.com/);

## Description

A Node.js app that receives GET and POST requests from clients. Live site deployed on Heroku.

### POST method in action

![survey](https://user-images.githubusercontent.com/26657982/38761825-f96ea4bc-3f53-11e8-8b30-ecbdc1903b35.gif)

### Server Side Logic

* Node.js
* Express.js

### Code Snippets

Middleware and Routing in ```server.js```

```js
// Middleware for request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Modularization of route paths - html vs api
const apiRouter = require('./app/routing/apiRoutes.js');
app.use('/api/friends', apiRouter);
const htmlRouter = require('./app/routing/htmlRoutes.js');
app.use('/', htmlRouter);
```

API router with error handling in ```/app/routing/apiRoutes.js```

```js
// Create router
const apiRouter = express.Router();

// Path: '/api/friends'
apiRouter.route('/')
  .get((req, res, next) => res.json(foes))
  .post(validateInput, getArchEnemy, (req, res, next) => {
    // Add new user to 'foes' array
    foes.push(req.newUser);
    // Send response object
    res.send(req.archEnemy)
  });

// Client-Side Error handling
apiRouter.use((err, req, res, next) => {
  let status = err.status || 500;
  if (status >= 500) err.message = 'Internal Server Error';
  res.status(status).send({ error: err.message});
});
```

Serving html in ```/app/routing/htmlRoutes.js```

```js
const htmlRouter = express.Router();
htmlRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
htmlRouter.get("/survey", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});
htmlRouter.get("*", (req, res, next) => {
  res.status(301).redirect('/');
});
```

Helper function in ```app/routing/utils.js```

```js
// Returns true/false if elements of array are exact props of an object
const allPropsPresent = (obj, reqPropsArray) => {
  // Create an array of object properties
  const objProps = Object.keys(obj);
  // Ensure exact number of props required actually exist
  if (objProps.length !== reqPropsArray.length) return false;
  // Ensure each prop is present in the object
  if (!objProps.every(prop => reqPropsArray.indexOf(prop) !== -1)) return false;
  // Ensure each property's value is not null or undefined
  if (!objProps.every(prop => obj[prop] !== null || undefined)) return false;
  // Return 'true', object properties match exactly with passed in array
  return true;
}
```