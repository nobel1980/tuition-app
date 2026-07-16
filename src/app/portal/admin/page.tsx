'use client';

import { useEffect, useState, Suspense } from 'react';
import { 
  getStats, getAllUsers, getAllStudents, getClasses,
  getCourses, getSubjects, getFaqs, getReviews, getServices, getSettings, getTeachers 
} from '@/lib/clientDb';
import AdminDashboardClient from './AdminDashboardClient';

export default function AdminDashboard() {
  const [data, setData] = useState<{
    stats: any;
    users: any[];
    students: any[];
    classes: any[];
    courses: any[];
    subjects: any[];
    faqs: any[];
    reviews: any[];
    services: any[];
    settings: any;
    teachers: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [stats, users, students, classes, courses, subjects, faqs, reviews, services, settings, teachers] = await Promise.all([
          getStats(),
          getAllUsers(),
          getAllStudents(),
          getClasses(),
          getCourses().catch(() => []),
          getSubjects().catch(() => []),
          getFaqs().catch(() => []),
          getReviews().catch(() => []),
          getServices().catch(() => []),
          getSettings().catch(() => ({})),
          getTeachers().catch(() => []),
        ]);
        setData({ stats, users, students, classes, courses, subjects, faqs, reviews, services, settings, teachers });
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
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <p className="text-slate-500 font-medium animate-pulse">Loading dashboard client...</p>
      </div>
    }>
      <AdminDashboardClient 
        initialStats={data.stats} 
        initialUsers={data.users} 
        initialStudents={data.students}
        initialClasses={data.classes}
        initialCourses={data.courses}
        initialSubjects={data.subjects}
        initialFaqs={data.faqs}
        initialReviews={data.reviews}
        initialServices={data.services}
        initialSettings={data.settings}
        initialTeachers={data.teachers}
      />
    </Suspense>
  );
}
