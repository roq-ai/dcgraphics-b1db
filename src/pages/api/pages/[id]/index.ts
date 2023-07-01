import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { pageValidationSchema } from 'validationSchema/pages';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.page
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPageById();
    case 'PUT':
      return updatePageById();
    case 'DELETE':
      return deletePageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPageById() {
    const data = await prisma.page.findFirst(convertQueryToPrismaUtil(req.query, 'page'));
    return res.status(200).json(data);
  }

  async function updatePageById() {
    await pageValidationSchema.validate(req.body);
    const data = await prisma.page.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePageById() {
    const data = await prisma.page.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
