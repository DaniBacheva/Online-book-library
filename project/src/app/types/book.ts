import { User } from "./user";

export interface Book {
    title: string,
    author: string,
    genre: string,
    pages: number,
    imageUrl: string,
    moreInfo:string,
    _id: string,
    posts: [],
    subscribers:[],
    creator:User

}