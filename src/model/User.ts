export class User {
    username: string
    email: string
    searchedForCounter: number
    followers: number
    following: number

    constructor(username: string, email: string, followers: number, following: number) {
        this.username = username;
        this.email = email;
        this.searchedForCounter = 0;
        this.followers = followers;
        this.following = following;
    }
}