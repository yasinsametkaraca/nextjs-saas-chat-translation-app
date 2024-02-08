import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";  // cn fonksiyonu, sınıf isimlerini birleştirmek veya birleştirilmiş sınıf isimlerini oluşturmak için kullanılan bir yardımcı fonksiyondur.
import Image from "next/image";

function UserAvatar({name, image, className}: {name?: string | null, image?: string | null, className?: string }) {
    return (
        <Avatar className={cn("bg-white text- rounded-full", className)}>
            {
                image && (
                    <Image src={image} alt={name || "User name"} width={40} height={40} className="rounded-full"  />
                )

            }
            {/*<AvatarImage src="https://github.com/shadcn.png" />*/}
            <AvatarFallback delayMs={1000} className="dark:bg-white bg-white dark:text-black text-sm">
                {
                    name?.split(" ").map((n) => n[0]).join("")
                }
            </AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar;