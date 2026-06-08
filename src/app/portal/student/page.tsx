'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStudentByUserId } from '@/lib/clientDb';
import StudentDashboardClient from './StudentDashboardClient';

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
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
        const data = await getStudentByUserId(session.id);
        setStudent(data);
      } catch (err) {
        console.error('Failed to load student dashboard data:', err);
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

  if (!student) {
    return <div className="p-8 text-center text-red-500 font-medium">Student profile not found.</div>;
  }

  return (
    <StudentDashboardClient student={student} />
  );
}
