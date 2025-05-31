import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login", // redirect here if not authenticated
  },
})

// This applies the middleware to all `/dashboard/**` routes
export const config = {
  matcher: ["/dashboard/:path*"],
}
