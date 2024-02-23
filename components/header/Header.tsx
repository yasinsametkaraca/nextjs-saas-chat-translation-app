// header component is server component.
// Server components are used to provide the server to the components.
// So that the components can use the server to make requests to the server.
import Logo from "@/components/header/Logo";
import DarkModeToggle from "@/components/header/DarkModeToggle";
import UpgradeBanner from "@/components/header/UpgradeBanner";
import UserButton from "@/components/header/UserButton";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";

async function Header() {
    const session = await getServerSession(authOptions) // getServerSession is used to get the server session.
    console.log(session)

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
            <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
                <Logo />
                <div className="flex-1 flex items-center justify-end space-x-4">

                    {session ? (
                            <>
                                <Link href="/chat" prefetch={false}>
                                    <MessagesSquareIcon className="text-black dark:text-white" />
                                </Link>
                                <CreateChatButton />
                            </>
                        ): (
                            <Link href="/pricing">Pricing</Link>
                        )
                    }
                    <DarkModeToggle />
                    <UserButton session={session} />
                </div>
            </nav>
            <UpgradeBanner />
        </header>
    );
}

export default Header;


// Why is the header component a server component?
// Sunucu taraflı verilere ihtiyaç duyulması: Header komponenti, sunucu tarafında yürütülerek veriye erişmek için getServerSession fonksiyonunu kullanıyor. Bu durumda, sunucu tarafında işlenmesi gereken özel durumlar veya verilere ihtiyaç duyulabilir.
// Güvenlik nedenleri: Bazı kimlik doğrulama veya yetkilendirme işlemleri sunucu tarafında gerçekleştirilmelidir. Bu durumda, Header komponenti sunucu tarafında işlenerek, kimlik doğrulama bilgilerine erişebilir ve buna göre davranabilir.
// Performans optimizasyonu: Sunucu taraflı işlenen komponentler, bazı durumlarda performans avantajı sağlayabilir. Özellikle, sayfa yükleme süresini iyileştirmek veya sunucu tarafında ön işlem yapmak için sunucu taraflı komponentler kullanılabilir.
// SEO (Arama Motoru Optimizasyonu) gereksinimleri: Bazı durumlarda, sunucu taraflı işlenen komponentler SEO açısından avantajlı olabilir. Bu nedenle, Header gibi sitenin önemli bileşenlerinin sunucu taraflı olarak işlenmesi tercih edilebilir.


// NEXTAUTH_URL: Bu ortam değişkeni, NextAuth.js'in kimlik doğrulama işlemleri sırasında kullanılacak olan URL'yi belirtir. Kimlik doğrulama sırasında kullanıcıların yönlendirileceği URL'dir. Örneğin, kullanıcı giriş yapmak veya kaydolmak istediğinde, kullanıcının yönlendirileceği sayfa bu URL'e gönderilir. NEXTAUTH_URL'yi ayarlamak, kimlik doğrulama işlemlerinin düzgün şekilde çalışmasını sağlar.
// NEXTAUTH_SECRET: Bu ortam değişkeni, NextAuth.js tarafından kullanılan gizli bir anahtarı belirtir. Bu anahtar, kimlik doğrulama işlemleri sırasında kullanılan oturum bilgilerini şifrelemek için kullanılır. Bu, kimlik doğrulama bilgilerinin güvenli bir şekilde saklanmasını sağlar ve kimlik doğrulama işlemlerinin güvenliğini artırır.