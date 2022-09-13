import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {

//   }
// );

// export const config = { matcher: ["/"] };

// export default function middleware() {
//   console.log('hello from middleware')
// }


// import { withAuth } from "next-auth/middleware"

export default withAuth(

  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "ADMIN",
    },
  }
)

export const config = { matcher: ["/supplier"] }