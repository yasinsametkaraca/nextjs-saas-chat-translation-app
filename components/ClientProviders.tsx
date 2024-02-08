"use client"  // client provider is used to provide the client to the components. So that the components can use the client to make requests to the server.

import { SessionProvider } from "next-auth/react";  // SessionProvider, kimlik doğrulama durumunu izlemek ve kullanıcı oturumlarını yönetmek için gereken işlevselliği sağlar.
import React from "react";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}