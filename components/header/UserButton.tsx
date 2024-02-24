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
import {signIn, signOut} from "next-auth/react";
import {useSubscriptionStore} from "@/store/store";
import LoadingSpinner from "@/components/LoadingSpinner";
import {StarIcon} from "lucide-react";
import ManageAccountButton from "@/components/account/ManageAccountButton";

function UserButton({session}: {session: Session | null}) {
    const subscription = useSubscriptionStore((state) => state.subscription);

    if (!session) return (
        <Button variant={"outline"} onClick={() => signIn()}>Sign in</Button>
    );

    return session && (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar name={session.user?.name} image={session.user?.image} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    subscription === undefined && (
                        <DropdownMenuItem>
                            <LoadingSpinner />
                        </DropdownMenuItem>
                    )
                }
                {
                    subscription?.status === "active" && (
                        <>
                            <DropdownMenuLabel className="flex items-center justify-start space-x-2 text-[#fa9d32] animate-pulse">
                                <StarIcon size={18} fill="#fa9d32"/>
                                <p className="text-sm">Premium</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <ManageAccountButton />
                            </DropdownMenuItem>
                        </>
                    )
                }
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton;