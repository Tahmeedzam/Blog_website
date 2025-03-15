import { Suspense } from "react";
import PostFormWrapper from "./PostFormWrapper";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading Post Form...</p>}>
            <PostFormWrapper />
        </Suspense>
    );
}
