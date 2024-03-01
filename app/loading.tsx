import React from 'react';
import LoadingSpinner from "@/components/LoadingSpinner";

function Loading() {  // every time the user navigates to a new page, the loading component is displayed.
    return (
        <div className="flex items-center p-10 justify-center">
            <LoadingSpinner />
        </div>
    );
}

export default Loading;