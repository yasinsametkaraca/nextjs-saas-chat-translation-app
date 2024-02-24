"use client"

import React from 'react';
import {useSubscriptionStore} from "@/store/store";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

function UpgradeBanner() {
    const subscription = useSubscriptionStore(state => state.subscription);
    console.log(subscription);
    const isPro = subscription?.status === "active";
    const router = useRouter();

    if (subscription === undefined || isPro) return null;

    return (
        <Button
            onClick={() => router.push("/membership")}
            className="w-full rounded-none bg-gradient-to-r from-[#fa9d32] to-[#208afa] text-center text-white px-5 py-2 hover:from-[#fa9d32] hover:to-[#208afa] hover:shadow-xxl transition-all"
        >
            Upgrade to Pro to unlock all features!
        </Button>
    );
}

export default UpgradeBanner;