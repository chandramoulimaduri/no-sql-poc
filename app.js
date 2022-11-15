const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const profileRoutes = require('./routes/profiles');
const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const events = require('events');

const swaggerDoc = require('./swagger.json');
const db = require("./models");
let emitter = new events.EventEmitter()

const app = express();
const logger = require('./utils/logger').getLogger('app');
const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: "http://localhost:8081"
};

const onStartUp = () => {
  return (err) => {
      if (err) {
          logger.error(`Error starting server: ${err}`);
          process.exit(1);
      }

      logger.info(`Server listing on port ${PORT}`);
      emitter.emit("appStarted");
  };
}

app.use(cors(corsOptions));
app.use(helmet());
    app.use(morgan('dev'));
    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
    app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info("Connected to the database!");
  })
  .catch(err => {
    logger.error("Cannot connect to the database!", err);
    process.exit();
  });

// routes
app.use('/health', healthRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use(`/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// set port, listen for requests
app.listen(PORT, onStartUp());

module.exports = {app, emitter};