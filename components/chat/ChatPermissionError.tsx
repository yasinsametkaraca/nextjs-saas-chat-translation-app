import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {AlertCircle} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

function ChatPermissionError() {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex">
                <p className="flex-1">
                    You dont have permission to access this chat.
                    <br/>
                    <span className="font-bold">
                        Please contact the chat admin to add you to the chat.
                    </span>
                </p>
                <Link href={"/chat"} replace>
                    <Button variant="destructive">Dismiss</Button>
                </Link>
            </AlertDescription>
        </Alert>
    );
}
// replace is used to replace the current entry in the history stack.
export default ChatPermissionError;