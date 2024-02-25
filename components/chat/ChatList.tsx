import React from 'react';
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import {getDocs} from "@firebase/firestore";

async function ChatList() {
    const session = await getServerSession(authOptions);

    // const chatsSnapshot = await getDocs(chatMembersCollectionGroupRef(session?.user.id!));

    return (
        <div></div>
    );
}

export default ChatList;