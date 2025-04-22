import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PenTool } from 'lucide-react';

export default function AuthErrorPage() {
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
          Authentication Error
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          There was a problem authenticating your account. Please try again.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-6 py-8 shadow-md sm:rounded-lg sm:px-12 flex flex-col items-center">
          <p className="mb-6 text-center">
            The authentication process could not be completed. This could be due to an expired link or an issue with the authentication service.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">
                Return to login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">
                Go to home page
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}