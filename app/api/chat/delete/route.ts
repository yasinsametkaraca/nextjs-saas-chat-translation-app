import {adminDb} from "@/firebase-admin";
import {NextResponse} from "next/server";

// DELETE /api/chat/delete - Delete a chat and all its messages and subcollections (irreversible)
export async  function DELETE(req: Request) {
    const { chatId } = await req.json();  // get the chatId from the request body.

    const ref = adminDb.collection("chats").doc(chatId);

    const bulkWriter = adminDb.bulkWriter(); // bulkWriter is used to perform multiple write operations in a single request. For example, you can use bulkWriter to delete a document and all of its subcollections in one batch.
    const MAX_RETRY_ATTEMPTS = 5;

    bulkWriter.onWriteError((error) => { // onWriteError is used to handle the error when writing to the database.
        if (error.failedAttempts < MAX_RETRY_ATTEMPTS) { // if the failed attempts is less than the max retry attempts, it will return true. BulkWriter will retry the operation if the error is transient.
            return true;
        } else {
            console.error("Failed to write at document", error.documentRef.path);
            return false;
        }
    });

    try {
        await adminDb.recursiveDelete(ref, bulkWriter); // delete the chat and all its subcollections. It is used to delete the chat and all its subcollections.
        return NextResponse.json({success: true}, {status: 200});
    } catch (error) {
        console.error("Promise rejected.", error);
        return NextResponse.json({success: false}, {status: 500});
    }
}

// recursiveDelete is a function that deletes a document and all of its subcollections.