import { User } from '../model/User';

let searchedUsers: User[] = []

const axios = require('axios');

const requestHeaders = {
    headers: {
        'User-Agent': 'mmilardic',
    }
}

export function getUser(username: string) {
    const res = axios.get(`https://api.github.com/users/${username}`)
    return res.then(async response => {
        let data = response.data;
        let email: string = await getUserEmail(username)
        //username je unique identifier na githubu i zbog toga koristimo njega za provjeru
        let searchedUser = searchedUsers.find(userElement => userElement.username == username)
        let user: User;
        if (searchedUser !== undefined) {
            user = searchedUser;
            searchedUser.searchedForCounter++;
        } else {
            user = new User(data.login, email, data.followers, data.following);
            user.searchedForCounter++;
            searchedUsers.push(user);
        }
        return user;
    })
        .catch(error => {
            console.log(error);
        });

}

function getUserEmail(username: string) {
    const res = axios.get(`https://api.github.com/users/${username}/events/public`, requestHeaders)
    return res.then(response => {
        let email = "default value"
        let emailFound = false;
        response.data.forEach(dataElement => {
            if (emailFound) {
                return
            }
            if (dataElement.payload.commits !== undefined) {
                dataElement.payload.commits.forEach(commitsElement => {
                    if (emailFound) {
                        return
                    }
                    email = commitsElement.author.email;
                    emailFound = true
                });
            } else {
                email = "Email for this user is not found."
            }
        });
        return email;
    })
        .catch(error => {
            console.log(error);
        });
}

export function getMostSearched(limit: number): User[] {
    let listSize = searchedUsers.length;
    let returnList;

    if (limit !== undefined) {
        returnList = searchedUsers.sort((x, y) => (x.searchedForCounter > y.searchedForCounter) ? -1 : 1)
        listSize = limit;
    } else {
        returnList = searchedUsers.sort((x, y) => (x.followers > y.followers) ? -1 : 1)
    }
    return returnList.slice(0, listSize)
}

export function resetSearchedCounters() {
    searchedUsers.forEach(user => {
        user.searchedForCounter = 0
    })
}

