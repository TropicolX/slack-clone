import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-expect-error global.prisma is used by @prisma/client
  if (!global.prisma) {
    // @ts-expect-error global.prisma is used by @prisma/client
    global.prisma = new PrismaClient();
  }
  // @ts-expect-error global.prisma is used by @prisma/client
  prisma = global.prisma;
}
export default prisma;
