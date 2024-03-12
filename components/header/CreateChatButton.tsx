"use client"

import {Button} from "@/components/ui/button";
import {MessageSquarePlusIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {useSubscriptionStore} from "@/store/store";
import {useToast} from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { v4 as uuidv4 } from 'uuid';
import {setDoc, serverTimestamp, getDocs} from "@firebase/firestore";
import {addChatRef, chatMembersCollectionGroupRef} from "@/lib/converters/ChatMembers";
import {ToastAction} from "@/components/ui/toast";

function CreateChatButton({isLarge}: {isLarge?: boolean}) {
    const {data: session} = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const {toast} = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription);

    const createNewChat = async () => {
        if (!session?.user.id) return;
        setLoading(true)
        toast({
            title: "Creating a new chat...",
            description: "You will be able to chat with people from any country you want.",
            duration: 3000,
        })

        const chatsCount = (
            await getDocs(chatMembersCollectionGroupRef(session.user.id))  // Get the chats of the user. It is used to get the chats of the user.
        ).docs.map((doc) => doc.data()).length;
        const isPro = subscription?.status === "active";

        if (!isPro && chatsCount >= 3) {  // Check if the user is about to exceed the free plan which is 3 chats
            toast({
                title: "Free Plan Limit exceeded",
                description: "You have reached the maximum number of chats for the free plan. Please upgrade to the pro plan to create more chats.",
                variant: "destructive",
                action: (
                    <ToastAction altText={"Upgrade"} onClick={() => router.push("/membership")}>Upgrade to PRO</ToastAction>
                )
            })
            setLoading(false)
            return;
        }

        const chatId = uuidv4();
        await setDoc(addChatRef(chatId, session.user.id), {  // Add the user to the chat. The user who is create a chat is the admin of the chat.
            userId: session.user.id!,
            email: session.user.email!,
            timestamp: serverTimestamp(),
            isAdmin: true,
            chatId: chatId,
            image: session.user.image || "",
        }).then(() => {
            toast({
                title: "Success",
                description: "Your chat has been created. You can now chat with people from any country you want.",
                className: "bg-green-500 text-white",
                duration: 3000,
            })
            router.push(`/chat/${chatId}`);
        }).catch((error) => {
            console.error("Error adding document: ", error);
            toast({
                title: "Error",
                description: "An error occurred while creating your chat. Please try again later.",
                variant: "destructive",
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    if (isLarge) {
        return (
            <div>
                <Button onClick={createNewChat} variant={"default"}>
                    {loading ? <LoadingSpinner /> : "Create a New Chat"}
                </Button>
            </div>
        );
    }

    return (
        <Button onClick={createNewChat} variant={"ghost"}>
            <MessageSquarePlusIcon />
        </Button>
    );
}

export default CreateChatButton;