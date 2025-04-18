
import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Loader2, Chrome, ShieldAlert } from 'lucide-react';

const Login = () => {
  const location = useLocation();
  const { user, signIn, signInWithGoogle, signInWithFacebook } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Check if we're coming from an admin page
  const fromAdmin = location.state?.from?.pathname?.startsWith('/yonetim');
  
  if (user) {
    // Redirect to the origin page if coming from somewhere, otherwise to profile
    return <Navigate to={location.state?.from?.pathname || "/profil"} replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {fromAdmin ? (
                <div className="flex items-center justify-center gap-2">
                  <ShieldAlert className="text-amber-500" />
                  Yönetici Girişi
                </div>
              ) : "Giriş Yap"}
            </CardTitle>
            <CardDescription className="text-center">
              {fromAdmin ? 
                "Yönetim paneline erişmek için giriş yapın" : 
                "Hesabınıza giriş yaparak rezervasyonlarınızı yönetin"}
            </CardDescription>
            {fromAdmin && (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded text-sm">
                Bu alana sadece yönetici yetkisine sahip kullanıcılar erişebilir.
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">E-posta</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Şifre</label>
                  <Link to="/sifremi-unuttum" className="text-sm text-nature-600 hover:underline">
                    Şifremi Unuttum
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifreniz"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-nature-500 hover:bg-nature-600" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Giriş Yap
              </Button>
            </form>
            
            {!fromAdmin && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">veya</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => signInWithGoogle()}
                    className="w-full"
                  >
                    <Chrome className="mr-2 h-5 w-5" />
                    Google ile Giriş Yap
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => signInWithFacebook()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                  >
                    <Facebook className="mr-2 h-5 w-5" />
                    Facebook ile Giriş Yap
                  </Button>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Hesabınız yok mu?{" "}
              <Link to="/kayit" className="text-nature-600 hover:underline">
                Hemen Kaydolun
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
