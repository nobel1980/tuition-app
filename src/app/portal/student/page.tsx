import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getStudentByUserId } from '@/lib/db';
import StudentDashboardClient from './StudentDashboardClient';

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('mock_session')?.value;
  if (!sessionData) redirect('/login');
  
  const session = JSON.parse(sessionData);
  const student = await getStudentByUserId(session.id);
  
  if (!student) {
    return <div className="p-8">Student profile not found.</div>;
  }

  return (
    <StudentDashboardClient student={student} />
  );
}
