import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTeacherByUserId, getAllStudents } from '@/lib/db';
import TeacherDashboardClient from './TeacherDashboardClient';

export default async function TeacherDashboard() {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('mock_session')?.value;
  if (!sessionData) redirect('/login');
  
  const session = JSON.parse(sessionData);
  const teacher = await getTeacherByUserId(session.id);
  
  if (!teacher) {
    return <div className="p-8">Teacher profile not found.</div>;
  }

  const allStudents = await getAllStudents();
  // Ensure roster exists on teacher
  const rosterIds = teacher.roster || [];
  const students = allStudents.filter((s: any) => rosterIds.includes(s.id));

  return (
    <TeacherDashboardClient 
      teacher={teacher} 
      students={students} 
    />
  );
}
