Step 1: Clone the project from github repository: https://github.com/mmilardic/nodejs-rimac-intern-task
Step 2: Open terminal in the project folder, to install the dependencies run the next command: npm install
Step 3: To start the project, run the next command: npm start
Step 4: If the project started successfully, you will see the next message in the terminal/console:
# 🚀      GraphQL is now running on http://localhost:3000/graphql
Step 5: Access the playground at http://localhost:3000/graphql 
In case where the port is unavailable, find an available one, and set the value at server.ts line 17.
Step 6 Test the functionalities:

# 1. Search user
query {
  user(username: "githubUsername"){
    username
    email
    searchedForCounter
    followers
    following
  }
}

# 2. Search most searched users - limit is optional

query {
  mostSearched(limit: 10) {
    username
    email
    searchedForCounter
    followers
    following
  }
}

# 3. Delete searched for counter

mutation {
  mostPopular
}