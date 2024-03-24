export interface Comment {
    commentText: string;
    name?: string;
    username?: string;
    bookId: string | undefined;
    _ownerId?: string;
    _createdOn?: number;
    _id?:string
}