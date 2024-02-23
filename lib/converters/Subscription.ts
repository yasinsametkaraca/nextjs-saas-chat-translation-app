// converters/subscriptions.ts is a TypeScript file that contains the subscriptionConverter object. This object is used to convert the subscription object to a format that can be saved to the database and to convert the data from the database to the subscription object. The subscriptionConverter object contains the following fields:
import { db } from "@/firebase";
import { Subscription } from "@/types/Subscription";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, collection } from "firebase/firestore";

const subscriptionConverter: FirestoreDataConverter<Subscription> = {
    toFirestore: function (subscription: Subscription): DocumentData {  // toFirestore is used to convert the subscription object to a format that can be saved to the database. Push the subscription object to the database.
        return {
            ...subscription,
        };
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Subscription {  // fromFirestore is used to convert the data from the database to the subscription object. parse the data from the database and return the subscription object. Pull the subscription object from the database.
        const data = snapshot.data(options); // Get the data from the snapshot. The data is the subscription object.
        const sub: Subscription = {
            id: snapshot.id,
            cancel_at_period_end: data.cancel_at_period_end,
            created: data.created,
            current_period_end: data.current_period_end,
            current_period_start: data.current_period_start,
            ended_at: data.ended_at,
            items: data.items,
            latest_invoice: data.latest_invoice,
            metadata: data.metadata,
            payment_method: data.payment_method,
            price: data.price,
            prices: data.prices,
            product: data.product,
            quantity: data.quantity,
            role: data.role,
            status: data.status,
            stripeLink: data.stripeLink,
            cancel_at: data.cancel_at,
            canceled_at: data.canceled_at,
            trial_end: data.trial_end,
            trial_start: data.trial_start,
        };
        return sub;
    }
}

export const subscriptionRef = (userId: string) => collection(db, 'customers', userId, 'subscriptions').withConverter(
        subscriptionConverter
    );  // subscriptionRef is used to get the reference to the subscriptions collection in the database. It is used to get the subscription documents from the database. It is a client side function. It takes the userId as a parameter and returns the reference to the subscriptions collection in the database.


// collection(db, 'customers', userId, 'subscriptions') mean /customers/{userId}/subscriptions in firestore database.