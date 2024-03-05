"use client"

import {useSession} from "next-auth/react";
import * as z from "zod" // zod is used for input validation. It is a TypeScript-first schema declaration and validation library.
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {addDoc, getDocs, serverTimestamp} from "@firebase/firestore";
import {limitedMessagesRef, messagesRef, User} from "@/lib/converters/Message";
import {useRouter} from "next/navigation";
import {useSubscriptionStore} from "@/store/store";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
 // react-hook-form is used for form validation. It is a performant, flexible and extensible forms with easy-to-use validation.

const formSchema = z.object({
    input: z.string().min(2).max(1000),
})

function ChatInput({chatId}: { chatId: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    })
    const {data:session} = useSession();
    const router = useRouter();
    const subscriction = useSubscriptionStore(state => state.subscription);
    const {toast} = useToast();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const messageInput = values.input.trim(); // trim the input value. It is used to remove the white spaces from the input value.
        form.reset();
        console.log(messageInput)
        if (messageInput.length === 0) {
            return;
        }
        if (!session?.user) {
            return;
        }

        const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(  // get the list of messages of the chat. It is used to get the number of messages of the chat. Free plan users can only send 25 messages.
                (doc) => doc.data()
            ).length;
        const isPro = subscriction?.status === "active";

        if (!isPro && messages >= 20) {  // Free plan users can only send 20 messages.
            toast({
                title: "Free plan limit reached",
                description: "Free plan users can only send 20 messages",
                variant: "destructive",
                action: (
                    <ToastAction altText="Upgrade" onClick={() => router.push("/membership")}>
                        Upgrade to PRO plan
                    </ToastAction>
                )
            });
            return;
        }

        const userToStore: User = {
            id: session.user.id!,
            name: session.user.name!,
            email: session.user.email!,
            image: session.user.image || "",
        }
        await addDoc(messagesRef(chatId), {
            input: messageInput,
            timestamp: serverTimestamp(),
            user: userToStore,
        })
    }

    return (
        <div className="sticky bottom-0">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
                >
                    <FormField
                        control={form.control}
                        name="input"
                        render={({field}) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        className="border-none bg-transparent dark:placeholder:text-white/70"
                                        placeholder="Enter message in any language..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-violet-600 text-white">Send</Button>
                </form>
            </Form>
        </div>
    );
}

export default ChatInput;