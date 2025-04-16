
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar, 
  ChevronDown,
  Check,
  X,
  RefreshCcw,
  Shield,
  User,
  Lock,
  ArrowUpDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'admin' | 'user';
  status: 'active' | 'suspended' | 'pending';
  registrationDate: string;
  reservationCount: number;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  const [userRoleDialogOpen, setUserRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [makingAdmin, setMakingAdmin] = useState(false);
  
  // Demo kullanıcı verisi
  const demoUsers: UserData[] = [
    {
      id: "1",
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@example.com",
      phone: "+90 555 123 4567",
      role: "user",
      status: "active",
      registrationDate: "2025-01-15",
      reservationCount: 3
    },
    {
      id: "2",
      name: "Ayşe Kaya",
      email: "ayse.kaya@example.com",
      phone: "+90 555 234 5678",
      role: "user",
      status: "active",
      registrationDate: "2025-01-20",
      reservationCount: 1
    },
    {
      id: "3",
      name: "Mehmet Demir",
      email: "mehmet.demir@example.com",
      phone: null,
      role: "user",
      status: "pending",
      registrationDate: "2025-02-10",
      reservationCount: 0
    },
    {
      id: "4",
      name: "Zeynep Aydın",
      email: "zeynep.aydin@example.com",
      phone: "+90 555 345 6789",
      role: "admin",
      status: "active",
      registrationDate: "2025-01-05",
      reservationCount: 2
    },
    {
      id: "5",
      name: "Ali Can",
      email: "ali.can@example.com",
      phone: "+90 555 456 7890",
      role: "user",
      status: "suspended",
      registrationDate: "2025-02-20",
      reservationCount: 0
    },
    {
      id: "6",
      name: "Fatma Şahin",
      email: "fatma.sahin@example.com",
      phone: "+90 555 567 8901",
      role: "user",
      status: "active",
      registrationDate: "2025-03-01",
      reservationCount: 1
    },
    {
      id: "7",
      name: "İbrahim Yıldız",
      email: "ibrahim.yildiz@example.com",
      phone: null,
      role: "user",
      status: "active",
      registrationDate: "2025-03-10",
      reservationCount: 4
    },
    {
      id: "8",
      name: "Aylin Öztürk",
      email: "aylin.ozturk@example.com",
      phone: "+90 555 678 9012",
      role: "user",
      status: "active",
      registrationDate: "2025-03-15",
      reservationCount: 1
    },
  ];
  
  // Filtreleme
  const filteredUsers = demoUsers.filter(user => {
    // Status filtresi
    if (filter !== 'all') {
      if (filter === 'admin' && user.role !== 'admin') return false;
      if (filter === 'active' && user.status !== 'active') return false;
      if (filter === 'pending' && user.status !== 'pending') return false;
      if (filter === 'suspended' && user.status !== 'suspended') return false;
    }
    
    // Arama filtresi
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) ||
        (user.phone && user.phone.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // Sayfalama
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
  // Rol değiştirme dialogu açma
  const openRoleDialog = (user: UserData) => {
    setSelectedUser(user);
    setMakingAdmin(user.role === 'admin');
    setUserRoleDialogOpen(true);
  };
  
  // Kullanıcı rolü güncelleme
  const updateUserRole = () => {
    if (!selectedUser) return;
    
    toast({
      title: "Rol güncellendi",
      description: `${selectedUser.name} kullanıcısının rolü ${makingAdmin ? 'admin' : 'kullanıcı'} olarak güncellendi.`,
    });
    
    setUserRoleDialogOpen(false);
  };
  
  // Durum badge'i
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Aktif</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Onay Bekliyor</span>;
      case 'suspended':
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">Askıya Alınmış</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">{status}</span>;
    }
  };
  
  // Tarih formatı
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };
  
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Kullanıcılar</h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="İsim, Email veya Telefon..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtrele
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Kullanıcı Filtresi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter('all')}>
                {filter === 'all' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'all' ? 'font-medium' : ''}>Tüm Kullanıcılar</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('admin')}>
                {filter === 'admin' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'admin' ? 'font-medium' : ''}>Sadece Adminler</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('active')}>
                {filter === 'active' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'active' ? 'font-medium' : ''}>Aktif Kullanıcılar</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('pending')}>
                {filter === 'pending' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'pending' ? 'font-medium' : ''}>Onay Bekleyenler</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('suspended')}>
                {filter === 'suspended' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'suspended' ? 'font-medium' : ''}>Askıya Alınanlar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" onClick={() => {setFilter('all'); setSearchTerm('');}}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Sıfırla
          </Button>
          
          <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-nature-500 hover:bg-nature-600 w-full sm:w-auto">
                <UserPlus className="mr-2 h-4 w-4" /> Kullanıcı Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                <DialogDescription>
                  Yeni bir kullanıcı hesabı oluşturun.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input id="firstName" placeholder="Ahmet" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input id="lastName" placeholder="Yılmaz" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" placeholder="kullanici@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon (Opsiyonel)</Label>
                  <Input id="phone" placeholder="+90 555 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Şifre</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="isAdmin" />
                  <Label htmlFor="isAdmin">Admin yetkisi ver</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewUserDialogOpen(false)}>
                  İptal
                </Button>
                <Button 
                  className="bg-nature-500 hover:bg-nature-600"
                  onClick={() => {
                    toast({
                      title: "Kullanıcı eklendi",
                      description: "Yeni kullanıcı başarıyla oluşturuldu.",
                    });
                    setNewUserDialogOpen(false);
                  }}
                >
                  Kullanıcı Oluştur
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {filter !== 'all' && (
        <div className="mb-4 flex items-center">
          <div className="bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1 flex items-center">
            Filtre: {filter === 'admin' ? 'Sadece Adminler' : 
                    filter === 'active' ? 'Aktif Kullanıcılar' : 
                    filter === 'pending' ? 'Onay Bekleyenler' : 
                    filter === 'suspended' ? 'Askıya Alınanlar' : ''}
            <button 
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => setFilter('all')}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Listesi</CardTitle>
          <CardDescription>
            Toplam {filteredUsers.length} kullanıcı {filter !== 'all' ? `(${filter} filtrelenmiş)` : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <div className="flex items-center">
                      Kullanıcı
                      <ArrowUpDown className="ml-1 h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">İletişim</th>
                  <th className="text-left py-3 px-4 hidden lg:table-cell">
                    <div className="flex items-center">
                      Kayıt Tarihi
                      <Calendar className="ml-1 h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4">Durum</th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">Rez.</th>
                  <th className="text-right py-3 px-4">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="font-medium">{user.name}</span>
                        {user.role === 'admin' && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">Admin</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex flex-col space-y-1">
                        <span className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" /> {user.email}
                        </span>
                        {user.phone && (
                          <span className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" /> {user.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell text-sm text-gray-600">
                      {formatDate(user.registrationDate)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-center">
                      {user.reservationCount}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <span className="sr-only">Aç</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              toast({
                                title: "Bilgi",
                                description: "Kullanıcı profili görüntüleme özelliği yakında eklenecek.",
                              });
                            }}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Profili Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openRoleDialog(user)}>
                            <Shield className="mr-2 h-4 w-4" />
                            {user.role === 'admin' ? 'Admin Yetkisini Kaldır' : 'Admin Yap'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              toast({
                                title: "Bilgi",
                                description: "Şifre sıfırlama özelliği yakında eklenecek.",
                              });
                            }}
                          >
                            <Lock className="mr-2 h-4 w-4" />
                            Şifre Sıfırla
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              toast({
                                title: user.status === 'suspended' ? 'Kullanıcı aktive edildi' : 'Kullanıcı askıya alındı',
                                description: `${user.name} kullanıcısının hesabı ${user.status === 'suspended' ? 'aktif' : 'askıya alınmış'} duruma getirildi.`,
                              });
                            }}
                          >
                            <X className="mr-2 h-4 w-4" />
                            {user.status === 'suspended' ? 'Aktifleştir' : 'Askıya Al'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                
                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      {searchTerm ? 'Aramanızla eşleşen sonuç bulunamadı.' : 'Kullanıcı bulunamadı.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Toplam {filteredUsers.length} sonuçtan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredUsers.length)} arası gösteriliyor
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Önceki
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Sonraki
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Role update dialog */}
      <Dialog open={userRoleDialogOpen} onOpenChange={setUserRoleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kullanıcı Rolünü Değiştir</DialogTitle>
            <DialogDescription>
              {selectedUser?.name} kullanıcısının rolünü değiştir.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="role-admin" 
                checked={makingAdmin} 
                onCheckedChange={setMakingAdmin}
              />
              <Label htmlFor="role-admin">Admin yetkisi</Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {makingAdmin 
                ? 'Bu kullanıcı tüm yönetim paneli özelliklerine erişebilecek.'
                : 'Bu kullanıcı sadece standart kullanıcı yetkilerine sahip olacak.'}
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserRoleDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              onClick={updateUserRole}
              className="bg-nature-500 hover:bg-nature-600"
            >
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;
