"use client"

import {Button} from "@/components/ui/button";
import {MessageSquarePlusIcon} from "lucide-react";
import {useRouter} from "next/navigation";

function CreateChatButton() {
    const router = useRouter();
    const createNewChat = async () => {
        router.push(`/chat/new`);
    }

    return (
        <Button onClick={createNewChat} variant={"ghost"}>
            <MessageSquarePlusIcon />
        </Button>
    );
}

export default CreateChatButton;