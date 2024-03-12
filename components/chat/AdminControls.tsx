import InviteUser from "@/components/chat/InviteUser";
import DeleteChatButton from "@/components/chat/DeleteChatButton";

function AdminControls({chatId}: {chatId: string}) {
    return (
        <div className="flex justify-end space-x-2 m-5 mb-0">
            <InviteUser chatId={chatId} />
            <DeleteChatButton chatId={chatId} />
        </div>
    );
}

export default AdminControls;