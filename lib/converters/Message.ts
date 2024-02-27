import { db } from "@/firebase";
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    collection,
    limit,
    query,
    orderBy,
} from "firebase/firestore";
import {LanguageSupported} from "@/store/store";

export interface User {
    id: string;
    email: string;
    name: string;
    image: string;
}

export interface Message {
    id?: string;
    input: string;
    timestamp: Date;
    user: User;
    translated?: {
        [K in LanguageSupported]?: string;  // translated message in different languages. It is used to store the translated message in different languages. It is extension.
    };
}

const messageConverter: FirestoreDataConverter<Message> = {
    toFirestore: function (message: Message): DocumentData {  // push data to the database
        return {
            input: message.input,
            timestamp: message.timestamp,
            user: message.user,
        };
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Message {  // pull data from the database
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            input: data.input,
            timestamp: data.timestamp?.toDate(),
            user: data.user,
            translated: data.translated,
        };
    }
}

export const messagesRef = (chatId: string) =>
    collection(db, 'chats', chatId, 'messages').withConverter(messageConverter); // reference to the message collection. This is used to get the list of messages of the chat.

export const limitedMessagesRef = (chatId: string) =>
    query(messagesRef(chatId), limit(25)); // reference to the message collection. This is used to get the list of messages of the chat. It is used to limit the number of messages to 25.

export const sortedMessagesRef = (chatId: string) =>
    query(messagesRef(chatId), orderBy('timestamp', 'asc')); // reference to the message collection. This is used to get the list of messages of the chat. It is used to sort the messages in ascending order of timestamp.

export const limitedSortedMessagesRef = (chatId: string) => // last message of the chat. to show in the chat list.
    query(query(messagesRef(chatId), limit(1)), orderBy('timestamp', 'desc')); // reference to the message collection. This is used to get the list of messages of the chat. It is used to limit the number of messages to 1 and sort the messages in descending order of timestamp.
