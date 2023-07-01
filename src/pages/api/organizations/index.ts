import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { organizationValidationSchema } from 'validationSchema/organizations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOrganizations();
    case 'POST':
      return createOrganization();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganizations() {
    const data = await prisma.organization
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'organization'));
    return res.status(200).json(data);
  }

  async function createOrganization() {
    await organizationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.carousel?.length > 0) {
      const create_carousel = body.carousel;
      body.carousel = {
        create: create_carousel,
      };
    } else {
      delete body.carousel;
    }
    if (body?.contact_form?.length > 0) {
      const create_contact_form = body.contact_form;
      body.contact_form = {
        create: create_contact_form,
      };
    } else {
      delete body.contact_form;
    }
    if (body?.gallery?.length > 0) {
      const create_gallery = body.gallery;
      body.gallery = {
        create: create_gallery,
      };
    } else {
      delete body.gallery;
    }
    if (body?.page?.length > 0) {
      const create_page = body.page;
      body.page = {
        create: create_page,
      };
    } else {
      delete body.page;
    }
    const data = await prisma.organization.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
