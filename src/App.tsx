import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Chapter1 from "./pages/Chapter1.tsx";
import Chapter3 from "./pages/Chapter3.tsx";
import Chapter4 from "./pages/Chapter4.tsx";
import Chapter5 from "./pages/Chapter5.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chapter1 />} />
          <Route path="/map" element={<Index />} />
          <Route path="/chapter3" element={<Chapter3 />} />
          <Route path="/chapter4" element={<Chapter4 />} />
          <Route path="/chapter5" element={<Chapter5 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
