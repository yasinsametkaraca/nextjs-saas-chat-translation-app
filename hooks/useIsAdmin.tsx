//useIsAdmin.tsx is a custom hook that returns the admin id of a chat. It is used to get the admin id of a chat. Chat has one admin.
"use client"

import { chatMemberAdminRef } from "@/lib/converters/ChatMembers";
import { getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";

function UseIsAdmin({chatId}: {chatId: string}) {
    const [adminId, setAdminId] = useState<string>("");

    useEffect(() => {
        const fetchAdminStatus = async () => {
            const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map(
                (doc) => {
                    return doc.id; // return the admin id of the chat. Admin id is userId. Actually, it returns document id. Document id is userId in members collection.
                }
            )[0];
            setAdminId(adminId);
        }
        fetchAdminStatus();

    }, [chatId]);

    return adminId;
}

export default UseIsAdmin;