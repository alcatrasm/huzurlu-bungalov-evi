
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { StaticPagesList } from '@/components/admin/StaticPagesList';

const StaticPages = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Statik Sayfa Yönetimi</h1>
        <p className="text-muted-foreground">Web sitenizdeki statik içerikleri düzenleyin</p>
      </div>
      
      <StaticPagesList />
    </AdminLayout>
  );
};

export default StaticPages;
