import { unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react"
import { authOptions } from "./auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    return res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  })
}
