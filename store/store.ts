import { create } from 'zustand'
import { Subscription} from "@/types/Subscription";

//en,es,de,fr,tr,ar,zh,pt,it,ru
export type LanguagesSupported =
    | "tr"
    | "en"
    | "es"
    | "de"
    | "fr"
    | "ar"
    | "zh"
    | "pt"
    | "it"
    | "ru";

//LanguageSupportedMap is a map that contains the supported languages and their corresponding names. It is used to display the supported languages in the language selector.
export const LanguageSupportedMap: Record<LanguagesSupported, string> = {
    tr: "Turkish",
    en: "English",
    es: "Spanish",
    de: "German",
    fr: "French",
    ar: "Arabic",
    zh: "Chinese",
    pt: "Portuguese",
    it: "Italian",
    ru: "Russian",
};

interface LanguageState {
    language: LanguagesSupported;
    setLanguage: (language: LanguagesSupported) => void;
    getLanguages: (isPro: boolean) => LanguagesSupported[];
    getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

const LANGUAGE_IN_FREE_PLAN = 2;  // the number of supported languages in the free plan.
export const useLanguageStore = create<LanguageState>()((set, get) => ({
    language: "tr",
    setLanguage: (language: LanguagesSupported) => set({ language }),
    getLanguages: (isPro: boolean) => {
        if (isPro)  //if the user is a pro user, return all the supported languages.
            return Object.keys(LanguageSupportedMap) as LanguagesSupported[];
        return Object.keys(LanguageSupportedMap).slice(0, LANGUAGE_IN_FREE_PLAN) as LanguagesSupported[];  // if the user is not a pro user, return the first two supported languages.
    },
    getNotSupportedLanguages: (isPro: boolean) => {
        if (isPro)  //if the user is a pro user, return an empty array.
            return [];
        return Object.keys(LanguageSupportedMap).slice(LANGUAGE_IN_FREE_PLAN) as LanguagesSupported[];  // if the user is not a pro user, return the not supported languages.
    }
}));

interface SubscriptionState {  // SubscriptionState is an interface that contains the subscription and the setSubscription function. It is used to manage the subscription of the user.
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;
}

// createSubscriptionStore is a function (global state) that creates a store for the subscription. It is used to manage the subscription of the user.
export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));




