'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTeacherByUserId, getAllStudents } from '@/lib/clientDb';
import TeacherDashboardClient from './TeacherDashboardClient';

export default function TeacherDashboard() {
  const router = useRouter();
  const [data, setData] = useState<{ teacher: any; students: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const sessionData = localStorage.getItem('ibt_mock_session');
      if (!sessionData) {
        router.push('/login');
        return;
      }
      
      try {
        const session = JSON.parse(sessionData);
        const teacher = await getTeacherByUserId(session.id);
        
        if (!teacher) {
          setData(null);
          setLoading(false);
          return;
        }

        const allStudents = await getAllStudents();
        const rosterIds = teacher.roster || [];
        const students = allStudents.filter((s: any) => rosterIds.includes(s.id));
        
        setData({ teacher, students });
      } catch (err) {
        console.error('Failed to load teacher dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-slate-500 font-medium animate-pulse">Loading dashboard data...</p>
      </div>
    );
  }

  if (!data || !data.teacher) {
    return <div className="p-8 text-center text-red-500 font-medium">Teacher profile not found.</div>;
  }

  return (
    <TeacherDashboardClient 
      teacher={data.teacher} 
      students={data.students} 
    />
  );
}
