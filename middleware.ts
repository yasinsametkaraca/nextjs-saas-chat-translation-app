import { withAuth } from "next-auth/middleware";

export default withAuth;  // for protected routes

export const config = {
    matcher: ["/chat", "/chat:id*", "/register"]  // this is protected url. If user is not authenticated, it will redirect to login page
}
