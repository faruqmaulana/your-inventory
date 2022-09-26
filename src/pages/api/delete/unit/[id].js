import prisma from 'src/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end()
  const { id } = req.query
  try {
    await prisma.unit.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200)
    res.json({
      message: 'Data successfully deleted'
    })
  } catch (error) {
    res.status(400)
    console.log(error)
    res.json({
      error,
      message: 'Failed delete data'
    })
  }
}
