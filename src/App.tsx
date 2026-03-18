import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Topics from "./pages/Topics";
import TopicDetail from "./pages/TopicDetail";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import SearchResults from "./pages/SearchResults";
import Discover from "./pages/Discover";
import Trending from "./pages/Trending";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Calculators from "./pages/Calculators";
import CalculatorDetail from "./pages/CalculatorDetail";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:slug" element={<TopicDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/:slug" element={<CalculatorDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
