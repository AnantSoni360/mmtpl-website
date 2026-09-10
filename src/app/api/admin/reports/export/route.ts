import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  if (user.role !== 'ADMIN') {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'revenue';

  if (type === 'revenue') {
    const invoices = await prisma.invoice.findMany({
      include: {
        project: true,
        client: true
      },
      orderBy: { createdAt: 'desc' }
    });

    let csvContent = 'Invoice Number,Date,Client,Project,Amount,Tax,Total,Status\\n';
    
    invoices.forEach(inv => {
      csvContent += `${inv.invoiceNumber},${inv.createdAt.toISOString().split('T')[0]},"${inv.client.companyName}","${inv.project.name}",${inv.amount},${inv.tax},${inv.total},${inv.status}\\n`;
    });

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="revenue_report_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  }

  return new NextResponse('Invalid export type', { status: 400 });
}
