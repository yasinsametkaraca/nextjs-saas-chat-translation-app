"use client"

import React from 'react';
import {LanguagesSupported, LanguageSupportedMap, useLanguageStore, useSubscriptionStore} from "@/store/store";
import {usePathname} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";

function LanguageSelect() {
    const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
        useLanguageStore((state) => [
            state.language,
            state.setLanguage,
            state.getLanguages,
            state.getNotSupportedLanguages
        ]);

    const subscription = useSubscriptionStore((state) => state.subscription);
    const isPro = subscription?.status === "active";

    const pathName = usePathname();
    const isChatPage = pathName.includes("/chat"); // isChatPage is a boolean that checks if the current page is a chat page.

    return isChatPage && (
        <div>
            <Select onValueChange={(value: LanguagesSupported) => setLanguage(value)}>
                <SelectTrigger className="w-[150px] text-black dark:text-white">
                    <SelectValue placeholder={LanguageSupportedMap[language]} />
                </SelectTrigger>
                <SelectContent>
                    {subscription === undefined ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            {getLanguages(isPro).map((language) => (
                                <SelectItem key={language} value={language}>
                                    {LanguageSupportedMap[language]}
                                </SelectItem>
                            ))}
                            {getNotSupportedLanguages(isPro).map((language) => (
                                <Link href={"/membership"} key={language} prefetch={false}>
                                    <SelectItem key={language} value={language} disabled className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1">
                                        {LanguageSupportedMap[language]} (PRO)
                                    </SelectItem>
                                </Link>
                            ))}
                        </>
                    )}
                </SelectContent>
            </Select>
        </div>
    )
}

export default LanguageSelect;