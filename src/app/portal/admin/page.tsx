'use client';

import { useEffect, useState } from 'react';
import { getStats, getAllUsers, getAllStudents, getClasses } from '@/lib/clientDb';
import AdminDashboardClient from './AdminDashboardClient';

export default function AdminDashboard() {
  const [data, setData] = useState<{
    stats: any;
    users: any[];
    students: any[];
    classes: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [stats, users, students, classes] = await Promise.all([
          getStats(),
          getAllUsers(),
          getAllStudents(),
          getClasses(),
        ]);
        setData({ stats, users, students, classes });
      } catch (err) {
        console.error('Failed to load admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-slate-500 font-medium animate-pulse">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <AdminDashboardClient 
      initialStats={data.stats} 
      initialUsers={data.users} 
      initialStudents={data.students}
      initialClasses={data.classes}
    />
  );
}
