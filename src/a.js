import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// export default withAuth(
//   function middleware(req) {

//   }
// );

// export const config = { matcher: ["/"] };

// export default function middleware() {
//   console.log('hello from middleware')
// }

// import { withAuth } from "next-auth/middleware"

// export default withAuth(

//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log("token : ", req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "ADMIN",
//     },
//   }
// )

// export const config = { matcher: ["/"] }

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth

    // if (req.nextUrl.pathname.startsWith('/api')) {
    //   console.log("testing routes: ", new URL('/api', req.url))

    //   // if(!token) return NextResponse.redirect(new URL('/about-2', request.url))
    // }
    console.log('benar ini adalah: ', req.nextUrl.pathname.startsWith('/users'))
    console.log('from middleware: ', req.nextUrl)
    if (req.nextUrl.pathname.startsWith('/users')) {
      if (token.role === 'USER') return NextResponse.redirect(new URL('/401', req.url))

      return NextResponse.next()
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // `/admin` requires admin role
        if (req.nextUrl.pathname === '/users/') {
          if (token?.role === 'USER') return NextResponse.redirect(new URL('/401', req.url))

          //set token from middleware
          // return token?.role === "ADMIN"
          return NextResponse.next()
        }

        // console.log("maksudnya ini: ", !!token)

        // `/me` only requires the user to be logged in
        return !!token
      }
    }
  }
)

export const config = { matcher: ['/', '/users', '/api/:path*'] }
