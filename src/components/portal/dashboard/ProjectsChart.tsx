'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectsChartProps {
  data: {
    name: string;
    completed: number;
    inProgress: number;
  }[];
}

export function ProjectsChart({ data }: ProjectsChartProps) {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-silver)" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--color-slate)', fontFamily: 'var(--font-switzer)' }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--color-slate)', fontFamily: 'var(--font-switzer)' }}
          />
          <Tooltip 
            cursor={{ fill: 'var(--color-bone)' }}
            contentStyle={{ 
              borderRadius: '8px', 
              border: '0.5px solid var(--color-silver)',
              backgroundColor: 'var(--color-paper)',
              fontFamily: 'var(--font-switzer)',
              fontSize: '13px',
              color: 'var(--color-obsidian)',
              boxShadow: 'var(--shadow-control)'
            }}
          />
          <Bar dataKey="inProgress" name="In Progress" fill="var(--color-obsidian)" radius={[4, 4, 0, 0]} barSize={24} />
          <Bar dataKey="completed" name="Completed" fill="var(--color-lilac-bloom)" radius={[4, 4, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
