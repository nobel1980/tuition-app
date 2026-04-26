import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { Home, Users, BookOpen, Calendar, Settings, LogOut, CheckSquare, GraduationCap, DollarSign, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/app/login/actions';
import { Button } from '@/components/ui/button';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sessionData = cookieStore.get('mock_session')?.value;
  
  if (!sessionData) {
    redirect('/login');
  }

  const session = JSON.parse(sessionData);

  // Role-based navigation
  let navItems: { title: string, url: string, icon: any }[] = [];
  if (session.role === 'admin') {
    navItems = [
      { title: 'Dashboard', url: '/portal/admin', icon: LayoutDashboard },
      { title: 'Students', url: '#', icon: Users },
      { title: 'Teachers', url: '#', icon: GraduationCap },
      { title: 'Classes', url: '#', icon: BookOpen },
      { title: 'Fees', url: '#', icon: DollarSign },
      { title: 'Settings', url: '#', icon: Settings },
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
            <h2 className="text-xl font-black text-blue-900 tracking-tighter">
              Ibrahim<span className="text-orange-500">Tuition</span>
            </h2>
            <p className="text-xs font-semibold text-slate-500 capitalize">{session.role} Portal</p>
          </SidebarHeader>
          <SidebarContent>
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
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-slate-100">
            <div className="mb-4">
              <p className="text-sm font-semibold">{session.name}</p>
              <p className="text-xs text-slate-500 capitalize">{session.role}</p>
            </div>
            <form action={logout}>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col h-full overflow-auto">
          <header className="flex h-14 items-center gap-4 border-b border-slate-200 bg-white px-6">
            <SidebarTrigger />
            <h1 className="font-semibold text-lg capitalize">{session.role} Dashboard</h1>
          </header>
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
