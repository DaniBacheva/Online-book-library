export interface Comment {
    commentText: string;
    username?: string;
    bookId: string | undefined;
    _ownerId?: string;
    _createdOn?: string;
    _id?:string
}

//
  //  "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
    //"bookId": "c2bb6f34-8b3f-4518-b01a-cae68352b2a3",
   // "commentText": "cvcvcv",
  //  "_createdOn": 1711290235999,
  //  "_id": "0a882230-e339-4532-8592-ecbec3fb2683"
