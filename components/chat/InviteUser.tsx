"use client"
// InviteUser.tsx is a component that is used to add a user to a chat. It is used to add a user to a chat.
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { setDoc, getDocs, serverTimestamp } from "@firebase/firestore";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import {Toast, ToastAction} from "@/components/ui/toast";
import { addChatRef, listChatMembersRef } from "@/lib/converters/ChatMembers";
import { getUserByEmailRef } from "@/lib/converters/User";
import { useState } from "react";
import useIsAdmin from "@/hooks/useIsAdmin";
import {PlusCircleIcon} from "lucide-react";
import ShareLink from "@/components/chat/ShareLink";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
})

function InviteUser({chatId}: {chatId: string}) {
    const { data: session } = useSession();
    const {toast} = useToast();
    const adminId = useIsAdmin({chatId});
    const router = useRouter();
    const subscription = useSubscriptionStore(state => state.subscription);

    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false);  // add user to the chat. It is used to open the invite link dialog.

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!session?.user.id) return;
        toast({
            title: "adding user to chat",
            description: "Please wait...",
        })

        // noOfUserInChat is used to get the number of users in the chat. It is used to get the number of users in the chat. To check if they are about to exceed the free plan.
        const noOfUserInChat = (await getDocs(listChatMembersRef(chatId))).docs.map(
            (doc) => doc.data()
        ).length;
        // check if the user is about to exceed the free plan which is 3 chats
        const isPro = subscription?.status === "active";

        if (!isPro && noOfUserInChat >= 2) {  // Free plan users can only add 2 users to a chat.
            toast({
                title: "Free plan limit exceeded",
                description: "Free plan users can only add 2 users to a chat. Upgrade to PRO plan to add more users",
                variant: "destructive",
                action: (
                    <ToastAction altText="Upgrade" onClick={() => router.push("/membership")}>
                        Upgrade to PRO plan
                    </ToastAction>
                )
            });
            return;
        }
        const getUserByEmail = await getDocs(getUserByEmailRef(values.email));
        if (getUserByEmail.empty) {
            toast({
                title: "User not found",
                description: "The user you are trying to invite is not registered. Please enter an email address of a registered user OR resend the invitation once they have signed up!",
                variant: "destructive",
            });
            return;
        } else {
            const user = getUserByEmail.docs[0].data(); // get the user by email. It is used to get the user by email.
            await setDoc(addChatRef(chatId, user.id), {  // add the user to the chat and set the user as a member of the chat.
                email: user.email!,
                image: user.image || "",
                userId: user.id!,
                timestamp: serverTimestamp(),
                chatId: chatId,
                isAdmin: false,
            }).then(() => {
                setOpen(false);
                toast({
                    title: "Added to chat",
                    description: "The user has been added to the chat",
                    className: "bg-green-500 text-white",
                    duration: 4000,
                });
                setOpenInviteLink(true);  // after adding the user to the chat, open the invite link dialog.
            }).catch((error) => {
                toast({
                    title: "Error",
                    description: "An error occurred while adding the user to the chat",
                    variant: "destructive",
                });
                setOpen(false);
            })
        }
        form.reset();
    }

    return (
        adminId === session?.user?.id && (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircleIcon className="mr-1" />
                            Add user to chat
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add user to chat</DialogTitle>
                            <DialogDescription>
                                Enter the email of the user you want to add to the chat.{" "}
                                <span className="font-bold text-indigo-400">(they must be registered)</span>
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col space-y-2"
                            >
                                <FormField
                                    control={form.control}
                                    name={"email"}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="ysk@gmail.com"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                                <Button className="ml-auto sm:w-fit w-full" type="submit">Add user to chat</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                <ShareLink
                    isOpen={openInviteLink}
                    setIsOpen={setOpenInviteLink}
                    chatId={chatId}
                />
            </>
        )

    );
}

export default InviteUser;