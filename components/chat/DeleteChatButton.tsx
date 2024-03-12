"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useIsAdmin from "@/hooks/useIsAdmin";
import {PlusCircleIcon} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import ShareLink from "@/components/chat/ShareLink";


function DeleteChatButton({chatId}: {chatId: string}) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false)
    const {toast} = useToast();
    const adminId = useIsAdmin({chatId});
    const router = useRouter();

    const handleDelete = async () => {
        if (!session?.user?.id) return;
        toast({
            title: "Deleting chat...",
            description: "Chat will be deleted",
        })

        await fetch("/api/chat/delete", {  // delete the chat. It is used to delete the chat. Delete api is next.js api route. Api/Chat/Delete.ts is a file that contains the code to delete the chat.
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({chatId: chatId}),
        }).then((res) => {
            toast({
                title: "Success",
                description: "Chat has been deleted",
                className: "text-white bg-green-600",
                duration: 4000,
            })
            router.replace("/chat"); // redirect to the chat page. replace method is used to redirect to the chat page.
        }).catch((error) => {
            toast({
                title: "Error",
                description: "Error deleting chat",
                variant: "destructive",
            })
        }).finally(() => {
            setOpen(false)
        })
    }

    return (
        adminId === session?.user?.id && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete Chat</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add you sure?</DialogTitle>
                        <DialogDescription>
                            This will delete the chat and all its messages. This action is irreversible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 space-x-2">
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    </div>
                </DialogContent>
            </Dialog>
        )

    );
}

export default DeleteChatButton;