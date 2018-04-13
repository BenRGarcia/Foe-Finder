# Foe-Finder

> Complete the survey to discover the identity of your Arch Enemy!

* See the live web app [here]();

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
const apiRouter = express.Router();

// Path: '/api/friends'
apiRouter.route('/')
  .get((req, res, next) => res.json(foes))
  .post(validateInput, (req, res, next) => {
    let newUser = req.body;
    // Simulate database roundtrip
    getArchEnemy(newUser)
      .then(archEnemy => {
        // Add new user to "Database"
        foes.push(newUser);
        // Send response object
        res.send(archEnemy)
      });
  });

// Client-Side Error handling
apiRouter.use((err, req, res, next) => {
  let status = err.status || 500;
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

Helper functions in ```app/routing/utils.js```

```js
// Iterates over a Map object, returns the key of the lowest tuple value
const minValueTupleKey = (mapObj) => {
  let minValueTuple = [null, Infinity];
  for (let [key, value] of mapObj) {
    if (value < minValueTuple[1]) {
      minValueTuple = [key, value];
    }
  }
  return minValueTuple[0];
}
```