
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, CalendarCheck, CreditCard, Users } from 'lucide-react';

const Dashboard = () => {
  // Mock data for demo dashboard
  const stats = [
    {
      title: "Toplam Bungalov",
      value: "15",
      change: "+3 son ayda",
      icon: <BedDouble className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Bu Ayki Rezervasyon",
      value: "42",
      change: "+12% geçen aya göre",
      icon: <CalendarCheck className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Aylık Gelir",
      value: "₺35,600",
      change: "+8% geçen aya göre",
      icon: <CreditCard className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Toplam Müşteri",
      value: "327",
      change: "+21 son ayda",
      icon: <Users className="h-6 w-6 text-amber-600" />,
    },
  ];

  const recentReservations = [
    {
      id: "RES-1234",
      customer: "Ahmet Yılmaz",
      bungalow: "Orman Manzaralı Bungalov",
      checkIn: "15 Mayıs 2025",
      checkOut: "18 Mayıs 2025",
      status: "Onaylandı",
      total: "₺3,200",
    },
    {
      id: "RES-1235",
      customer: "Ayşe Kaya",
      bungalow: "Göl Manzaralı Bungalov",
      checkIn: "17 Mayıs 2025",
      checkOut: "21 Mayıs 2025",
      status: "Beklemede",
      total: "₺4,800",
    },
    {
      id: "RES-1236",
      customer: "Mehmet Demir",
      bungalow: "Dağ Manzaralı Bungalov",
      checkIn: "20 Mayıs 2025",
      checkOut: "22 Mayıs 2025",
      status: "Onaylandı",
      total: "₺2,400",
    },
    {
      id: "RES-1237",
      customer: "Zeynep Aydın",
      bungalow: "Aile Bungalovı",
      checkIn: "22 Mayıs 2025",
      checkOut: "27 Mayıs 2025",
      status: "Onaylandı",
      total: "₺6,000",
    },
    {
      id: "RES-1238",
      customer: "Ali Can",
      bungalow: "Romantik Bungalov",
      checkIn: "23 Mayıs 2025",
      checkOut: "25 Mayıs 2025",
      status: "Beklemede",
      total: "₺2,500",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Onaylandı':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Onaylandı</span>;
      case 'Beklemede':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Beklemede</span>;
      case 'İptal Edildi':
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">İptal Edildi</span>;
      case 'Tamamlandı':
        return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">Tamamlandı</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">{status}</span>;
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Yönetim Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-full">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Son Rezervasyonlar</CardTitle>
            <CardDescription>
              Son 5 rezervasyon kaydı
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">ID</th>
                    <th className="text-left py-3 px-2">Müşteri</th>
                    <th className="text-left py-3 px-2 hidden sm:table-cell">Bungalov</th>
                    <th className="text-left py-3 px-2 hidden md:table-cell">Giriş-Çıkış</th>
                    <th className="text-left py-3 px-2">Durum</th>
                    <th className="text-right py-3 px-2">Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">{reservation.id}</td>
                      <td className="py-3 px-2">{reservation.customer}</td>
                      <td className="py-3 px-2 hidden sm:table-cell">{reservation.bungalow}</td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        {reservation.checkIn} - {reservation.checkOut}
                      </td>
                      <td className="py-3 px-2">
                        {getStatusBadge(reservation.status)}
                      </td>
                      <td className="py-3 px-2 text-right">{reservation.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
