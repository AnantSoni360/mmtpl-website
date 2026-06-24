'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { InvoiceStatus } from '@prisma/client';

export async function createInvoice(formData: FormData) {
  const projectId = formData.get('projectId') as string;
  const dueDateStr = formData.get('dueDate') as string;
  const itemsStr = formData.get('items') as string; // JSON array of items

  if (!projectId || !dueDateStr || !itemsStr) {
    throw new Error('Missing required fields');
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { client: true }
  });

  if (!project) throw new Error('Project not found');
  if (!project.clientId) throw new Error('Project must have an assigned client to bill');

  const items = JSON.parse(itemsStr) as Array<{ description: string, quantity: number, unitPrice: number }>;
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const tax = subtotal * 0.18; // 18% GST default
  const total = subtotal + tax;

  // Auto invoice number
  const currentYear = new Date().getFullYear();
  const count = await prisma.invoice.count({
    where: {
      createdAt: {
        gte: new Date(`${currentYear}-01-01`),
        lte: new Date(`${currentYear}-12-31`)
      }
    }
  });
  const invoiceNumber = `INV-${currentYear}-${String(count + 1).padStart(4, '0')}`;

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      clientId: project.clientId,
      projectId: project.id,
      amount: subtotal,
      tax,
      total,
      dueDate: new Date(dueDateStr),
      status: 'DRAFT',
      items: {
        create: items.map(i => ({
          description: i.description,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          total: i.quantity * i.unitPrice
        }))
      }
    }
  });

  revalidatePath('/admin/billing');
  redirect(`/admin/billing/${invoice.id}/print`);
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus) {
  await prisma.invoice.update({
    where: { id },
    data: { status }
  });
  revalidatePath('/admin/billing');
}
