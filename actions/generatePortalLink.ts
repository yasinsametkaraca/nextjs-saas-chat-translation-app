// This is a server side function. It is used to generate a portal link for the user to access the portal. Portal is used to manage the billing of the user.
"use server"

import { authOptions } from "@/auth";
import { adminDb } from "@/firebase-admin";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
});

export async function generatePortalLink() {
    const session = await getServerSession(authOptions);
    const host = headers().get("host"); // Get the host from the headers. The host is the domain name of the website.

    if (!session?.user.id) {
        return console.log("User not found");
    }

    const {user: {id}} = session;  // Get the user id from the session.

    // Replace with your return url. Return url is the url where the user will be redirected after they are done with the portal.
    const returnUrl =  process.env.NODE_ENV === "development"
        ? `http://${host}/membership`
        : `https://${host}/membership`;

    const doc = await adminDb.collection("customers").doc(id).get();  // Get the customer from the database.
    if (!doc.data) {
        return console.log("Customer not found with id: ", id);
    }

    const stripeId = doc.data()!.stripeId;  // Get the stripe id from the customer.
    const stripeSession = await stripe.billingPortal.sessions.create({  // Create a billing portal session. Billing portal session is used to create a portal link for the user to access the portal. Portal is used to manage the billing of the user.
        customer: stripeId,
        return_url: returnUrl,
    });

    redirect(stripeSession.url);  // Redirect the user to the portal link.
}



