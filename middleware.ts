// Middleware for protected routes. If user is not authenticated, it will redirect to login page.
import { withAuth } from "next-auth/middleware";

export default withAuth;  // for protected routes

export const config = {
    matcher: ["/chat", "/chat:id*", "/membership"]  // this is protected url. If user is not authenticated, it will redirect to login page.
}
