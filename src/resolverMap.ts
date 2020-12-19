import { IResolvers } from 'graphql-tools';
import { User } from './model/User';

const resolverMap: IResolvers = {
    Query: {
        user(_: void, args: { username: string }) : User {
            return getUser(args.username);
        },
        mostSearched(_: void, args: { limit: number}): User[]{
            return getMostSearched(args.limit);
        }
    },
    Mutation: {
        mostPopular(_: void){
            resetSearchedCounters();
            return true
        }
    }
};

export default resolverMap

const github_data = {
    "token": "9d168dac00ff2445b81f2241882c47b007f00637",
    "username": "mmilardic"
  }

let searchedUsers: User[] = []
  
const axios = require('axios');

  function resetSearchedCounters(){
      searchedUsers.forEach(user => {
          user.searchedForCounter = 0
      })
  }

  function getMostSearched(limit: Number): User[]{
      if(limit !== undefined) {
      }
      return searchedUsers
  }

    
  function getUser(username: string) {
    const res = axios.get(`https://api.github.com/users/${username}`)
    return res.then(async response => {
        let data = response.data;
        let email: string = await getUserEmail(username)
        //email je unique identifier i zbog toga koristimo njega za provjeru
        let searchedUser = searchedUsers.find(userElement => userElement.email == email)
        let user: User;
        if(searchedUser !== undefined){
            user = searchedUser;
            searchedUser.searchedForCounter++;
            // console.log("COUNTER: " +  searchedUser.email + "  " + searchedUser.searchedForCounter);
        } else {
            console.log("emailje: " + email)
            user = new User(data.login, email, data.followers, data.following);
            user.searchedForCounter++;
            searchedUsers.push(user);
            console.log("searched users" + searchedUsers);
        }
        return user;
      })
      .catch(error => {
        console.log(error);
      });
  }

     const token = "0d6aab1f41b01b936a42060a7eae65a0e3158164"

    const requestHeaders = {
        headers: {
            'User-Agent': 'mmilardic',
        }
    }

  // access token zbog api rate limita
  function getUserEmail(username: string): string {
      const res = axios.get(`https://api.github.com/users/${username}/events/public?token=${token}`, requestHeaders)
      return res.then(response => {
          console.log("RESPONSE: ZA EMAIL")
          return response.data[0].payload.commits[0].author.email
            // response.data.forEach(dataElement => {
            //     if (dataElement.payload.commits !== undefined) {
            //         dataElement.payload.commits.forEach(commitsElement => {
            //                 console.log("AUTHOR EMAIL:" + commitsElement.author.email)
            //                 return commitsElement.author.email;
            //         });
            //     } else {
            //         return "email not found"
            //     }
            // });
      })
      .catch(error => {
        console.log(error);
      });
  }
  