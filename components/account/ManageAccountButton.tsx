"use client";
import React from 'react';
import {generatePortalLink} from "@/actions/generatePortalLink"; // generatePortalLink is used to generate a portal link for the user to access the portal. Portal is used to manage the billing of the user.

function ManageAccountButton() {
    return (
        <form action={generatePortalLink}>
            <button type="submit">Manage Billing</button>
        </form>
    );
}

export default ManageAccountButton;