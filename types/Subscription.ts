// types/Subscription.ts is a TypeScript file that contains the Subscription interface. This interface is used to define the structure of the subscription object in the database. The subscription object is used to store the details of the subscription. The subscription object contains the following fields:

import { DocumentData, DocumentReference, Timestamp } from "@firebase/firestore";
import Stripe from "stripe";

export interface Subscription {
    id?: string;
    metadata: {  // Set of key-value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format.
        [name: string]: string;
    };
    stripeLink: string;
    role: string | null;
    quantity: number;
    items: Stripe.SubscriptionItem[];
    product: DocumentReference<DocumentData>; // Reference to the product document in the database. This is used to get the product details.
    price: DocumentReference<DocumentData>; // Firestore reference to the price. This is used to get the price details.
    prices: Array<DocumentReference<DocumentData>> // Array of price references. If you provide multiple recurring prices to the checkout session iva the 'line_items' parameter, this array will hold the references for all recurring prices for the subscription. 'price === prices[0]' in most cases.
    payment_method?: string;
    latest_invoice?: string;
    status:  // the status of the subscription. Possible values are 'active', 'trialing', 'past_due', 'unpaid', 'canceled', or 'incomplete'.
        | 'active'
        | 'trialing'
        | 'past_due'
        | 'unpaid'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired';
    cancel_at_period_end: boolean; // If true, the subscription will not be renewed at the end of the current period. If true subscription has been canceled by the user. and will be deleted at the end of the billing period.
    created: Timestamp; // Timestamp when the subscription was created.
    current_period_start: Timestamp; // Timestamp when the current period started. Start of the current period for which the subscription is billed.
    current_period_end: Timestamp; // Timestamp when the current period ends. End of the current period for which the subscription is billed. At the end of this period, a new invoice will be created.
    ended_at: Timestamp | null; // Timestamp when the subscription ended. If the subscription has ended, the date the subscription ended.
    cancel_at: Timestamp | null; // Timestamp when the subscription will be canceled. If the subscription has been canceled with the 'cancel_at_period_end' flag, the date of that action.
    canceled_at: Timestamp | null; // If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with the 'cancel_at_period_end' flag, canceled_at will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
    trial_start: Timestamp | null; // If the subscription has a trial, the beginning of that trial.
    trial_end: Timestamp | null; // Timestamp when the trial ended. If the subscription has a trial, the end of that trial.
}