## How to run the project
###### Step 1: Clone/download the project from github repository: https://github.com/mmilardic/nodejs-rimac-intern-task
###### Step 2: Open terminal in the project root folder. To install the dependencies run the next command: 
```bash
npm install
```
###### Step 3: To start the project, run the next command: 
```bash
npm start
```
###### Step 4: If the project started successfully, you will see the next message in the terminal/console:
**🚀      GraphQL is now running on http://localhost:3000/graphql **
###### Step 5: Access the playground at http://localhost:3000/graphql 
In case where the port is unavailable, find an available one, and set the value at server.ts line 16.
###### Step 6 Test the functionalities:

###### 1. Search user - be aware that some users don't have an email available over the API. In that case, an appropriate message will be returned. githubUsername presents a placeholder.

```graphql
query {
  user(username: "githubUsername"){
    username
    email
    searchedForCounter
    followers
    following
  }
}
```

###### 2. Search most searched users - limit is optional parameter

```graphql
query {
  mostSearched(limit: 10) {
    username
    email
    searchedForCounter
    followers
    following
  }
}
```

###### 3. Set searchedForCounter values to 0

```graphql
mutation {
  mostPopular
}
```

## Architecture considerations
- Model: contains the User class which is used as a return value where needed
- Resolver: resolver.ts contains functions that do the work. resolverMap.ts maps functionalities to graphQL endpoints, and is used for creating graphql executable schema.
- Schema: contains the .graphql schema
- schema.ts creates the graphql executable schema
- server.ts creates needed instances and runs the project

## Priorities
- Working functionalities
- Decoupled and cohesive architecture
- Using Typescript and best available library/dependency options

## Additional information
- Email has to be accessed at https://api.github.com/users/{username}/events/public since the basic https://api.github.com/users/{username} endpoint does not contain a value for email. 
- When user is not found for the given username, null will be displayed for each field.
- When mostSearched is called and returns empty array, it means that no user has been searched/found previously.
- mostPopular mutation always returns true
- For any other questions - please contact me at mxm8813@g.rit.edu
