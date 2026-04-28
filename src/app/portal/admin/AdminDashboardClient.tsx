'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, TrendingUp, Search, Plus, Trash2, Edit } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { adminAddUser, adminDeleteUser, adminAddClass, adminDeleteClass, adminUpdateFeeStatus } from '@/app/portal/actions';

export default function AdminDashboardClient({ initialStats, initialUsers, initialStudents, initialClasses }: any) {
  const [search, setSearch] = useState('');
  
  const filteredUsers = initialUsers.filter((u: any) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStudents = initialStudents.filter((s: any) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h2>
          <p className="text-slate-500">Overview of your tutoring business.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Global search..."
            className="pl-8 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="students">Students & Fees</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
            <Card className="md:col-span-4 col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£{initialStats?.totalRevenue?.toLocaleString()}</div>
                <p className="text-xs text-slate-500">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <Users className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{initialStats?.totalStudents}</div>
                <p className="text-xs text-slate-500">+12 new students this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
                <BookOpen className="h-4 w-4 text-slate-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{initialClasses?.length}</div>
                <p className="text-xs text-slate-500">Scheduled sessions</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full" style={{ minWidth: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={initialStats?.revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage roles and permissions.</CardDescription>
              </div>
              <form action={adminAddUser} className="flex gap-2">
                <Input name="name" placeholder="Name" required className="w-32" />
                <Input name="email" type="email" placeholder="Email" required className="w-40" />
                <Input name="password" type="password" placeholder="Pass" required className="w-24" />
                <select name="role" className="border rounded px-2" required>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
                <Button type="submit" size="sm"><Plus className="w-4 h-4 mr-1"/> Add</Button>
              </form>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : user.role === 'teacher' ? 'secondary' : 'outline'} className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <form action={adminDeleteUser}>
                          <input type="hidden" name="id" value={user.id} />
                          <Button type="submit" variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Students & Fees</CardTitle>
              <CardDescription>Manage student details and fee statuses.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead className="text-right">Update Fee</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.level}</TableCell>
                      <TableCell>
                        <Badge variant={student.feeStatus === 'Paid' ? 'default' : 'destructive'}>
                          {student.feeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <form action={adminUpdateFeeStatus} className="flex justify-end gap-2">
                          <input type="hidden" name="id" value={student.id} />
                          <select name="feeStatus" defaultValue={student.feeStatus} className="border rounded px-2 text-sm">
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Overdue">Overdue</option>
                          </select>
                          <Button type="submit" size="sm" variant="outline">Update</Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Class Schedule</CardTitle>
                <CardDescription>Manage classes and assignments.</CardDescription>
              </div>
              <form action={adminAddClass} className="flex gap-2">
                <Input name="subject" placeholder="Subject" required className="w-32" />
                <Input name="teacherId" placeholder="Teacher ID" required className="w-24" />
                <Input name="time" placeholder="Time (e.g. Mon 16:00)" required className="w-40" />
                <Button type="submit" size="sm"><Plus className="w-4 h-4 mr-1"/> Add</Button>
              </form>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialClasses?.map((cls: any) => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.subject}</TableCell>
                      <TableCell>{cls.teacherId}</TableCell>
                      <TableCell>{cls.time}</TableCell>
                      <TableCell className="text-right">
                        <form action={adminDeleteClass}>
                          <input type="hidden" name="id" value={cls.id} />
                          <Button type="submit" variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
