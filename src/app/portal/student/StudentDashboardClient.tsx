'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, CheckCircle2, Circle, Clock, FileText, Video } from 'lucide-react';

export default function StudentDashboardClient({ student }: any) {
  const homework = student.homework || [];
  const nextLesson = student.nextLesson || null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {student.name}!</h2>
          <p className="text-slate-500">Here's your learning progress for {student.level}.</p>
        </div>
        <Badge variant={student.feeStatus === 'Paid' ? 'default' : 'destructive'} className="text-sm py-1 px-3">
          Fees: {student.feeStatus || 'Unknown'}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Progress Tracker */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Syllabus Progress
            </CardTitle>
            <CardDescription>You're making great progress in {student.level}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>{student.progress || 0}% Completed</span>
              <span className="text-slate-500">Target: 100%</span>
            </div>
            <Progress value={student.progress || 0} className="h-3 bg-slate-100" />
            <p className="text-sm text-slate-600 mt-4">
              Keep it up! Make sure to complete your pending assignments.
            </p>
          </CardContent>
        </Card>

        {/* Next Lesson Card */}
        {nextLesson && (
          <Card className="bg-blue-900 text-white shadow-lg shadow-blue-900/20 border-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-800/50 blur-2xl"></div>
            
            <CardHeader>
              <CardTitle className="text-blue-100 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Next Lesson
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div>
                <p className="text-3xl font-black">{new Date(nextLesson.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-blue-200">{new Date(nextLesson.time).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-200">Teacher</p>
                <p className="font-semibold">{nextLesson.teacher}</p>
              </div>
            </CardContent>
            <CardFooter>
              <a href={nextLesson.link} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-white text-blue-900 hover:bg-slate-100 font-bold group">
                  <Video className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  Join Class
                </Button>
              </a>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Homework / Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" />
            Homework & Resources
          </CardTitle>
          <CardDescription>Files uploaded by your teacher.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {homework.map((hw: any) => (
              <div key={hw.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  {hw.status === 'Completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-300" />
                  )}
                  <div>
                    <p className={`font-medium ${hw.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {hw.title}
                    </p>
                    <p className="text-xs text-slate-500">PDF Document</p>
                  </div>
                </div>
                {hw.status === 'Pending' && (
                  <a href={hw.url} download>
                    <Button variant="outline" size="sm">Download</Button>
                  </a>
                )}
              </div>
            ))}
            {homework.length === 0 && <p>No homework assigned yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
