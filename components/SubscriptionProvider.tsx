// SubscriptionProvider is a component that will be used to manage the subscription of the user. It will be used to check if the user is subscribed or not. If the user is not subscribed, it will show a message to subscribe. If the user is subscribed, it will show the content.
'use client'
import {useSession} from "next-auth/react";
import React, {useEffect} from "react";
import {onSnapshot} from "@firebase/firestore";
import {subscriptionRef} from "@/lib/converters/Subscription";
import {useSubscriptionStore} from "@/store/store";

function SubscriptionProvider({children}: {children: React.ReactNode}) {
    const {data: session} = useSession();  // useSession is used to get the session. It is a client side function.
    const setSubscription = useSubscriptionStore(state =>
        state.setSubscription
    );

    useEffect(() => {
        if (!session) return;
        return onSnapshot(subscriptionRef(session?.user.id!), (snapshot) => {  // onSnapshot is used to listen for changes to the database. It is a client side function.
            if (snapshot.empty) {
                console.log('User is not subscribed');
                setSubscription(null);
                return;
            } else {
                console.log('User is subscribed');
                setSubscription(snapshot.docs[0].data()); // Set the subscription of the user. The subscription is the first document in the snapshot.
            }
        }, (error) => {
                console.error(error);
        });
    }, [session, setSubscription]);
    return (
        <>{children}</>
    );
}
//onSnapshot function is used to listen for changes to the database. It is a client side function. It takes the reference to the subscriptions collection in the database and a callback function as parameters. The callback function is called whenever there is a change to the database. It is used to check if the user is subscribed or not. If the user is not subscribed, it will show a message to subscribe. If the user is subscribed, it will show the content.
export default SubscriptionProvider;