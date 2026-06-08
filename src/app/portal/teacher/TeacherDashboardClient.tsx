'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clock, Users, BookOpen } from 'lucide-react';
import { updateStudent, getAllStudents } from '@/lib/clientDb';

export default function TeacherDashboardClient({ teacher, students }: any) {
  const [localStudents, setLocalStudents] = useState(students);
  const schedule = teacher.schedule || [];

  async function handleToggleAttendance(studentId: string, currentAttendance: boolean) {
    await updateStudent(studentId, { lastAttendance: !currentAttendance });
    const allStudents = await getAllStudents();
    const rosterIds = teacher.roster || [];
    const updatedRoster = allStudents.filter((s: any) => rosterIds.includes(s.id));
    setLocalStudents(updatedRoster);
  }

  async function handleSaveNotes(e: React.FormEvent<HTMLFormElement>, studentId: string) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const notes = formData.get('notes') as string;
    
    await updateStudent(studentId, { teacherNotes: notes });
    alert('Notes saved successfully!');
    
    const allStudents = await getAllStudents();
    const rosterIds = teacher.roster || [];
    const updatedRoster = allStudents.filter((s: any) => rosterIds.includes(s.id));
    setLocalStudents(updatedRoster);
  }

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
            <div className="text-2xl font-bold">{localStudents.length}</div>
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
            {localStudents.map((student: any) => (
              <Card key={student.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{student.name}</CardTitle>
                      <CardDescription>{student.level}</CardDescription>
                    </div>
                    <Badge variant={student.lastAttendance ? 'default' : 'secondary'}>
                      {student.lastAttendance ? 'Present' : 'Absent'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={() => handleToggleAttendance(student.id, student.lastAttendance)} 
                      variant="outline" 
                      size="sm"
                    >
                      Mark {student.lastAttendance ? 'Absent' : 'Present'}
                    </Button>
                  </div>
                  <form onSubmit={(e) => handleSaveNotes(e, student.id)}>
                    <div className="space-y-2">
                      <Label htmlFor={`notes-${student.id}`}>Private Notes</Label>
                      <Textarea 
                        id={`notes-${student.id}`} 
                        name="notes"
                        defaultValue={student.teacherNotes || ''}
                        placeholder="Add notes about student progress or behavior..."
                        className="resize-none h-20"
                      />
                    </div>
                    <Button type="submit" variant="outline" className="w-full mt-4">Save Notes</Button>
                  </form>
                </CardContent>
              </Card>
            ))}
            {localStudents.length === 0 && <p>No students assigned.</p>}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((slot: any) => (
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
                {schedule.length === 0 && <p>No classes scheduled.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
