import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';
import { PenTool } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center">
            <PenTool className="h-8 w-8 text-primary mr-2" />
            <span className="font-bold text-2xl">NoteGenius</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:text-primary/90">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-card px-6 py-12 shadow-md sm:rounded-lg sm:px-12">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}