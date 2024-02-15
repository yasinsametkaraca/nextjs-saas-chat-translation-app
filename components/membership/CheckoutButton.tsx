"use client"
import {useSession} from "next-auth/react";
import {useState} from "react";
import {addDoc, collection} from "@firebase/firestore";
import {db} from "@/firebase";

function CheckoutButton() {
    const {data: session} = useSession();  // useSession is used to get the session. It is a client side function.
    const [loading, setLoading] = useState(false);
    const createCheckoutSession = async () => {
        if(!session?.user.id) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, 'customers', session.user.id, 'checkout_sessions'), {  // Add the checkout session to the database. This is used to keep track of the checkout sessions.
            price: 'price_1JGg3vLmJY6t7YX8h4nKJv7x',  // Replace with your price id. Price id is the id of the price you want to charge the user for.
            success_url: window.location.origin,  // Replace with your success url. Success url is the url where the user will be redirected after the payment is successful.
            cancel_url: window.location.origin,  // Replace with your cancel url. Cancel url is the url where the user will be redirected if they cancel the payment.
        });
    }

    return (
        <div className="flex flex-col space-y-2">
            <button onClick={() => createCheckoutSession()} className={`mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default`}>
                Checkout
            </button>
        </div>
    );
}

export default CheckoutButton;