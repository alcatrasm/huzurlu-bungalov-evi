
import React, { useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { makeUserAdmin } from '@/utils/adminUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Calendar, CreditCard, Users } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      // Add this to the console to help troubleshooting
      console.log('Admin Dashboard - Current user:', user.id);
      console.log('To make this user an admin, execute in console:');
      console.log('1. const makeAdmin = await import("/src/utils/adminUtils.js").then(mod => mod.makeUserAdmin);');
      console.log(`2. await makeAdmin("${user.id}");`);
      console.log('3. Then refresh the page');
    }
  }, [user]);
  
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Yönetim Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Toplam Rezervasyon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Tüm zamanların rezervasyon sayısı</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0₺</div>
            <p className="text-xs text-muted-foreground">Tüm zamanların geliri</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Kayıtlı Kullanıcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Toplam kayıtlı kullanıcı sayısı</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Doluluk Oranı</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">Bu ayki doluluk oranı</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Son Rezervasyonlar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Henüz rezervasyon bulunmuyor.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Yeni Mesajlar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Henüz mesaj bulunmuyor.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
