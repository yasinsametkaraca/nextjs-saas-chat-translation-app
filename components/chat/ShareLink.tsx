"use client";

import { Copy } from "lucide-react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import {Dispatch, SetStateAction} from "react";

function ShareLink({ isOpen, setIsOpen, chatId } : {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, chatId: string}) {
    const {toast} = useToast();
    const host = window.location.host; // get the host name of the window. It is used to get the host name of the window.

    const linkToChat = process.env.NODE_ENV === "development" ? `http://${host}/chat/${chatId}` : `https://${host}/chat/${chatId}`;  // get the link to the chat.

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(linkToChat);  // copy the link to the clipboard. It is used to copy the link to the clipboard.
            toast({
                title: "Link copied",
                description: "Share this link with your friends. They must be added to the chat to view the chat!",
                className: "text-white bg-green-600",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Error copying to clipboard",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)} defaultOpen={isOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Copy className="mr-2" />
                    Share link
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Link</DialogTitle>
                    <DialogDescription>
                        Any user who has been {" "}
                        <span className="font-bold text-indigo-500">granted access</span>{" "}can use this link to view the chat.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">Link to chat</Label>
                        <Input
                            id="link"
                            defaultValue={linkToChat}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
                        <span className="sr-only">Copy link</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ShareLink;