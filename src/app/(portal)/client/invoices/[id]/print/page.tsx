import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import { PrintButton } from '@/components/portal/billing/PrintButton';

export default async function ClientInvoicePrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user || user.role !== 'CLIENT') redirect('/auth/login');

  const client = await prisma.client.findUnique({
    where: { userId: user.id }
  });

  if (!client) redirect('/auth/login');

  const invoice = await prisma.invoice.findUnique({
    where: { id, clientId: client.id },
    include: { project: true, client: true }
  });

  if (!invoice) return <div>Invoice not found or unauthorized.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen text-black print:p-0 print:m-0">
      <div className="flex justify-between items-start mb-12 border-b-2 border-gray-200 pb-8 print:border-none">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">INVOICE</h1>
          <p className="text-gray-500 font-medium">#{invoice.invoiceNumber}</p>
          <div className="mt-4 print:hidden">
            <PrintButton />
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">MMTPL</h2>
          <p className="text-gray-600">Turnkey Industrial Contractor</p>
          <p className="text-gray-600">contact@mmtpl.in</p>
        </div>
      </div>

      <div className="flex justify-between mb-12">
        <div>
          <h3 className="font-semibold text-gray-400 uppercase tracking-wider text-sm mb-2">Billed To</h3>
          <p className="font-bold text-lg">{invoice.client.companyName}</p>
          <p className="text-gray-600">{invoice.client.contactPerson}</p>
          <p className="text-gray-600">{invoice.client.address || 'Address not provided'}</p>
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-gray-400 uppercase tracking-wider text-sm mb-2">Invoice Details</h3>
          <p><span className="text-gray-600">Date:</span> {format(new Date(invoice.createdAt), 'dd MMM yyyy')}</p>
          <p><span className="text-gray-600">Due Date:</span> {format(new Date(invoice.dueDate), 'dd MMM yyyy')}</p>
          <p><span className="text-gray-600">Project:</span> {invoice.project.name}</p>
        </div>
      </div>

      <table className="w-full mb-12 text-left">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="py-3 font-semibold text-gray-600 uppercase tracking-wider text-sm">Description</th>
            <th className="py-3 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-4">Contract payment for {invoice.project.name}</td>
            <td className="py-4 text-right">₹{invoice.amount.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-64 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{invoice.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600 border-b border-gray-200 pb-3">
            <span>Tax ({(invoice.tax / invoice.amount * 100).toFixed(0)}%)</span>
            <span>₹{invoice.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-xl pt-2">
            <span>Total</span>
            <span>₹{invoice.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center text-gray-500 text-sm print:fixed print:bottom-8 print:w-full">
        <p>Thank you for your business.</p>
        <p>Please process payment within 15 days of receiving this invoice.</p>
      </div>
    </div>
  );
}
