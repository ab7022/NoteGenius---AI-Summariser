import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { PenTool, Sparkles, Clock, FileText } from 'lucide-react';



export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <PenTool className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Smarter notes with{' '}
              <span className="text-primary">AI-powered</span> summaries
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground">
              NoteGenius helps you capture ideas and stay organized with AI that automatically summarizes your notes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/dashboard">Start summarizing notes</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Key Features</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Our powerful features make note-taking and organization effortless
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 text-primary mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Summarization</h3>
              <p className="text-muted-foreground">
                Automatically generate concise summaries of your notes with our AI technology
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 text-primary mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Sync</h3>
              <p className="text-muted-foreground">
                Your notes sync instantly across all your devices for seamless access
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="rounded-full bg-primary/10 p-3 text-primary mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rich Text Editing</h3>
              <p className="text-muted-foreground">
                Create beautiful notes with formatting tools to express your ideas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to get started?
            </h2>
            <p className="max-w-[600px] text-lg text-muted-foreground">
              Join thousands of users who are already using NoteGenius to take smarter notes and stay organized.
            </p>
            <Button asChild size="lg" className="h-12 px-8 mt-6">
              <Link href="/register">Create free account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <PenTool className="h-5 w-5" />
              <span className="font-bold">NoteGenius</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NoteGenius. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}