import { getSession } from "next-auth/react"

export const authentication = async (context, cb) => {
  const session = await getSession(context);
  const { url } = context.req
  if (!session) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  // user with 'user' role can't access this page
  if (url === '/users/') {
    if (session.role === 'USER') {
      return {
        redirect: {
          destination: '/401',
          permanent: false
        }
      }
    }
  }

  return cb({ session })
}