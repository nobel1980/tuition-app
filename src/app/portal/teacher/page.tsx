'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, Users, BookOpen } from 'lucide-react';

export default function TeacherDashboard() {
  // Use mock data locally for immediate UI, could be fetched via API
  const [students] = useState([
    { id: 's1', name: 'John Doe', level: 'GCSE Maths', attendance: true },
    { id: 's2', name: 'Jane Smith', level: '11 Plus Maths', attendance: false },
  ]);

  const [schedule] = useState([
    { id: 'sch1', time: '16:00', student: 'John Doe', subject: 'GCSE Maths', status: 'upcoming' },
    { id: 'sch2', time: '17:00', student: 'Jane Smith', subject: '11 Plus Maths', status: 'upcoming' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Teacher Dashboard</h2>
        <p className="text-slate-500">Manage your classes and students.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schedule.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roster" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roster">My Roster & Attendance</TabsTrigger>
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roster" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <Card key={student.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{student.name}</CardTitle>
                      <CardDescription>{student.level}</CardDescription>
                    </div>
                    <Badge variant={student.attendance ? 'default' : 'secondary'}>
                      {student.attendance ? 'Present' : 'Absent'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id={`attendance-${student.id}`} defaultChecked={student.attendance} />
                    <Label htmlFor={`attendance-${student.id}`}>Mark Present</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`notes-${student.id}`}>Private Notes</Label>
                    <Textarea 
                      id={`notes-${student.id}`} 
                      placeholder="Add notes about student progress or behavior..."
                      className="resize-none h-20"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Save Notes</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule for {new Date().toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full text-blue-900">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{slot.time}</p>
                        <p className="text-sm text-slate-500">{slot.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{slot.student}</p>
                      <Badge variant="outline" className="mt-1">Upcoming</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
