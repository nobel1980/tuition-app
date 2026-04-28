import { getStats, getAllUsers, getAllStudents, getClasses } from '@/lib/db';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
  const stats = await getStats();
  const users = await getAllUsers();
  const students = await getAllStudents();
  const classes = await getClasses();

  return (
    <AdminDashboardClient 
      initialStats={stats} 
      initialUsers={users} 
      initialStudents={students}
      initialClasses={classes}
    />
  );
}
