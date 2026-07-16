'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, BookOpen, TrendingUp, Search, Plus, Trash2, 
  GraduationCap, DollarSign, LayoutDashboard, Lock, Mail, 
  User, Clock, HelpCircle, MessageSquare, Award, Book, 
  Shield, Tag, Globe, FileText, CheckCircle2, ChevronRight, List, Settings,
  Eye, EyeOff, Pencil, X, Check
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  createUser, deleteUser, 
  createClass, deleteClass, 
  updateStudent, getAllUsers, 
  getClasses, getAllStudents,
  getCourses, createCourse, deleteCourse, updateCourse,
  getSubjects, createSubject, deleteSubject, updateSubject,
  getFaqs, createFaq, deleteFaq, updateFaq,
  getReviews, createReview, deleteReview, updateReview,
  getServices, createService, deleteService, updateService,
  getTeachers, createTeacher, deleteTeacher, updateTeacher,
  updateSettings
} from '@/lib/clientDb';

export default function AdminDashboardClient({ 
  initialStats, initialUsers, initialStudents, initialClasses,
  initialCourses, initialSubjects, initialFaqs, initialReviews, initialServices,
  initialSettings, initialTeachers
}: any) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') || 'overview';
  const [currentTab, setCurrentTab] = useState(tabParam);

  useEffect(() => {
    if (tabParam) {
      setCurrentTab(tabParam);
    }
  }, [tabParam]);

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(initialUsers || []);
  const [students, setStudents] = useState(initialStudents || []);
  const [classes, setClasses] = useState(initialClasses || []);
  const [courses, setCourses] = useState(initialCourses || []);
  const [subjects, setSubjects] = useState(initialSubjects || []);
  const [faqs, setFaqs] = useState(initialFaqs || []);
  const [reviews, setReviews] = useState(initialReviews || []);
  const [services, setServices] = useState(initialServices || []);
  const [teachers, setTeachers] = useState(initialTeachers || []);
  const [settingsData, setSettingsData] = useState(initialSettings?.site_settings || {});
  
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      maths: 'bg-blue-50 text-blue-700 border-blue-100',
      english: 'bg-amber-50 text-amber-700 border-amber-100',
      biology: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      chemistry: 'bg-teal-50 text-teal-700 border-teal-100',
      physics: 'bg-violet-50 text-violet-700 border-violet-100',
      science: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      verbal: 'bg-rose-50 text-rose-700 border-rose-100',
      'non-verbal': 'bg-pink-50 text-pink-700 border-pink-100',
    };
    return colors[subject.toLowerCase()] || 'bg-slate-50 text-slate-700 border-slate-100';
  };

  const filteredUsers = users.filter((u: any) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStudents = students.filter((s: any) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCourses = courses.filter((c: any) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSubjects = subjects.filter((s: any) =>
    s.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFaqs = faqs.filter((f: any) =>
    f.question?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredReviews = reviews.filter((r: any) =>
    r.author_name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredServices = services.filter((s: any) =>
    s.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTeachers = teachers.filter((t: any) =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.role?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleAddUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;
    
    await createUser({ name, email, password, role });
    
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
    e.currentTarget.reset();
    setActiveModal(null);
  }

  async function handleDeleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    }
  }

  async function handleAddClass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = formData.get('subject') as string;
    const teacherId = formData.get('teacherId') as string;
    const time = formData.get('time') as string;

    await createClass({ subject, teacherId, students: [], time });
    
    const updatedClasses = await getClasses();
    setClasses(updatedClasses);
    e.currentTarget.reset();
    setActiveModal(null);
  }

  async function handleDeleteClass(id: string) {
    if (confirm('Are you sure you want to delete this class?')) {
      await deleteClass(id);
      const updatedClasses = await getClasses();
      setClasses(updatedClasses);
    }
  }

  async function handleUpdateFeeStatus(e: React.FormEvent<HTMLFormElement>, studentId: string) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const feeStatus = formData.get('feeStatus') as string;
    
    await updateStudent(studentId, { feeStatus });
    
    const updatedStudents = await getAllStudents();
    setStudents(updatedStudents);
  }

  async function handleCourseFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const subjectsStr = formData.get('subjects') as string;
    const subjectsArr = subjectsStr.split(',').map(s => s.trim()).filter(s => s !== '');
    const teacherIds = formData.getAll('teacher_ids').map(id => parseInt(id as string));

    const payload = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      seoTitle: formData.get('seoTitle') as string || null,
      seoDescription: formData.get('seoDescription') as string || null,
      ageRange: formData.get('ageRange') as string || null,
      startingPrice: formData.get('startingPrice') as string || null,
      rating: parseInt(formData.get('rating') as string) || 5,
      image: editingCourse?.image || '/images/courses/primary.jpg',
      ogImage: editingCourse?.ogImage || '/images/og-main.jpg',
      bannerImage: editingCourse?.bannerImage || '/images/bg/banner-bg-5.jpg',
      overview: formData.get('overview') as string || null,
      subjects: subjectsArr,
      description: formData.get('description') as string || null,
      fees: {
        group: formData.get('feeGroup') as string || "£7.99/hour",
        oneToOne: formData.get('feeOneToOne') as string || "£25/hour"
      },
      teacher_ids: teacherIds
    };

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, payload);
        setEditingCourse(null);
        alert("Course updated successfully!");
      } else {
        await createCourse({ ...payload, status: 'draft' });
        alert("Course created successfully!");
      }
      const updated = await getCourses();
      setCourses(updated);
      e.currentTarget.reset();
      setActiveModal(null);
    } catch (err: any) {
      alert("Error saving course: " + err.message);
    }
  }

  async function handleDeleteCourse(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      await deleteCourse(id);
      const updated = await getCourses();
      setCourses(updated);
    }
  }

  async function handleToggleCourseStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await updateCourse(id, { status: nextStatus });
    const updated = await getCourses();
    setCourses(updated);
  }

  async function handleAddSubject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get('title') as string,
      keyStages: formData.get('keyStages') as string || null,
      icon: formData.get('icon') as string || 'book-open',
      image: formData.get('image') as string || '/images/service/2.jpg',
      description: formData.get('description') as string || null,
      status: 'draft'
    };

    try {
      await createSubject(payload);
      const updated = await getSubjects();
      setSubjects(updated);
      e.currentTarget.reset();
      setActiveModal(null);
    } catch (err: any) {
      alert("Error adding subject: " + err.message);
    }
  }

  async function handleDeleteSubject(id: string) {
    if (confirm('Are you sure you want to delete this subject?')) {
      await deleteSubject(id);
      const updated = await getSubjects();
      setSubjects(updated);
    }
  }

  async function handleToggleSubjectStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await updateSubject(id, { status: nextStatus });
    const updated = await getSubjects();
    setSubjects(updated);
  }

  async function handleAddFaq(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      status: 'draft'
    };

    try {
      await createFaq(payload);
      const updated = await getFaqs();
      setFaqs(updated);
      e.currentTarget.reset();
      setActiveModal(null);
    } catch (err: any) {
      alert("Error adding FAQ: " + err.message);
    }
  }

  async function handleDeleteFaq(id: string) {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      await deleteFaq(id);
      const updated = await getFaqs();
      setFaqs(updated);
    }
  }

  async function handleToggleFaqStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await updateFaq(id, { status: nextStatus });
    const updated = await getFaqs();
    setFaqs(updated);
  }

  async function handleAddReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      author_name: formData.get('author_name') as string,
      rating: parseInt(formData.get('rating') as string) || 5,
      text: formData.get('text') as string,
      profile_photo_url: formData.get('profile_photo_url') as string || '/images/icons/avatar-1.png',
      status: 'draft'
    };

    try {
      await createReview(payload);
      const updated = await getReviews();
      setReviews(updated);
      e.currentTarget.reset();
      setActiveModal(null);
    } catch (err: any) {
      alert("Error adding review: " + err.message);
    }
  }

  async function handleDeleteReview(id: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      await deleteReview(id);
      const updated = await getReviews();
      setReviews(updated);
    }
  }

  async function handleToggleReviewStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await updateReview(id, { status: nextStatus });
    const updated = await getReviews();
    setReviews(updated);
  }

  async function handleAddService(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string || 'Award',
      link: formData.get('link') as string || '/courses',
      status: 'draft'
    };

    try {
      await createService(payload);
      const updated = await getServices();
      setServices(updated);
      e.currentTarget.reset();
      setActiveModal(null);
    } catch (err: any) {
      alert("Error adding service: " + err.message);
    }
  }

  async function handleDeleteService(id: string) {
    if (confirm('Are you sure you want to delete this service highlight?')) {
      await deleteService(id);
      const updated = await getServices();
      setServices(updated);
    }
  }

  async function handleToggleServiceStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await updateService(id, { status: nextStatus });
    const updated = await getServices();
    setServices(updated);
  }

  async function handleTeacherFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const subjectsStr = formData.get('subjects') as string;
    const subjectsArr = subjectsStr.split(',').map(s => s.trim()).filter(s => s !== '');

    const payload = {
      name: formData.get('name') as string,
      role: formData.get('role') as string || null,
      bio: formData.get('bio') as string || null,
      subjects: subjectsArr,
      image: formData.get('image') as string || '/images/team/maruf.jpg',
    };

    try {
      if (editingTeacher) {
        await updateTeacher(editingTeacher.id, payload);
        setEditingTeacher(null);
        alert("Teacher updated successfully!");
      } else {
        await createTeacher({ ...payload, status: 'draft' });
        alert("Teacher created successfully!");
      }
      const updated = await getTeachers();
      setTeachers(updated);
      e.currentTarget.reset();
      setActiveModal(null);
    } catch (err: any) {
      alert("Error saving teacher: " + err.message);
    }
  }

  async function handleDeleteTeacher(id: string) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      await deleteTeacher(id);
      const updated = await getTeachers();
      setTeachers(updated);
    }
  }

  async function handleToggleTeacherStatus(id: string, currentStatus: string) {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await updateTeacher(id, { status: nextStatus });
    const updated = await getTeachers();
    setTeachers(updated);
  }

  async function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newSettings = {
      ...settingsData,
      name: formData.get('name') as string,
      companyName: formData.get('companyName') as string,
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string,
      contact: {
        ...settingsData.contact,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        address: {
          ...settingsData.contact?.address,
          street: formData.get('street') as string,
          locality: formData.get('locality') as string,
          city: formData.get('city') as string,
          postcode: formData.get('postcode') as string,
        }
      },
      hours: {
        ...settingsData.hours,
        display: formData.get('hoursDisplay') as string,
        opens: formData.get('opens') as string,
        closes: formData.get('closes') as string,
      },
      socials: {
        ...settingsData.socials,
        twitter: formData.get('twitter') as string,
        facebook: formData.get('facebook') as string,
      },
      seo: {
        ...settingsData.seo,
        keywords: (formData.get('seoKeywords') as string || "").split(',').map((k: string) => k.trim()).filter((k: string) => k !== ''),
        googleVerification: formData.get('googleVerification') as string,
      }
    };

    try {
      await updateSettings('site_settings', newSettings);
      alert('Settings saved successfully!');
      setSettingsData(newSettings);
    } catch (err: any) {
      alert('Error updating settings: ' + err.message);
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Admin Dashboard</h2>
          <p className="text-sm text-slate-500">Monitor internals, update marketing pages, and manage settings.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search records dynamically..."
            className="pl-9 h-11 bg-white border-slate-200 rounded-xl shadow-sm focus:border-blue-500 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        {/* Separated visual menu groups */}
        <div className="flex flex-col gap-4 p-2 bg-slate-100/60 border border-slate-200/50 rounded-2xl md:flex-row md:items-center justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 flex items-center gap-1.5"><Shield size={12} /> Internal Operations</span>
            <TabsList className="flex flex-wrap gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-200/50">
              <TabsTrigger value="overview" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-blue-900 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="users" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-blue-900 data-[state=active]:text-white">Users</TabsTrigger>
              <TabsTrigger value="students" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-blue-900 data-[state=active]:text-white">Students & Fees</TabsTrigger>
              <TabsTrigger value="classes" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-blue-900 data-[state=active]:text-white">Classes</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 flex items-center gap-1.5"><Globe size={12} /> Marketing & Content</span>
            <TabsList className="flex flex-wrap gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-200/50">
              <TabsTrigger value="courses" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white">Courses</TabsTrigger>
              <TabsTrigger value="subjects" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white">Subjects</TabsTrigger>
              <TabsTrigger value="faqs" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white">FAQs</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white">Reviews</TabsTrigger>
              <TabsTrigger value="services" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white">Services</TabsTrigger>
              <TabsTrigger value="teachers" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white">Teachers</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-lg text-xs font-bold transition-all data-[state=active]:bg-orange-500 data-[state=active]:text-white">Settings</TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        {/* --- Overview Tab --- */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Revenue card */}
            <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-br from-white to-emerald-50/10 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">£{initialStats?.totalRevenue?.toLocaleString()}</h3>
                  </div>
                  <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-xs text-emerald-600 font-bold mt-4 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100">+20.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            {/* Students card */}
            <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50/10 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Students</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">{initialStats?.totalStudents}</h3>
                  </div>
                  <div className="p-3 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-xs text-blue-600 font-bold mt-4 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-blue-100">+12</span> new students this month
                </p>
              </CardContent>
            </Card>

            {/* Classes card */}
            <Card className="border-l-4 border-l-violet-500 bg-gradient-to-br from-white to-violet-50/10 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Classes</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">{classes?.length}</h3>
                  </div>
                  <div className="p-3 bg-violet-500 text-white rounded-xl shadow-lg shadow-violet-500/20">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 font-semibold">
                  Live scheduled tutoring courses
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border border-slate-100 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-2"><TrendingUp className="text-blue-900" size={20} /> Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue overview for the current academic session.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[320px] w-full relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={initialStats?.revenueData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`} />
                    <Tooltip 
                      contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" dot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Users Tab --- */}
        <TabsContent value="users" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><Users size={18} className="text-blue-900" /> Portal Accounts</CardTitle>
                <CardDescription>Manage active registered users and permissions.</CardDescription>
              </div>
              <Button onClick={() => setActiveModal('user')} size="sm" className="bg-blue-900 hover:bg-blue-800 rounded-xl font-bold flex items-center gap-1">
                <Plus size={16} /> Add User
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Name</TableHead>
                      <TableHead className="font-bold text-xs">Email</TableHead>
                      <TableHead className="font-bold text-xs">Role</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user: any) => (
                      <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-semibold text-slate-800">{user.name}</TableCell>
                        <TableCell className="text-slate-600 text-sm">{user.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.role === 'admin' ? 'default' : user.role === 'teacher' ? 'secondary' : 'outline'} 
                            className={`capitalize text-xs font-semibold px-2 py-0.5 rounded-md ${
                              user.role === 'admin' ? 'bg-red-50 text-red-700 border border-red-100 hover:bg-red-50' : 
                              user.role === 'teacher' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-50' : 
                              'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-50'
                            }`}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <Button 
                            onClick={() => handleDeleteUser(user.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg h-9 w-9 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Students & Fees Tab --- */}
        <TabsContent value="students" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><DollarSign size={18} className="text-blue-900" /> Student Fee Management</CardTitle>
              <CardDescription>Track monthly tuition fee payment statuses.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Name</TableHead>
                      <TableHead className="font-bold text-xs">Academic Level</TableHead>
                      <TableHead className="font-bold text-xs">Payment Status</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Update Fee Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student: any) => (
                      <TableRow key={student.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-semibold text-slate-800">{student.name}</TableCell>
                        <TableCell className="text-slate-600 text-sm font-medium">{student.level}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold border ${
                              student.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                              student.feeStatus === 'Unpaid' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                              'bg-red-50 text-red-700 border-red-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${
                              student.feeStatus === 'Paid' ? 'bg-emerald-500' :
                              student.feeStatus === 'Unpaid' ? 'bg-amber-500' :
                              'bg-red-500'
                            }`} />
                            {student.feeStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <form onSubmit={(e) => handleUpdateFeeStatus(e, student.id)} className="flex justify-end gap-2">
                            <select 
                              name="feeStatus" 
                              defaultValue={student.feeStatus} 
                              className="border border-slate-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                            >
                              <option value="Paid">Paid</option>
                              <option value="Unpaid">Unpaid</option>
                              <option value="Overdue">Overdue</option>
                            </select>
                            <Button type="submit" size="sm" variant="outline" className="h-7 text-xs font-bold px-3 border-blue-900 text-blue-900 hover:bg-blue-50 rounded-md">Save</Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Classes Tab --- */}
        <TabsContent value="classes" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><BookOpen size={18} className="text-blue-900" /> Active Roster Sessions</CardTitle>
                <CardDescription>Manage structured classes and assignment rosters.</CardDescription>
              </div>
              <Button onClick={() => setActiveModal('class')} size="sm" className="bg-blue-900 hover:bg-blue-800 rounded-xl font-bold flex items-center gap-1">
                <Plus size={16} /> Deploy Class
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Subject / Grade</TableHead>
                      <TableHead className="font-bold text-xs">Instructor ID</TableHead>
                      <TableHead className="font-bold text-xs">Time Schedule</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes?.map((cls: any) => (
                      <TableRow key={cls.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-semibold text-slate-800">{cls.subject}</TableCell>
                        <TableCell className="text-slate-600 font-mono text-xs">ID #{cls.teacherId}</TableCell>
                        <TableCell className="text-slate-600 text-sm font-semibold">{cls.time}</TableCell>
                        <TableCell className="text-right px-6">
                          <Button 
                            onClick={() => handleDeleteClass(cls.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg h-9 w-9 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Courses Tab --- */}
        <TabsContent value="courses" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><Book size={18} className="text-orange-500" /> Active Marketing Courses</CardTitle>
                <CardDescription>Manage dynamically seeded course categories displayed on the public pages.</CardDescription>
              </div>
              <Button onClick={() => { setEditingCourse(null); setActiveModal('course'); }} size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl font-bold flex items-center gap-1">
                <Plus size={16} /> Add Course
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Title</TableHead>
                      <TableHead className="font-bold text-xs">URL Path</TableHead>
                      <TableHead className="font-bold text-xs">Age Range</TableHead>
                      <TableHead className="font-bold text-xs">Starting Fee</TableHead>
                      <TableHead className="font-bold text-xs">Assigned Tutors</TableHead>
                      <TableHead className="font-bold text-xs">Status</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((c: any) => (
                      <TableRow key={c.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-black text-slate-800">{c.title}</TableCell>
                        <TableCell className="text-slate-500 font-mono text-xs">/courses/{c.slug}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-md border-slate-200 bg-slate-50 text-slate-600 text-xs px-2 py-0.5">{c.ageRange}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-sm text-slate-800">{c.startingPrice}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {c.teachers?.map((t: any) => (
                              <span key={t.id} className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                                {t.name}
                              </span>
                            )) || <span className="text-xs text-slate-400">None</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold border ${
                              c.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${
                              c.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`} />
                            {c.status || 'draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6 flex justify-end gap-1.5">
                          <Button 
                            onClick={() => handleToggleCourseStatus(c.id, c.status)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg h-9 w-9 p-0"
                            title={c.status === 'published' ? 'Unpublish course' : 'Publish course'}
                          >
                            {c.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            onClick={() => { setEditingCourse(c); setActiveModal('course'); }} 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg h-9 w-9 p-0"
                            title="Edit course"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleDeleteCourse(c.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg h-9 w-9 p-0"
                            title="Delete course"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Subjects Tab --- */}
        <TabsContent value="subjects" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><GraduationCap size={18} className="text-orange-500" /> Active Subjects List</CardTitle>
                <CardDescription>Manage dynamic marketing subjects grid entries shown on the home page.</CardDescription>
              </div>
              <Button onClick={() => setActiveModal('subject')} size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl font-bold flex items-center gap-1">
                <Plus size={16} /> Add Subject
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Icon</TableHead>
                      <TableHead className="font-bold text-xs">Subject / Program</TableHead>
                      <TableHead className="font-bold text-xs">Key Stages</TableHead>
                      <TableHead className="font-bold text-xs">Description Summary</TableHead>
                      <TableHead className="font-bold text-xs">Status</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubjects.map((s: any) => (
                      <TableRow key={s.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-mono text-xs text-slate-500 font-semibold">{s.icon}</TableCell>
                        <TableCell className="font-black text-slate-800">{s.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-md border-orange-100 bg-orange-50/40 text-orange-600 text-xs px-2 py-0.5 font-bold">{s.keyStages}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-500 text-xs max-w-xs truncate">{s.description}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold border ${
                              s.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${
                              s.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`} />
                            {s.status || 'draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6 flex justify-end gap-1.5">
                          <Button 
                            onClick={() => handleToggleSubjectStatus(s.id, s.status)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg h-9 w-9 p-0"
                          >
                            {s.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            onClick={() => handleDeleteSubject(s.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg h-9 w-9 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- FAQs Tab --- */}
        <TabsContent value="faqs" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><HelpCircle size={18} className="text-orange-500" /> Active FAQs List</CardTitle>
                <CardDescription>Manage dynamic frontend accordion dropdown items displayed on the public home page.</CardDescription>
              </div>
              <Button onClick={() => setActiveModal('faq')} size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl font-bold flex items-center gap-1">
                <Plus size={16} /> Add FAQ
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Question Prompt</TableHead>
                      <TableHead className="font-bold text-xs">Answer Text</TableHead>
                      <TableHead className="font-bold text-xs">Status</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaqs.map((f: any) => (
                      <TableRow key={f.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-black text-slate-800 max-w-xs">{f.question}</TableCell>
                        <TableCell className="text-slate-500 text-xs max-w-sm truncate">{f.answer}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold border ${
                              f.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${
                              f.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`} />
                            {f.status || 'draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6 flex justify-end gap-1.5">
                          <Button 
                            onClick={() => handleToggleFaqStatus(f.id, f.status)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg h-9 w-9 p-0"
                          >
                            {f.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            onClick={() => handleDeleteFaq(f.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg h-9 w-9 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Reviews Tab --- */}
        <TabsContent value="reviews" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><MessageSquare size={18} className="text-orange-500" /> Dynamic Testimonials List</CardTitle>
                <CardDescription>Manage active parent/student testimonials displayed on the home page slider.</CardDescription>
              </div>
              <Button onClick={() => setActiveModal('review')} size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl font-bold flex items-center gap-1">
                <Plus size={16} /> Add Testimonial
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Author</TableHead>
                      <TableHead className="font-bold text-xs">Rating</TableHead>
                      <TableHead className="font-bold text-xs">Review text</TableHead>
                      <TableHead className="font-bold text-xs">Status</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((r: any) => (
                      <TableRow key={r.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-black text-slate-800">{r.author_name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-md border-amber-100 bg-amber-50 text-amber-600 text-xs px-2.5 py-0.5 font-bold flex items-center w-fit gap-1">
                            <StarIcon /> {r.rating} / 5
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500 text-xs max-w-sm truncate italic">"{r.text}"</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold border ${
                              r.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${
                              r.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`} />
                            {r.status || 'draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6 flex justify-end gap-1.5">
                          <Button 
                            onClick={() => handleToggleReviewStatus(r.id, r.status)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg h-9 w-9 p-0"
                          >
                            {r.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            onClick={() => handleDeleteReview(r.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg h-9 w-9 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Services Tab --- */}
        <TabsContent value="services" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><Award size={18} className="text-orange-500" /> Active Services Grid</CardTitle>
                <CardDescription>Manage dynamic marketing service grid points displayed on the homepage.</CardDescription>
              </div>
              <Button onClick={() => setActiveModal('service')} size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl font-bold flex items-center gap-1">
                <Plus size={16} /> Add Service
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Icon</TableHead>
                      <TableHead className="font-bold text-xs">Highlight Point</TableHead>
                      <TableHead className="font-bold text-xs">Description Context</TableHead>
                      <TableHead className="font-bold text-xs">Redirect Link</TableHead>
                      <TableHead className="font-bold text-xs">Status</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map((s: any) => (
                      <TableRow key={s.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-mono text-xs text-slate-500 font-semibold">{s.icon}</TableCell>
                        <TableCell className="font-black text-slate-800">{s.title}</TableCell>
                        <TableCell className="text-slate-500 text-xs max-w-xs truncate">{s.description}</TableCell>
                        <TableCell className="text-slate-500 text-xs font-mono">{s.link}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold border ${
                              s.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${
                              s.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`} />
                            {s.status || 'draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6 flex justify-end gap-1.5">
                          <Button 
                            onClick={() => handleToggleServiceStatus(s.id, s.status)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg h-9 w-9 p-0"
                          >
                            {s.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            onClick={() => handleDeleteService(s.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg h-9 w-9 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Teachers Tab --- */}
        <TabsContent value="teachers" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><GraduationCap size={18} className="text-orange-500" /> Active Teachers List</CardTitle>
                <CardDescription>Manage dynamic team members displayed on the public courses & About pages.</CardDescription>
              </div>
              <Button onClick={() => { setEditingTeacher(null); setActiveModal('teacher'); }} size="sm" className="bg-orange-500 hover:bg-orange-600 rounded-xl font-bold flex items-center gap-1">
                <Plus size={16} /> Add Teacher
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="font-bold text-xs">Name</TableHead>
                      <TableHead className="font-bold text-xs">Role</TableHead>
                      <TableHead className="font-bold text-xs">Subject Tags</TableHead>
                      <TableHead className="font-bold text-xs">Assigned Courses</TableHead>
                      <TableHead className="font-bold text-xs">Status</TableHead>
                      <TableHead className="text-right font-bold text-xs px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((t: any) => (
                      <TableRow key={t.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-black text-slate-800">{t.name}</TableCell>
                        <TableCell className="text-xs text-slate-500 font-semibold">{t.role}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {t.subjects?.map((subj: string) => (
                              <Badge 
                                key={subj} 
                                variant="outline" 
                                className={`rounded-md px-2 py-0.5 text-[10px] font-bold border capitalize ${getSubjectColor(subj)}`}
                              >
                                {subj}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {t.courses?.map((course: any) => (
                              <Badge 
                                key={course.id} 
                                variant="outline" 
                                className="rounded-md border-slate-200 text-slate-600 bg-slate-50 text-[10px] font-medium"
                              >
                                {course.title}
                              </Badge>
                            )) || <span className="text-xs text-slate-400">None</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`rounded-md px-2.5 py-0.5 text-xs font-bold border ${
                              t.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${
                              t.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`} />
                            {t.status || 'draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-6 flex justify-end gap-1.5">
                          <Button 
                            onClick={() => handleToggleTeacherStatus(t.id, t.status)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg h-9 w-9 p-0"
                            title={t.status === 'published' ? 'Unpublish profile' : 'Publish profile'}
                          >
                            {t.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button 
                            onClick={() => { setEditingTeacher(t); setActiveModal('teacher'); }} 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg h-9 w-9 p-0"
                            title="Edit profile"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleDeleteTeacher(t.id)} 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg h-9 w-9 p-0"
                            title="Delete profile"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Settings Tab --- */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="shadow-sm border border-slate-100 rounded-2xl">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-md font-bold text-slate-800 flex items-center gap-1.5"><Settings size={18} className="text-orange-500" /> Site Configurations & Settings</CardTitle>
              <CardDescription>Manage main branding, contact info, operational hours, and metadata.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Branding & SEO */}
                  <div className="space-y-4 border border-slate-200/50 p-5 rounded-2xl bg-slate-50/50">
                    <h3 className="font-black text-sm text-slate-800 border-b pb-2 flex items-center gap-1.5"><Globe size={16} className="text-blue-900" /> Identity & SEO</h3>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Site Branding Name</label>
                      <Input name="name" defaultValue={settingsData?.name || ""} required className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Registered Company Name</label>
                      <Input name="companyName" defaultValue={settingsData?.companyName || ""} required className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Site Tagline</label>
                      <Input name="tagline" defaultValue={settingsData?.tagline || ""} className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Site Description</label>
                      <Textarea name="description" defaultValue={settingsData?.description || ""} className="border-slate-200 text-sm h-24" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">SEO Keywords (comma-separated)</label>
                      <Input name="seoKeywords" defaultValue={settingsData?.seo?.keywords?.join(', ') || ""} className="h-11 border-slate-200 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Google site verification key</label>
                      <Input name="googleVerification" defaultValue={settingsData?.seo?.googleVerification || ""} className="h-11 border-slate-200 text-xs font-mono" />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4 border border-slate-200/50 p-5 rounded-2xl bg-slate-50/50">
                    <h3 className="font-black text-sm text-slate-800 border-b pb-2 flex items-center gap-1.5"><Users size={16} className="text-blue-900" /> Contact Details</h3>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Phone</label>
                      <Input name="phone" defaultValue={settingsData?.contact?.phone || ""} required className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Email Address</label>
                      <Input name="email" defaultValue={settingsData?.contact?.email || ""} required className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Street Address</label>
                      <Input name="street" defaultValue={settingsData?.contact?.address?.street || ""} className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Locality</label>
                      <Input name="locality" defaultValue={settingsData?.contact?.address?.locality || ""} className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">City</label>
                      <Input name="city" defaultValue={settingsData?.contact?.address?.city || ""} className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Postcode</label>
                      <Input name="postcode" defaultValue={settingsData?.contact?.address?.postcode || ""} className="h-11 border-slate-200" />
                    </div>
                  </div>

                  {/* Operation & Socials */}
                  <div className="space-y-4 border border-slate-200/50 p-5 rounded-2xl bg-slate-50/50">
                    <h3 className="font-black text-sm text-slate-800 border-b pb-2 flex items-center gap-1.5"><Clock size={16} className="text-blue-900" /> Hours & Social Links</h3>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Hours Display Text</label>
                      <Input name="hoursDisplay" defaultValue={settingsData?.hours?.display || ""} className="h-11 border-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Opens At</label>
                      <Input name="opens" defaultValue={settingsData?.hours?.opens || ""} className="h-11 border-slate-200 text-xs font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Closes At</label>
                      <Input name="closes" defaultValue={settingsData?.hours?.closes || ""} className="h-11 border-slate-200 text-xs font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Twitter URL</label>
                      <Input name="twitter" defaultValue={settingsData?.socials?.twitter || ""} className="h-11 border-slate-200 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Facebook URL</label>
                      <Input name="facebook" defaultValue={settingsData?.socials?.facebook || ""} className="h-11 border-slate-200 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <Button type="submit" className="h-11 px-8 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold"><CheckCircle2 size={16} className="mr-1.5" /> Save Configurations</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* Unified CRUD Management Dialog Modal */}
      <Dialog open={activeModal !== null} onOpenChange={(open) => { if (!open) { setActiveModal(null); setEditingCourse(null); setEditingTeacher(null); } }}>
        <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-white shadow-xl border border-slate-200">
          <DialogHeader className="pb-4 border-b border-slate-100 mb-4">
            <DialogTitle className="text-lg font-black text-slate-900 flex items-center gap-1.5">
              {activeModal === 'user' && <><Plus size={20} className="text-blue-900" /> Add New User</>}
              {activeModal === 'class' && <><Plus size={20} className="text-blue-900" /> Create Class Session</>}
              {activeModal === 'course' && (editingCourse ? <><Pencil size={20} className="text-orange-500" /> Edit Course Page</> : <><Plus size={20} className="text-orange-500" /> Create Course Page</>)}
              {activeModal === 'subject' && <><Plus size={20} className="text-orange-500" /> Add Subject Highlight</>}
              {activeModal === 'faq' && <><Plus size={20} className="text-orange-500" /> Create FAQ Accordion</>}
              {activeModal === 'review' && <><Plus size={20} className="text-orange-500" /> Create Review Testimonial</>}
              {activeModal === 'service' && <><Plus size={20} className="text-orange-500" /> Add Service Highlight</>}
              {activeModal === 'teacher' && (editingTeacher ? <><Pencil size={20} className="text-orange-500" /> Edit Teacher Highlight</> : <><Plus size={20} className="text-orange-500" /> Add Teacher Highlight</>)}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 mt-1">
              {activeModal === 'user' && 'Register a new portal user account record.'}
              {activeModal === 'class' && 'Configure and schedule a new student classroom.'}
              {activeModal === 'course' && (editingCourse ? `Modify directory settings for "${editingCourse.title}".` : 'Deploy a new course page directory entry.')}
              {activeModal === 'subject' && 'Setup a dynamic marketing grid card for frontend listing.'}
              {activeModal === 'faq' && 'Setup a dynamic dropdown question and answer accordion.'}
              {activeModal === 'review' && 'Setup parent/student feedback slides displayed on the homepage.'}
              {activeModal === 'service' && 'Configure active service highlight bullet details.'}
              {activeModal === 'teacher' && (editingTeacher ? `Modify professional details for "${editingTeacher.name}".` : 'Register a new team profile highlight.')}
            </DialogDescription>
          </DialogHeader>

          {activeModal === 'user' && (
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="name" placeholder="John Doe" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="email" type="email" placeholder="john@example.com" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Temporary Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="password" type="password" placeholder="••••••••" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Portal User Role</label>
                <select name="role" className="w-full h-11 border border-slate-200 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold" required>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <Button type="submit" className="w-full h-11 bg-blue-900 hover:bg-blue-800 rounded-xl font-bold mt-2"><Plus size={16} className="mr-1" /> Add Account</Button>
            </form>
          )}

          {activeModal === 'class' && (
            <form onSubmit={handleAddClass} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Subject Name</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="subject" placeholder="GCSE Chemistry" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Assigned Teacher ID</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="teacherId" placeholder="1" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Time / Frequency</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="time" placeholder="Mon, Wed 16:30 - 18:00" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 bg-blue-900 hover:bg-blue-800 rounded-xl font-bold mt-2"><Plus size={16} className="mr-1" /> Deploy Class</Button>
            </form>
          )}

          {activeModal === 'course' && (
            <form key={editingCourse ? editingCourse.id : 'new'} onSubmit={handleCourseFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Course Title</label>
                <div className="relative">
                  <Book className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="title" defaultValue={editingCourse?.title || ""} placeholder="A-Level Tuition" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">URL Slug</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="slug" defaultValue={editingCourse?.slug || ""} placeholder="a-level-tutoring" required className="pl-9 h-11 border-slate-200 text-xs font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Age Range</label>
                  <Input name="ageRange" defaultValue={editingCourse?.ageRange || ""} placeholder="11-19 years" className="h-11 border-slate-200" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Starting Price</label>
                  <Input name="startingPrice" defaultValue={editingCourse?.startingPrice || ""} placeholder="£12.99/hour" className="h-11 border-slate-200 font-semibold" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">SEO Meta Title</label>
                <Input name="seoTitle" defaultValue={editingCourse?.seoTitle || ""} placeholder="SEO Title Tag" className="h-11 border-slate-200" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">SEO Meta Description</label>
                <Textarea name="seoDescription" defaultValue={editingCourse?.seoDescription || ""} placeholder="SEO meta description..." className="border-slate-200 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Curriculum Subjects (comma-separated)</label>
                <Input name="subjects" defaultValue={editingCourse?.subjects?.join(', ') || ""} placeholder="Biology, Chemistry, Physics, Maths" required className="h-11 border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Group Fee</label>
                  <Input name="feeGroup" defaultValue={editingCourse?.fees?.group || ""} placeholder="£7.99/hour" className="h-11 border-slate-200 text-xs font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">1-to-1 Fee</label>
                  <Input name="feeOneToOne" defaultValue={editingCourse?.fees?.oneToOne || ""} placeholder="£25/hour" className="h-11 border-slate-200 text-xs font-semibold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Rating Stars</label>
                  <select name="rating" defaultValue={editingCourse?.rating || "5"} className="w-full h-11 border border-slate-200 rounded-lg px-3 text-sm bg-white font-semibold">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Assigned Tutors / Teachers</label>
                <div className="grid grid-cols-2 gap-2 border border-slate-200 rounded-lg p-3 bg-white max-h-32 overflow-y-auto">
                  {teachers.map((t: any) => (
                    <label key={t.id} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="teacher_ids" 
                        value={t.id} 
                        defaultChecked={editingCourse?.teacher_ids?.includes(t.id) || editingCourse?.teachers?.some((et: any) => et.id === t.id)}
                        className="rounded border-slate-300 text-orange-500 focus:ring-orange-500" 
                      />
                      {t.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Class Overview Summary</label>
                <Textarea name="overview" defaultValue={editingCourse?.overview || ""} placeholder="Summarize focus exams and assessment goals..." className="border-slate-200 text-sm h-20" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Full Description Context (Markdown supported)</label>
                <Textarea name="description" defaultValue={editingCourse?.description || ""} placeholder="Extended description content..." className="border-slate-200 text-sm h-32" />
              </div>
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full h-11 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold mt-2 flex items-center justify-center gap-1.5">
                  {editingCourse ? <Check size={16} /> : <Plus size={16} />}
                  {editingCourse ? 'Save Changes' : 'Deploy Course'}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setEditingCourse(null); setActiveModal(null); }} className="w-full h-11 rounded-xl font-bold border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1.5">
                  <X size={16} /> Cancel
                </Button>
              </div>
            </form>
          )}

          {activeModal === 'subject' && (
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Subject Name</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="title" placeholder="Science (GCSE)" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Key Stages Covered</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="keyStages" placeholder="Key Stage 3 & 4" required className="pl-9 h-11 border-slate-200 text-xs" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Lucide Icon Name</label>
                <div className="relative">
                  <Award className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="icon" placeholder="e.g. BookOpen, Award, GraduationCap" required className="pl-9 h-11 border-slate-200 text-xs font-mono" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Subject Cover Image URL</label>
                <Input name="image" placeholder="/images/service/2.jpg" className="h-11 border-slate-200 text-xs font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Short Summary</label>
                <Textarea name="description" placeholder="Specify curriculum and topics taught..." className="border-slate-200 text-sm" />
              </div>
              <Button type="submit" className="w-full h-11 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold mt-2"><Plus size={16} className="mr-1" /> Add Subject Highlight</Button>
            </form>
          )}

          {activeModal === 'faq' && (
            <form onSubmit={handleAddFaq} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Question / Prompt</label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="question" placeholder="e.g. Do you offer online tutoring?" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Answer Detail</label>
                <Textarea name="answer" placeholder="Yes, we support remote web classrooms..." required className="border-slate-200 text-sm" />
              </div>
              <Button type="submit" className="w-full h-11 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold mt-2"><Plus size={16} className="mr-1" /> Add FAQ Entry</Button>
            </form>
          )}

          {activeModal === 'review' && (
            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Author / Parent Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="author_name" placeholder="Sarah Smith" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Profile Icon Avatar URL</label>
                <Input name="profile_photo_url" placeholder="/images/icons/avatar-1.png" className="h-11 border-slate-200 text-xs font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Review Rating</label>
                  <select name="rating" className="w-full h-11 border border-slate-200 rounded-lg px-3 text-sm bg-white font-semibold">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Review Quote Content</label>
                <Textarea name="text" placeholder="Excellent tutor support..." required className="border-slate-200 text-sm" />
              </div>
              <Button type="submit" className="w-full h-11 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold mt-2"><Plus size={16} className="mr-1" /> Publish Testimonial</Button>
            </form>
          )}

          {activeModal === 'service' && (
            <form onSubmit={handleAddService} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Feature Highlight Title</label>
                <div className="relative">
                  <Award className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="title" placeholder="Personalised Learning Paths" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Lucide Icon Name</label>
                <div className="relative">
                  <Award className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="icon" placeholder="e.g. Award, TrendingUp, Shield" required className="pl-9 h-11 border-slate-200 text-xs font-mono" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">CTA Redirection Link</label>
                <Input name="link" placeholder="/courses" className="h-11 border-slate-200 text-xs font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Feature Description</label>
                <Textarea name="description" placeholder="We tailor our learning schedules..." required className="border-slate-200 text-sm" />
              </div>
              <Button type="submit" className="w-full h-11 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold mt-2"><Plus size={16} className="mr-1" /> Add Service Highlight</Button>
            </form>
          )}

          {activeModal === 'teacher' && (
            <form key={editingTeacher ? editingTeacher.id : 'new'} onSubmit={handleTeacherFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Teacher Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="name" defaultValue={editingTeacher?.name || ""} placeholder="Sarah Jenkins" required className="pl-9 h-11 border-slate-200" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Educational Role</label>
                <div className="relative">
                  <Award className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="role" defaultValue={editingTeacher?.role || ""} placeholder="GCSE Science Coordinator" required className="pl-9 h-11 border-slate-200 text-xs" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Subject Tags (comma-separated)</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <Input name="subjects" defaultValue={editingTeacher?.subjects?.join(', ') || ""} placeholder="Biology, Chemistry, Science" required className="pl-9 h-11 border-slate-200 text-xs" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Avatar Cover Image URL</label>
                <Input name="image" defaultValue={editingTeacher?.image || ""} placeholder="/images/team/maruf.jpg" className="h-11 border-slate-200 text-xs font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Short Professional Bio</label>
                <Textarea name="bio" defaultValue={editingTeacher?.bio || ""} placeholder="Over ten years' experience teaching..." className="border-slate-200 text-sm h-24" />
              </div>
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full h-11 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold mt-2 flex items-center justify-center gap-1.5">
                  {editingTeacher ? <Check size={16} /> : <Plus size={16} />}
                  {editingTeacher ? 'Update Teacher Highlight' : 'Add Teacher Highlight'}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setEditingTeacher(null); setActiveModal(null); }} className="w-full h-11 rounded-xl font-bold border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1.5">
                  <X size={16} /> Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Micro icons
function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

