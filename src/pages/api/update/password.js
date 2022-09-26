import prisma from 'src/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end()
  const { ...data } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { id: data.id } })
    if (data.currentPassword !== user.password) return res.status(403).end()
    if (user.email === 'user@gmail.com' || user.email === 'admin@gmail.com') return res.status(401).end()

    delete data.currentPassword
    await prisma.user.update({ where: { id: data.id }, data })
    res.status(200)
    res.json({
      message: 'Data successfully updated!'
    })
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json({
      message: 'Failed update data!'
    })
  }
}
