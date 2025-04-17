
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Bungalows from "./pages/Bungalows";
import BungalowDetail from "./pages/BungalowDetail";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthCallback from "./pages/auth/Callback";
import Profile from "./pages/user/Profile";
import Dashboard from "./pages/admin/Dashboard";
import AdminBungalows from "./pages/admin/Bungalows";
import AdminReservations from "./pages/admin/Reservations";
import AdminUsers from "./pages/admin/Users";
import StaticPages from "./pages/admin/StaticPages";
import StaticPageEdit from "./pages/admin/StaticPageEdit";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import StaticPage from "./pages/StaticPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bungalovlar" element={<Bungalows />} />
            <Route path="/bungalovlar/:slug" element={<BungalowDetail />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/galeri" element={<Gallery />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/rezervasyon" element={<Reservation />} />
            <Route path="/sayfa/:slug" element={<StaticPage />} />
            
            {/* Auth Routes */}
            <Route path="/giris" element={<Login />} />
            <Route path="/kayit" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* User Routes */}
            <Route path="/profil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/yonetim" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/yonetim/bungalovlar" element={<AdminRoute><AdminBungalows /></AdminRoute>} />
            <Route path="/yonetim/rezervasyonlar" element={<AdminRoute><AdminReservations /></AdminRoute>} />
            <Route path="/yonetim/kullanicilar" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/yonetim/sayfalar" element={<AdminRoute><StaticPages /></AdminRoute>} />
            <Route path="/yonetim/sayfalar/duzenle/:slug" element={<AdminRoute><StaticPageEdit /></AdminRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
