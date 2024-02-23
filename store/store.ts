import { create } from 'zustand'
import { Subscription} from "@/types/Subscription";

//en,es,de,fr,tr,ar,zh,pt,it,ru
export type LanguageSupported =
    | "en"
    | "es"
    | "de"
    | "fr"
    | "tr"
    | "ar"
    | "zh"
    | "pt"
    | "it"
    | "ru";

//LanguageSupportedMap is a map that contains the supported languages and their corresponding names. It is used to display the supported languages in the language selector.
export const LanguageSupportedMap: Record<LanguageSupported, string> = { //
    en: "English",
    es: "Spanish",
    de: "German",
    fr: "French",
    tr: "Turkish",
    ar: "Arabic",
    zh: "Chinese",
    pt: "Portuguese",
    it: "Italian",
    ru: "Russian",
};

interface SubscriptionState {  // SubscriptionState is an interface that contains the subscription and the setSubscription function. It is used to manage the subscription of the user.
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;
}

// createSubscriptionStore is a function (global state) that creates a store for the subscription. It is used to manage the subscription of the user.
export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));




