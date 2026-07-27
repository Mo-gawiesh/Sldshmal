"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import HomePage from './home';

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HomePage />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
