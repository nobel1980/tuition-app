'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login as clientLogin } from '@/lib/clientDb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const user = await clientLogin(email, password);
      
      // Store session in localStorage
      localStorage.setItem('ibt_mock_session', JSON.stringify({
        id: user.id,
        role: user.role,
        name: user.name
      }));
      
      setLoading(false);
      router.push(`/portal/${user.role}`);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Invalid credentials');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-900">Student Portal Login</CardTitle>
          <CardDescription className="text-center text-slate-500">
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m.example@ibrahimtuition.co.uk"
                required
                defaultValue="admin@ibrahimtuition.co.uk" // For demo ease
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                defaultValue="password123" // For demo ease
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <div className="text-sm text-center text-slate-500">
              <p>Demo accounts (password: password123):</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>admin@ibrahimtuition.co.uk</li>
                <li>sarah.teacher@example.com</li>
                <li>john.student@example.com</li>
              </ul>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
