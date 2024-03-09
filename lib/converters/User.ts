import {
    DocumentData,
    FirestoreDataConverter,
    query,
    QueryDocumentSnapshot,
    SnapshotOptions,
    where,
    collection
} from "firebase/firestore";
import {User} from "next-auth";
import {db} from "@/firebase";

// converters/users.ts is a TypeScript file that contains the userConverter object. This object is used to convert the user object to a format that can be saved to the database and to convert the data from the database to the user object. The userConverter object contains the following fields:
const userConverter: FirestoreDataConverter<User> = {
    toFirestore: function (customer: User): DocumentData {
        return {
            email: customer.email,
            name: customer.name,
            image: customer.image,
        };
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            email: data.email,
            name: data.name,
            image: data.image,
        };
    }
};

export const getUserByEmailRef = (email: string) =>
    query(collection(db, 'users'), where('email', '==', email)).withConverter(
        userConverter
    );
