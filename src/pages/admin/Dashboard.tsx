
import React, { useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { makeUserAdmin } from '@/utils/adminUtils';

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Toplam Rezervasyon</h3>
          <p className="text-3xl font-bold text-nature-600">--</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Toplam Gelir</h3>
          <p className="text-3xl font-bold text-earth-600">--₺</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Kayıtlı Kullanıcı</h3>
          <p className="text-3xl font-bold text-blue-600">--</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Son Rezervasyonlar</h3>
          <p className="text-gray-500">Henüz rezervasyon bulunmuyor.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Yeni Mesajlar</h3>
          <p className="text-gray-500">Henüz mesaj bulunmuyor.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
