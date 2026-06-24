import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PrintButton } from '@/components/portal/billing/PrintButton';

export default async function InvoicePrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      client: true,
      project: true,
      items: true
    }
  });

  if (!invoice) notFound();

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Top Actions (Hidden when printing) */}
      <div className="flex items-center justify-between mb-8 print:hidden">
        <Link href="/admin/billing" className="flex items-center gap-2 text-[var(--color-slate)] hover:text-[var(--color-obsidian)] text-[14px] font-switzer">
          <ArrowLeft size={16} /> Back to Billing
        </Link>
        <div className="flex items-center gap-3">
          <form action={async () => {
            'use server';
            const { updateInvoiceStatus } = await import('@/app/actions/billing');
            const nextMap: Record<string, import('@prisma/client').InvoiceStatus> = {
              DRAFT: 'SENT',
              SENT: 'PAID',
              PAID: 'DRAFT', // Cycle back for testing
              OVERDUE: 'PAID'
            };
            await updateInvoiceStatus(invoice.id, nextMap[invoice.status] || 'DRAFT');
          }}>
            <Button type="submit" variant="outline">
              Status: {invoice.status} (Click to Advance)
            </Button>
          </form>
          {/* We'll use a simple client script to print */}
          <PrintButton />
        </div>
      </div>

      {/* Invoice Document */}
      <div className="bg-white p-10 shadow-lg border border-gray-200 min-h-[1056px] print:shadow-none print:border-none print:p-0">
        <div className="flex justify-between items-start mb-12 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
            <p className="text-sm text-gray-500 mt-1">#{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-[#9f85ff]">MMTPL</h2>
            <p className="text-sm text-gray-600 mt-1">123 Industrial Area</p>
            <p className="text-sm text-gray-600">Bhilai, Chhattisgarh 490020</p>
            <p className="text-sm text-gray-600 mt-1">GSTIN: 22AAAAA0000A1Z5</p>
          </div>
        </div>

        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To:</p>
            <p className="text-base font-bold text-gray-900">{invoice.client.companyName}</p>
            {invoice.client.address && <p className="text-sm text-gray-600 whitespace-pre-wrap mt-1">{invoice.client.address}</p>}
            {invoice.client.gstin && <p className="text-sm text-gray-600 mt-1">GSTIN: {invoice.client.gstin}</p>}
          </div>
          <div className="text-right flex gap-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Invoice Date</p>
              <p className="text-sm text-gray-900 font-medium">{format(new Date(invoice.createdAt), 'dd MMM yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Due Date</p>
              <p className="text-sm text-gray-900 font-medium">{format(new Date(invoice.dueDate), 'dd MMM yyyy')}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-gray-900">Project: </span>
            {invoice.project.name}
          </p>
        </div>

        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Description</th>
              <th className="py-3 text-center text-xs font-bold text-gray-900 uppercase tracking-wider w-24">Qty</th>
              <th className="py-3 text-right text-xs font-bold text-gray-900 uppercase tracking-wider w-32">Unit Price</th>
              <th className="py-3 text-right text-xs font-bold text-gray-900 uppercase tracking-wider w-32">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-4 text-sm text-gray-900">{item.description}</td>
                <td className="py-4 text-sm text-gray-900 text-center">{item.quantity}</td>
                <td className="py-4 text-sm text-gray-900 text-right">₹{item.unitPrice.toLocaleString()}</td>
                <td className="py-4 text-sm text-gray-900 text-right font-medium">₹{item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="text-gray-900 font-medium">₹{invoice.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax (18% GST)</span>
              <span className="text-gray-900 font-medium">₹{invoice.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t-2 border-gray-900 pt-2 mt-2">
              <span>Total</span>
              <span>₹{invoice.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-gray-200">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Terms</h3>
          <p className="text-sm text-gray-600">Please pay within 15 days of receiving this invoice. Make all checks payable to MMTPL.</p>
        </div>
      </div>
      
    </div>
  );
}
