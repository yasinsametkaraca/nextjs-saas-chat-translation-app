"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/user/UserAvatar";
import {Session} from "next-auth";
import { Button } from "../ui/button";
import {signIn} from "next-auth/react";

function UserButton({session}: {session: Session | null}) {
    if (!session) return (
        <Button variant={"outline"} onClick={() => signIn()}>Sign in</Button>
    );

    return (session && (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar name={session.user?.name} image={"https://github.com/shadcn.png"} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    );
}

export default UserButton;