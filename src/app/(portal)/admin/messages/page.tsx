import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Search, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function AdminMessagesPage({ searchParams }: { searchParams: Promise<{ contactId?: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/auth/login');

  const { contactId } = await searchParams;

  // Get all users (employees/admins) to message
  const contacts = await prisma.user.findMany({
    where: {
      id: { not: user.id },
      role: { in: ['ADMIN', 'EMPLOYEE'] }
    },
    select: { id: true, name: true, role: true }
  });

  const activeContact = contacts.find(c => c.id === contactId) || contacts[0];

  const messages = activeContact ? await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: user.id, toUserId: activeContact.id },
        { fromUserId: activeContact.id, toUserId: user.id }
      ]
    },
    orderBy: { createdAt: 'asc' },
    take: 100
  }) : [];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Messages</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Communicate with employees and clients.</p>
      </div>

      <div className="flex-1 flex overflow-hidden bg-[var(--color-paper)] border-[0.5px] border-[var(--color-silver)] rounded-[16px] shadow-[var(--shadow-card)]">
        
        {/* Contacts Sidebar */}
        <div className="w-[300px] border-r border-[var(--color-silver)] flex flex-col h-full bg-[var(--color-bone)]">
          <div className="p-4 border-b border-[var(--color-silver)]">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full pl-9 pr-4 py-2 bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)]"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {contacts.map((contact) => (
              <Link key={contact.id} href={`/admin/messages?contactId=${contact.id}`}>
                <div className={`p-3 rounded-[12px] cursor-pointer transition-colors flex items-center gap-3 ${activeContact?.id === contact.id ? 'bg-[var(--color-paper)] border border-[var(--color-silver)] shadow-sm' : 'hover:bg-[var(--color-paper)]'}`}>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-silver)] flex items-center justify-center text-[var(--color-slate)]">
                    <User size={18} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[14px] font-semibold text-[var(--color-obsidian)] font-switzer truncate">{contact.name || 'Unknown'}</p>
                    </div>
                    <p className="text-[12px] text-[var(--color-slate)] font-switzer truncate">{contact.role}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {activeContact ? (
          <div className="flex-1 flex flex-col h-full bg-[var(--color-paper)]">
            {/* Chat Header */}
            <div className="h-[70px] border-b border-[var(--color-silver)] px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-silver)] flex items-center justify-center text-[var(--color-slate)]">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer">{activeContact.name}</h3>
                  <p className="text-[12px] text-[var(--color-slate)] font-switzer">{activeContact.role}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[rgba(0,0,0,0.01)] flex flex-col justify-end">
              <div className="flex flex-col gap-4 mt-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-[var(--color-slate)] text-[13px] font-switzer py-10">
                    Send a message to start the conversation.
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.fromUserId === user.id;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-4 rounded-[16px] ${
                          isMe 
                            ? 'bg-[var(--color-obsidian)] text-white rounded-br-sm' 
                            : 'bg-[var(--color-bone)] border border-[var(--color-silver)] text-[var(--color-obsidian)] rounded-bl-sm'
                        }`}>
                          <p className="text-[14px] font-switzer leading-relaxed">{msg.content}</p>
                          <p className={`text-[10px] mt-2 text-right ${isMe ? 'text-[rgba(255,255,255,0.7)]' : 'text-[var(--color-slate)]'}`}>
                            {format(new Date(msg.createdAt), 'hh:mm a')}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Input Area */}
            <form action={async (formData) => {
              'use server';
              const prisma = (await import('@/lib/prisma')).default;
              const { revalidatePath } = await import('next/cache');
              const content = formData.get('content') as string;
              if (!content.trim()) return;
              await prisma.message.create({
                data: {
                  fromUserId: user.id,
                  toUserId: activeContact.id,
                  content
                }
              });
              
              await prisma.notification.create({
                data: {
                  userId: activeContact.id,
                  title: 'New Message',
                  body: `You received a new message from ${user.name || 'Admin'}`,
                  type: 'MESSAGE',
                  link: activeContact.role === 'EMPLOYEE' ? '/employee/messages' : 
                        activeContact.role === 'CLIENT' ? '/client/messages' : '/admin/messages'
                }
              });

              revalidatePath('/admin/messages');
            }} className="p-4 border-t border-[var(--color-silver)] bg-[var(--color-paper)]">
              <div className="flex gap-3">
                <input 
                  type="text" 
                  name="content"
                  required
                  placeholder="Type your message..." 
                  className="flex-1 bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-3 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)]"
                />
                <Button type="submit" variant="lilac" className="px-6">
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full bg-[var(--color-paper)] items-center justify-center text-[var(--color-slate)] text-[14px]">
            No contacts available to message.
          </div>
        )}
      </div>
    </div>
  );
}
