// SubscriptionProvider is a component that will be used to manage the subscription of the user. It will be used to check if the user is subscribed or not. If the user is not subscribed, it will show a message to subscribe. If the user is subscribed, it will show the content.
'use client'
import {useSession} from "next-auth/react";
import {useEffect} from "react";

function SubscriptionProvider() {
    const {data: session} = useSession();  // useSession is used to get the session. It is a client side function.

    useEffect(() => {

    }, [session]);
    return (
        <div></div>
    );
}

export default SubscriptionProvider;