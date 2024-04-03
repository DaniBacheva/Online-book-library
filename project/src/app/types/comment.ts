export interface Comment {
    commentText: string;
    username?: string;
    bookId: string | undefined;
    _ownerId?: string;
    _createdOn?: string;
    _id?:string
}

