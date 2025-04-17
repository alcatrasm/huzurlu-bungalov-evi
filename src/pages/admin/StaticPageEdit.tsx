
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StaticPageEditor from '@/components/admin/StaticPageEditor';

const StaticPageEdit = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Sayfa Düzenleme</h1>
        <p className="text-muted-foreground">Statik sayfa içeriğini düzenleyin</p>
      </div>
      
      <StaticPageEditor />
    </AdminLayout>
  );
};

export default StaticPageEdit;
