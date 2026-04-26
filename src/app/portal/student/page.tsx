'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, CheckCircle2, Circle, Clock, FileText, Video } from 'lucide-react';

export default function StudentDashboard() {
  const [student] = useState({
    name: 'John Doe',
    level: 'GCSE Maths',
    progress: 75,
    feeStatus: 'Paid',
    nextLesson: {
      time: '16:00',
      date: 'Today',
      teacher: 'Sarah Connor',
      link: '#'
    },
    homework: [
      { id: 'hw1', title: 'Algebra Worksheet 1', status: 'Pending' },
      { id: 'hw2', title: 'Geometry Basics', status: 'Completed' }
    ]
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {student.name}!</h2>
          <p className="text-slate-500">Here's your learning progress for {student.level}.</p>
        </div>
        <Badge variant={student.feeStatus === 'Paid' ? 'default' : 'destructive'} className="text-sm py-1 px-3">
          Fees: {student.feeStatus}
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
              <span>{student.progress}% Completed</span>
              <span className="text-slate-500">Target: 100%</span>
            </div>
            <Progress value={student.progress} className="h-3 bg-slate-100" />
            <p className="text-sm text-slate-600 mt-4">
              Keep it up! You've mastered Algebra and Geometry. Next up: Trigonometry.
            </p>
          </CardContent>
        </Card>

        {/* Next Lesson Card */}
        <Card className="bg-blue-900 text-white shadow-lg shadow-blue-900/20 border-0 relative overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-800/50 blur-2xl"></div>
          
          <CardHeader>
            <CardTitle className="text-blue-100 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Next Lesson
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div>
              <p className="text-3xl font-black">{student.nextLesson.time}</p>
              <p className="text-blue-200">{student.nextLesson.date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-200">Teacher</p>
              <p className="font-semibold">{student.nextLesson.teacher}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-white text-blue-900 hover:bg-slate-100 font-bold group">
              <Video className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
              Join Class
            </Button>
          </CardFooter>
        </Card>
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
            {student.homework.map((hw) => (
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
                  <Button variant="outline" size="sm">Download</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
