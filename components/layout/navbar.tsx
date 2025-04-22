'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/hooks/use-supabase';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Loader2, LogOut, Menu, PenTool, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type NavbarProps = {
  showMobileMenu?: boolean;
};

export function Navbar({ showMobileMenu = true }: NavbarProps) {
  const { session, supabase, loading } = useSession();
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user) {
        // Get user's name and avatar from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('name, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (data && !error) {
          setUserName(data.name);
          setUserImage(data.avatar_url);
        } else {
          // Fallback to user metadata if profile not found
          setUserName(session.user.user_metadata?.name || 'User');
          setUserImage(session.user.user_metadata?.avatar_url);
        }
      }
    };

    fetchUserProfile();
  }, [session, supabase]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-200',
        isScrolled && 'shadow-md bg-opacity-90 backdrop-blur-sm'
      )}
    >
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <PenTool className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">NoteGenius</span>
        </Link>
        
        <nav className="ml-auto flex items-center gap-4">
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {!loading && !session ? (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            ) : null}

            <ThemeToggle />

            {!loading && session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userImage || ''} alt={userName || ''} />
                      <AvatarFallback>
                        {userName ? getInitials(userName) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
          </div>

          {/* Mobile navigation */}
          {showMobileMenu && (
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              
              {!loading && session ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="flex flex-col space-y-4 mt-6">
                      <div className="flex items-center gap-2 mb-6">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={userImage || ''} alt={userName || ''} />
                          <AvatarFallback>
                            {userName ? getInitials(userName) : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{userName}</p>
                          <p className="text-xs text-muted-foreground">{session.user.email}</p>
                        </div>
                      </div>
                      
                      <Button variant="ghost" asChild>
                        <Link href="/dashboard" className="justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </Button>
                      
                      <Button variant="ghost" asChild>
                        <Link href="/profile" className="justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      
                      <Button variant="ghost" onClick={handleSignOut} className="justify-start text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : !loading ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="flex flex-col space-y-4 mt-6">
                      <Button variant="ghost" asChild>
                        <Link href="/login" className="justify-start">
                          Log in
                        </Link>
                      </Button>
                      <Button variant="default" asChild>
                        <Link href="/register" className="justify-start">
                          Sign up
                        </Link>
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}