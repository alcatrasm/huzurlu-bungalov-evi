
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook, Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { user, signUp, signInWithGoogle, signInWithFacebook } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  if (user) {
    return <Navigate to="/profil" />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password validation
    if (password !== confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor');
      return;
    }
    
    if (password.length < 8) {
      setPasswordError('Şifre en az 8 karakter olmalıdır');
      return;
    }
    
    setPasswordError('');
    setLoading(true);
    await signUp(email, password);
    setLoading(false);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Hesap Oluştur</CardTitle>
            <CardDescription className="text-center">
              Hemen kaydolun ve doğanın tadını çıkarın
            </CardDescription>
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
                <label htmlFor="password" className="text-sm font-medium">Şifre</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="En az 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">Şifre Tekrar</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Şifrenizi doğrulayın"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms} 
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <span>
                    <Link to="/kosullar" className="text-nature-600 hover:underline">Şartlar ve Koşullar</Link>'ı kabul ediyorum
                  </span>
                </label>
              </div>
              
              <Button type="submit" className="w-full bg-nature-500 hover:bg-nature-600" disabled={loading || !acceptTerms}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Kayıt Ol
              </Button>
            </form>
            
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
                <FcGoogle className="mr-2 h-5 w-5" />
                Google ile Kayıt Ol
              </Button>
              <Button 
                variant="outline" 
                type="button"
                onClick={() => signInWithFacebook()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
              >
                <Facebook className="mr-2 h-5 w-5" />
                Facebook ile Kayıt Ol
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Zaten hesabınız var mı?{" "}
              <Link to="/giris" className="text-nature-600 hover:underline">
                Giriş Yapın
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
