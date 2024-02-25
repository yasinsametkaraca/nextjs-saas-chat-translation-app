import { db } from "@/firebase";
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    collection,
    doc,
    query,
    where, collectionGroup,
} from "firebase/firestore";

export interface ChatMembers {
    userId: string;
    email: string;
    timestamp: Date | null;
    isAdmin: boolean;
    chatId: string;
    image: string;
}

const chatMembersConverter: FirestoreDataConverter<ChatMembers> = {
    toFirestore: function (member: ChatMembers): DocumentData {  // push data to the database
        return {
            userId: member.userId,
            email: member.email,
            timestamp: member.timestamp,
            isAdmin: member.isAdmin,
            chatId: member.chatId,
            image: member.image,
        };
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ChatMembers {  // pull data from the database
        const data = snapshot.data(options);
        return {
            userId: snapshot.id,
            email: data.email,
            timestamp: data.timestamp,
            isAdmin: data.isAdmin,
            chatId: data.chatId,
            image: data.image,
        };
    }
}

export const addChatRef = (chatId: string, userId: string) => doc(db, 'chats', chatId, 'members', userId).withConverter(
        chatMembersConverter
    ); // reference to the chat members collection. This is used to add a new member to the chat.
// chats/{chatId}/members/{userId}

export const listChatMembersRef = (chatId: string) => collection(db, 'chats', chatId, 'members').withConverter(
        chatMembersConverter
    ); // reference to the chat members collection. This is used to get the list of chat members.
// chats/{chatId}/members get all the members of the one chat

// doc and collection difference is that doc is used to get a specific document from the collection, while collection is used to get all the documents from the collection.

export const chatMemberAdminRef = (chatId: string) =>
    query(
        collection(db, 'chats', chatId, 'members'),
        where('isAdmin', '==', true)
    ).withConverter(chatMembersConverter)
// reference to the chat members collection. This is used to get the list of chat members who are admins.

export const chatMembersCollectionGroupRef = (userId: string) =>
    query(
        collectionGroup(db, 'members'),
        where('userId', "==", userId)
    ).withConverter(chatMembersConverter)
// get all the members of the chat where the user is a member
