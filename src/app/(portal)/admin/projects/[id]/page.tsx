import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Users, CheckSquare, Plus, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectDetailsPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ tab?: string }>
}) {
  const { id } = await params;
  const tab = (await searchParams).tab || 'overview';
  
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      assignments: {
        include: { employee: { include: { user: true } } }
      },
      tasks: {
        orderBy: { dueDate: 'asc' },
        include: { assignedTo: true }
      },
      updates: {
        orderBy: { createdAt: 'desc' },
        include: { postedBy: true }
      },
      documents: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!project) notFound();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'tasks', label: 'Tasks', count: project.tasks.length, icon: CheckSquare },
    { id: 'updates', label: 'Updates', count: project.updates.length, icon: MessageSquare },
    { id: 'documents', label: 'Documents', count: project.documents.length, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="w-10 h-10 rounded-full border border-[var(--color-silver)] flex items-center justify-center hover:bg-[var(--color-bone)] transition-colors">
            <ArrowLeft size={16} className="text-[var(--color-obsidian)]" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1 flex items-center gap-3">
              {project.name}
              <StatusBadge status={project.status.replace('_', ' ')} />
            </h1>
            <p className="text-[13px] text-[var(--color-slate)] font-switzer">
              Client: {project.client?.companyName || 'Internal MMTPL'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Edit size={16} /> Edit Project
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-[var(--color-silver)] pb-px">
        {tabs.map(t => (
          <Link 
            key={t.id} 
            href={`/admin/projects/${project.id}?tab=${t.id}`}
            className={`pb-3 px-1 text-[14px] font-medium font-switzer flex items-center gap-2 border-b-2 transition-colors ${
              tab === t.id 
                ? 'border-[var(--color-lilac-bloom)] text-[var(--color-lilac-bloom)]' 
                : 'border-transparent text-[var(--color-slate)] hover:text-[var(--color-obsidian)] hover:border-[var(--color-silver)]'
            }`}
          >
            <t.icon size={16} />
            {t.label}
            {t.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${tab === t.id ? 'bg-[#9f85ff]/20 text-[#9f85ff]' : 'bg-[var(--color-bone)] text-[var(--color-slate)]'}`}>
                {t.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Left Sidebar (Always Visible on Desktop) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">Project Info</h2>
            <div className="space-y-4">
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Project Code</p>
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{project.projectCode}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Start Date</p>
                  <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{project.startDate ? format(new Date(project.startDate), 'dd MMM yyyy') : 'TBD'}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">End Date</p>
                  <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{project.endDate ? format(new Date(project.endDate), 'dd MMM yyyy') : 'TBD'}</p>
                </div>
              </div>
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider">Value</p>
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">
                  {project.valueCr ? `₹${project.valueCr.toLocaleString()} Cr` : 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
                <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Scope of Work</h2>
                <p className="text-[14px] text-[var(--color-obsidian)] font-switzer leading-relaxed whitespace-pre-wrap">{project.scope || 'No scope provided.'}</p>
              </div>
              
              <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider flex items-center gap-2">
                    <Users size={18} className="text-[var(--color-slate)]" /> Team Members ({project.assignments.length})
                  </h2>
                  <Link href={`/admin/projects/${project.id}/assign`}>
                    <Button variant="outline" className="h-8 text-xs px-3">
                      <Plus size={14} /> Add Member
                    </Button>
                  </Link>
                </div>
                
                {project.assignments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-silver)] bg-[var(--color-bone)]">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-paper)] border border-[var(--color-silver)] flex items-center justify-center font-semibold text-[var(--color-obsidian)]">
                          {assignment.employee.user.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer leading-tight">{assignment.employee.user.name}</p>
                          <p className="text-[12px] text-[var(--color-slate)] font-switzer">{assignment.roleOnProject}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-[var(--color-slate)] font-switzer">No team members assigned.</p>
                )}
              </div>
            </div>
          )}

          {tab === 'tasks' && (
            <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">Project Tasks</h2>
                <Link href={`/admin/projects/${project.id}/new-task`}>
                  <Button variant="lilac" className="h-8 text-xs px-3"><Plus size={14} /> Create Task</Button>
                </Link>
              </div>
              {project.tasks.length > 0 ? (
                <div className="space-y-3">
                  {project.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border border-[var(--color-silver)] rounded-lg hover:border-[var(--color-obsidian)] transition-colors">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{task.title}</p>
                        <p className="text-[12px] text-[var(--color-slate)] font-switzer mt-1">
                          Assignee: {task.assignedTo?.name || 'Unassigned'} • Due: {task.dueDate ? format(new Date(task.dueDate), 'dd MMM') : 'N/A'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={task.priority} variant={task.priority === 'HIGH' ? 'error' : 'info'} />
                        <StatusBadge status={task.status.replace('_', ' ')} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-[var(--color-slate)] font-switzer">No tasks created yet.</p>
              )}
            </div>
          )}

          {tab === 'updates' && (
            <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">Status Updates</h2>
                <Button variant="outline" className="h-8 text-xs px-3"><Plus size={14} /> Post Update</Button>
              </div>
              <p className="text-[13px] text-[var(--color-slate)] font-switzer">Updates will appear here.</p>
            </div>
          )}

          {tab === 'documents' && (
            <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">Project Documents</h2>
                <Button variant="outline" className="h-8 text-xs px-3"><Plus size={14} /> Upload Document</Button>
              </div>
              <p className="text-[13px] text-[var(--color-slate)] font-switzer">Uploaded documents will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
