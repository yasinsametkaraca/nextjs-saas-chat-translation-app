"use client"

import {useSession} from "next-auth/react";
import * as z from "zod" // zod is used for input validation. It is a TypeScript-first schema declaration and validation library.
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";  // react-hook-form is used for form validation. It is a performant, flexible and extensible forms with easy-to-use validation.

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

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if (values.input.length === 0) {
            return;
        }
        if (!session?.user) {
            return;
        }
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