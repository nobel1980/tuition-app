'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/clientDb';
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { Home, Users, BookOpen, Calendar, Settings, LogOut, CheckSquare, GraduationCap, DollarSign, LayoutDashboard, HelpCircle, MessageSquare, Award, Book } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<{ id: string; role: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionData = localStorage.getItem('ibt_mock_session');
    if (!sessionData) {
      router.push('/login');
    } else {
      setSession(JSON.parse(sessionData));
      setLoading(false);
    }
  }, [router]);

  async function handleLogout() {
    try {
      await logout();
    } catch (e) {
      console.error('Logout API call failed:', e);
      // Fallback local cleanup in case of API failure
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ibt_mock_session');
        document.cookie = "ibt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        document.cookie = "ibt_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
    }
    router.push('/login');
  }

  if (loading || !session) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium animate-pulse">Loading portal...</p>
      </div>
    );
  }

  // Role-based navigation arrays
  let navItems: { title: string, url: string, icon: any }[] = [];
  let privateItems: { title: string, url: string, icon: any }[] = [];
  let publicItems: { title: string, url: string, icon: any }[] = [];

  if (session.role === 'admin') {
    privateItems = [
      { title: 'Overview', url: '/portal/admin?tab=overview', icon: LayoutDashboard },
      { title: 'Users', url: '/portal/admin?tab=users', icon: Users },
      { title: 'Students & Fees', url: '/portal/admin?tab=students', icon: DollarSign },
      { title: 'Classes Roster', url: '/portal/admin?tab=classes', icon: BookOpen },
    ];
    publicItems = [
      { title: 'Courses', url: '/portal/admin?tab=courses', icon: Book },
      { title: 'Subjects', url: '/portal/admin?tab=subjects', icon: GraduationCap },
      { title: 'FAQs', url: '/portal/admin?tab=faqs', icon: HelpCircle },
      { title: 'Reviews', url: '/portal/admin?tab=reviews', icon: MessageSquare },
      { title: 'Services', url: '/portal/admin?tab=services', icon: Award },
      { title: 'Teachers', url: '/portal/admin?tab=teachers', icon: Users },
      { title: 'Site Settings', url: '/portal/admin?tab=settings', icon: Settings },
    ];
  } else if (session.role === 'teacher') {
    navItems = [
      { title: 'Dashboard', url: '/portal/teacher', icon: LayoutDashboard },
      { title: 'My Roster', url: '#', icon: Users },
      { title: 'Attendance', url: '#', icon: CheckSquare },
      { title: 'Schedule', url: '#', icon: Calendar },
    ];
  } else if (session.role === 'student') {
    navItems = [
      { title: 'Dashboard', url: '/portal/student', icon: LayoutDashboard },
      { title: 'My Classes', url: '#', icon: BookOpen },
      { title: 'Homework', url: '#', icon: CheckSquare },
      { title: 'Fees', url: '#', icon: DollarSign },
    ];
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-50 w-full overflow-hidden">
        <Sidebar className="border-r border-slate-200 bg-white">
          <SidebarHeader className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 flex items-center justify-center bg-slate-50/50 rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Ibrahim Tuition Logo"
                  width={26}
                  height={26}
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-black text-blue-900 tracking-tighter">
                Ibrahim<span className="text-orange-500">Tuition</span>
              </h2>
            </div>
            <p className="text-xs font-semibold text-slate-500 capitalize">{session.role} Portal</p>
          </SidebarHeader>
          <SidebarContent>
            {session.role === 'admin' ? (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>Private Management</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {privateItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton render={<Link href={item.url} />}>
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Public Content</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {publicItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton render={<Link href={item.url} />}>
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            ) : (
              <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton render={<Link href={item.url} />}>
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-slate-100">
            <div className="mb-4">
              <p className="text-sm font-semibold">{session.name}</p>
              <p className="text-xs text-slate-500 capitalize">{session.role}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col h-full overflow-auto">
          <header className="flex h-14 items-center gap-4 border-b border-slate-200 bg-white px-6">
            <SidebarTrigger />
            <h1 className="font-semibold text-lg capitalize">{session.role} Dashboard</h1>
          </header>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex-1">
              {children}
            </div>
            <footer className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
              <p>Copyright © {new Date().getFullYear()} <span className="font-semibold text-blue-900">Ibrahim Tuition Centre</span> | All Rights Reserved</p>
              <div className="flex gap-4 font-medium">
                <Link href="/" className="hover:text-slate-800 transition-colors">Main Site</Link>
                <Link href="/privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
                <Link href="/contact" className="hover:text-slate-800 transition-colors">Support</Link>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
