'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export function NewInvoiceForm({ projects }: { projects: { id: string, name: string, clientName: string }[] }) {
  const [items, setItems] = useState([{ id: 1, description: '', quantity: 1, unitPrice: 0 }]);

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <form action={async (formData) => {
      const { createInvoice } = await import('@/app/actions/billing');
      formData.append('items', JSON.stringify(items));
      await createInvoice(formData);
    }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Project</label>
          <select name="projectId" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]">
            <option value="">Select a project...</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.clientName})</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Due Date</label>
          <input type="date" name="dueDate" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--color-silver)] pb-2">
          <h3 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer">Invoice Items</h3>
          <Button type="button" variant="outline" className="h-8 text-[12px] px-3" onClick={() => setItems([...items, { id: Date.now(), description: '', quantity: 1, unitPrice: 0 }])}>
            <Plus size={14} className="mr-1" /> Add Item
          </Button>
        </div>

        {items.map((item, index) => (
          <div key={item.id} className="flex items-start gap-4 p-4 border border-[var(--color-silver)] rounded-lg bg-[var(--color-bone)]">
            <div className="flex-1 space-y-2">
              <label className="text-[12px] text-[var(--color-slate)] font-switzer">Description</label>
              <input required value={item.description} onChange={e => {
                const newItems = [...items];
                newItems[index].description = e.target.value;
                setItems(newItems);
              }} className="w-full bg-white border border-[var(--color-silver)] rounded px-3 py-1.5 text-[13px] outline-none focus:border-[var(--color-obsidian)]" placeholder="e.g. Phase 1 Implementation" />
            </div>
            <div className="w-24 space-y-2">
              <label className="text-[12px] text-[var(--color-slate)] font-switzer">Qty</label>
              <input type="number" required min="1" value={item.quantity} onChange={e => {
                const newItems = [...items];
                newItems[index].quantity = parseInt(e.target.value) || 0;
                setItems(newItems);
              }} className="w-full bg-white border border-[var(--color-silver)] rounded px-3 py-1.5 text-[13px] outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            <div className="w-32 space-y-2">
              <label className="text-[12px] text-[var(--color-slate)] font-switzer">Unit Price (₹)</label>
              <input type="number" required min="0" value={item.unitPrice || ''} onChange={e => {
                const newItems = [...items];
                newItems[index].unitPrice = parseFloat(e.target.value) || 0;
                setItems(newItems);
              }} className="w-full bg-white border border-[var(--color-silver)] rounded px-3 py-1.5 text-[13px] outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            <div className="w-32 space-y-2">
              <label className="text-[12px] text-[var(--color-slate)] font-switzer">Total</label>
              <div className="px-3 py-1.5 text-[14px] font-medium">₹{(item.quantity * item.unitPrice).toLocaleString()}</div>
            </div>
            <button type="button" onClick={() => setItems(items.filter(i => i.id !== item.id))} className="mt-8 text-red-500 hover:text-red-700 transition-colors" disabled={items.length === 1}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <div className="w-64 space-y-3 bg-[var(--color-bone)] p-4 rounded-lg border border-[var(--color-silver)]">
          <div className="flex justify-between text-[13px] font-switzer text-[var(--color-slate)]">
            <span>Subtotal</span>
            <span className="text-[var(--color-obsidian)] font-medium">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[13px] font-switzer text-[var(--color-slate)]">
            <span>Tax (18%)</span>
            <span className="text-[var(--color-obsidian)] font-medium">₹{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[15px] font-switzer font-bold border-t border-[var(--color-silver)] pt-2 mt-2">
            <span>Total</span>
            <span className="text-[var(--color-lilac-bloom)]">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)]">
        <Link href="/admin/billing">
          <Button type="button" variant="outline">Cancel</Button>
        </Link>
        <Button type="submit" variant="lilac">Create Invoice</Button>
      </div>
    </form>
  );
}
