import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function countModels() {
  const models = [
    'user', 'employee', 'client', 'jobSeeker', 'project', 'projectAssignment',
    'task', 'attendance', 'leaveRequest', 'invoice', 'jobPosting', 'jobApplication',
    'inquiry'
  ];
  
  for (const model of models) {
    try {
      // @ts-ignore
      const count = await prisma[model].count();
      console.log(`${model}: ${count}`);
    } catch (e) {
      console.log(`${model}: ERROR`);
    }
  }
  await prisma.$disconnect();
}

countModels();
