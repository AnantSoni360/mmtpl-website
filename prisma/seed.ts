import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('password123', 12);

  // 1. Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mmtpl.in' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@mmtpl.in',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });

  // --- CLIENTS ---
  const jsolClient = await prisma.user.upsert({
    where: { email: 'contact@jsol.in' },
    update: {},
    create: {
      name: 'JSOL Representative',
      email: 'contact@jsol.in',
      passwordHash,
      role: 'CLIENT',
      isActive: true,
      client: {
        create: {
          companyName: 'Jindal Steel Odisha Limited (JSOL)',
          contactPerson: 'JSOL Representative',
          address: 'Angul, Odisha',
        },
      },
    },
  });

  const lmelClient = await prisma.user.upsert({
    where: { email: 'contact@lmel.in' },
    update: {},
    create: {
      name: 'LMEL Representative',
      email: 'contact@lmel.in',
      passwordHash,
      role: 'CLIENT',
      isActive: true,
      client: {
        create: {
          companyName: 'Lloyds Metals and Energy Limited (LMEL)',
          contactPerson: 'LMEL Representative',
        },
      },
    },
  });

  const jslClient = await prisma.user.upsert({
    where: { email: 'contact@jsl.in' },
    update: {},
    create: {
      name: 'JSL Representative',
      email: 'contact@jsl.in',
      passwordHash,
      role: 'CLIENT',
      isActive: true,
      client: {
        create: {
          companyName: 'Jindal Stainless Limited (JSL)',
          contactPerson: 'JSL Representative',
        },
      },
    },
  });

  // Fetch created client records to link to projects
  const jsol = await prisma.client.findFirst({ where: { companyName: { contains: 'JSOL' } } });
  const lmel = await prisma.client.findFirst({ where: { companyName: { contains: 'LMEL' } } });
  const jsl = await prisma.client.findFirst({ where: { companyName: { contains: 'JSL' } } });

  // --- PROJECTS ---
  if (jsol && lmel && jsl) {
    await prisma.project.upsert({
      where: { projectCode: 'PRJ-JSOL-BOF' },
      update: {},
      create: {
        projectCode: 'PRJ-JSOL-BOF',
        name: 'BOF Works JSOL Angul',
        clientId: jsol.id,
        valueCr: 91.56,
        status: 'IN_PROGRESS',
        location: 'Angul, Odisha',
        startDate: new Date(),
      }
    });

    await prisma.project.upsert({
      where: { projectCode: 'PRJ-LMEL-COKE' },
      update: {},
      create: {
        projectCode: 'PRJ-LMEL-COKE',
        name: 'Coke Oven LMEL',
        clientId: lmel.id,
        valueCr: 30.68,
        status: 'IN_PROGRESS',
        startDate: new Date(),
      }
    });

    await prisma.project.upsert({
      where: { projectCode: 'PRJ-JSL-LCP' },
      update: {},
      create: {
        projectCode: 'PRJ-JSL-LCP',
        name: 'LCP Work JSL',
        clientId: jsl.id,
        valueCr: 14.96,
        status: 'IN_PROGRESS',
        startDate: new Date(),
      }
    });
  }

  // --- EMPLOYEES ---
  const employeesData = [
    { name: 'D.S. Bhowmik', email: 'ds.bhowmik@mmtpl.in', code: 'EMP-101', dept: 'Mechanical' },
    { name: 'Akheel Ahmed', email: 'akheel.ahmed@mmtpl.in', code: 'EMP-102', dept: 'Refractory' },
    { name: 'Madhusudhan', email: 'madhusudhan@mmtpl.in', code: 'EMP-103', dept: 'Operations' },
    { name: 'Musthiaq Mohammad', email: 'musthiaq.m@mmtpl.in', code: 'EMP-104', dept: 'Operations' },
    { name: 'Kamal Deshmukh', email: 'kamal.d@mmtpl.in', code: 'EMP-105', dept: 'Operations' },
  ];

  for (const emp of employeesData) {
    await prisma.user.upsert({
      where: { email: emp.email },
      update: {},
      create: {
        name: emp.name,
        email: emp.email,
        passwordHash,
        role: 'EMPLOYEE',
        isActive: true,
        employee: {
          create: {
            employeeCode: emp.code,
            department: emp.dept,
            designation: 'Engineer',
            joinDate: new Date('2022-01-01'),
            employmentType: 'FULL_TIME',
          }
        }
      }
    });
  }

  // --- JOB POSTINGS ---
  const jobsData = [
    { title: 'Refractory Supervisor', dept: 'Refractory', type: 'FULL_TIME' as const, location: 'Various Sites' },
    { title: 'Site Engineer (Civil)', dept: 'Civil', type: 'FULL_TIME' as const, location: 'Various Sites' },
    { title: 'Mechanical Erection Engineer', dept: 'Mechanical', type: 'FULL_TIME' as const, location: 'Various Sites' },
  ];

  for (const job of jobsData) {
    await prisma.jobPosting.create({
      data: {
        title: job.title,
        department: job.dept,
        type: job.type,
        location: job.location,
        experience: '3-5 Years',
        description: `We are looking for an experienced ${job.title} to join our team.`,
        requirements: ['5+ years experience', 'Relevant degree/diploma'],
        isActive: true,
      }
    });
  }

  console.log('Seeding finished successfully!');
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
