## Readme
Coding Sample

## Introduction
Simple exercise res api with backend mongo and docker


## Installation

It is recommended to use [Node.js](https://nodejs.org/) v16

To install the dependencies and run the service perform the following from a command line.
Note: Environment variables must be set,before starting the service. 

```
cd no-sql-poc
npm i
node start
```

To execute all tests run the following from a command line.

```
npm run test
```

To execute only unit tests run the following from a command line.

```
npm run test-unit
```

## Local Environment Variables
The service can run locally and point to any of the configurable IBM Cloud or Azure services, but to run in a stand-alone local mode you must install [CouchDB](https://couchdb.apache.org/) locally.  The following environment variables for a stand-alone local configuration

| Environment Variable    | Value                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| TOKEN_KEY             | Any string for sign & verify JWT token |
| MONGO_URL      | mongo url to connec to DB                                                                                    |

sample data for local mongo environment
```
TOKEN_KEY="SECRET USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING"
MONGO_URL=mongodb://localhost:27017/sample or mongodb://mongo:27017/sample (for docker compose)
```

# (OR) Installation using Docker

```
docker-compose up -d --build
```
# Validate API Use postman or swagger

## Postman

A Postman collection are provided in the `/postman` folder which demonstrates all the functionality of this service, 

1. Register a user to login.
2. Login as register user
3. Add new group, person and color to the database (If a person’s name already exists, replace the input color as the color for that person)
4. Retrieve all people for a particular color.
5. Retrieve all people with no color is selected
To use the collection and environment you must first import them into Postman.  More information on postman can be found [here](https://www.postman.com/) and [here](https://learning.postman.com/docs/getting-started/introduction/).


## Swagger

Swagger doc available at : `http://localhost:8080/api-docs/`