
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Check, 
  ChevronDown, 
  Filter, 
  Search, 
  X,
  RefreshCcw,
  FileText,
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
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

interface Reservation {
  id: string;
  customer: string;
  email: string;
  bungalow: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  status: 'onaylandı' | 'beklemede' | 'iptal' | 'tamamlandı';
  total: string;
  paymentStatus: 'ödendi' | 'beklemede' | 'iade';
  createdAt: string;
}

const AdminReservations = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState('tümü');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  
  // Demo rezervasyon verisi
  const demoReservations: Reservation[] = [
    {
      id: "RES-1001",
      customer: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@example.com",
      bungalow: "Orman Manzaralı Bungalov",
      checkIn: "2025-05-15",
      checkOut: "2025-05-18",
      guests: "2 Yetişkin, 1 Çocuk",
      status: "onaylandı",
      total: "₺3,200",
      paymentStatus: "ödendi",
      createdAt: "2025-04-01"
    },
    {
      id: "RES-1002",
      customer: "Ayşe Kaya",
      email: "ayse.kaya@example.com",
      bungalow: "Göl Manzaralı Bungalov",
      checkIn: "2025-05-17",
      checkOut: "2025-05-21",
      guests: "2 Yetişkin",
      status: "beklemede",
      total: "₺4,800",
      paymentStatus: "beklemede",
      createdAt: "2025-04-02"
    },
    {
      id: "RES-1003",
      customer: "Mehmet Demir",
      email: "mehmet.demir@example.com",
      bungalow: "Dağ Manzaralı Bungalov",
      checkIn: "2025-05-20",
      checkOut: "2025-05-22",
      guests: "2 Yetişkin",
      status: "onaylandı",
      total: "₺2,400",
      paymentStatus: "ödendi",
      createdAt: "2025-04-03"
    },
    {
      id: "RES-1004",
      customer: "Zeynep Aydın",
      email: "zeynep.aydin@example.com",
      bungalow: "Aile Bungalovı",
      checkIn: "2025-05-22",
      checkOut: "2025-05-27",
      guests: "2 Yetişkin, 2 Çocuk",
      status: "onaylandı",
      total: "₺6,000",
      paymentStatus: "ödendi",
      createdAt: "2025-04-04"
    },
    {
      id: "RES-1005",
      customer: "Ali Can",
      email: "ali.can@example.com",
      bungalow: "Romantik Bungalov",
      checkIn: "2025-05-23",
      checkOut: "2025-05-25",
      guests: "2 Yetişkin",
      status: "beklemede",
      total: "₺2,500",
      paymentStatus: "beklemede",
      createdAt: "2025-04-05"
    },
    {
      id: "RES-1006",
      customer: "Fatma Şahin",
      email: "fatma.sahin@example.com",
      bungalow: "Orman Manzaralı Bungalov",
      checkIn: "2025-05-25",
      checkOut: "2025-05-28",
      guests: "2 Yetişkin, 1 Çocuk",
      status: "iptal",
      total: "₺3,200",
      paymentStatus: "iade",
      createdAt: "2025-04-06"
    },
    {
      id: "RES-1007",
      customer: "İbrahim Yıldız",
      email: "ibrahim.yildiz@example.com",
      bungalow: "Göl Manzaralı Bungalov",
      checkIn: "2025-05-14",
      checkOut: "2025-05-16",
      guests: "2 Yetişkin",
      status: "tamamlandı",
      total: "₺2,400",
      paymentStatus: "ödendi",
      createdAt: "2025-04-07"
    },
  ];
  
  // Filtreleme
  const filteredReservations = demoReservations.filter(res => {
    // Status filtresi
    if (filter !== 'tümü' && res.status !== filter) {
      return false;
    }
    
    // Arama filtresi
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      return (
        res.id.toLowerCase().includes(searchLower) || 
        res.customer.toLowerCase().includes(searchLower) ||
        res.email.toLowerCase().includes(searchLower) ||
        res.bungalow.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Sayfalama
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
  // Rezervasyon detayları görüntüleme
  const viewReservationDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setDetailsDialogOpen(true);
  };
  
  // Durum değiştirme dialogu açma
  const openStatusDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setNewStatus(reservation.status);
    setStatusDialogOpen(true);
  };
  
  // Durum güncelleme
  const updateReservationStatus = () => {
    if (!selectedReservation || !newStatus) return;
    
    toast({
      title: "Durum güncellendi",
      description: `${selectedReservation.id} rezervasyonu başarıyla güncellendi.`,
    });
    
    setStatusDialogOpen(false);
  };
  
  // Durum badge'i
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'onaylandı':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Onaylandı</span>;
      case 'beklemede':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Beklemede</span>;
      case 'iptal':
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">İptal</span>;
      case 'tamamlandı':
        return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">Tamamlandı</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">{status}</span>;
    }
  };
  
  // Ödeme durumu badge'i
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'ödendi':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Ödendi</span>;
      case 'beklemede':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Beklemede</span>;
      case 'iade':
        return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">İade Edildi</span>;
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
        <h1 className="text-2xl font-bold">Rezervasyonlar</h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Ara: ID, Müşteri, Bungalov..."
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
              <DropdownMenuLabel>Durum Filtresi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter('tümü')}>
                {filter === 'tümü' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'tümü' ? 'font-medium' : ''}>Tümü</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('onaylandı')}>
                {filter === 'onaylandı' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'onaylandı' ? 'font-medium' : ''}>Onaylandı</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('beklemede')}>
                {filter === 'beklemede' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'beklemede' ? 'font-medium' : ''}>Beklemede</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('iptal')}>
                {filter === 'iptal' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'iptal' ? 'font-medium' : ''}>İptal</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('tamamlandı')}>
                {filter === 'tamamlandı' && <Check className="mr-2 h-4 w-4" />}
                <span className={filter === 'tamamlandı' ? 'font-medium' : ''}>Tamamlandı</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" onClick={() => {setFilter('tümü'); setSearchTerm('');}}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Sıfırla
          </Button>
        </div>
      </div>
      
      {filter !== 'tümü' && (
        <div className="mb-4 flex items-center">
          <div className="bg-gray-100 text-gray-700 text-sm rounded-full px-3 py-1 flex items-center">
            Filtre: {filter.charAt(0).toUpperCase() + filter.slice(1)}
            <button 
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => setFilter('tümü')}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Rezervasyon Listesi</CardTitle>
          <CardDescription>
            Toplam {filteredReservations.length} rezervasyon {filter !== 'tümü' ? `(${filter} durumunda)` : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <div className="flex items-center">
                      ID
                      <ArrowUpDown className="ml-1 h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4">Müşteri</th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">Bungalov</th>
                  <th className="text-left py-3 px-4 hidden lg:table-cell">
                    <div className="flex items-center">
                      Tarih
                      <Calendar className="ml-1 h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4">Durum</th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">Ödeme</th>
                  <th className="text-right py-3 px-4">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {paginatedReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{reservation.id}</td>
                    <td className="py-3 px-4">
                      <div>{reservation.customer}</div>
                      <div className="text-xs text-gray-500">{reservation.email}</div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">{reservation.bungalow}</td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="text-xs">Giriş: {formatDate(reservation.checkIn)}</div>
                      <div className="text-xs">Çıkış: {formatDate(reservation.checkOut)}</div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(reservation.status)}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      {getPaymentStatusBadge(reservation.paymentStatus)}
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
                          <DropdownMenuItem onClick={() => viewReservationDetails(reservation)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Detaylar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openStatusDialog(reservation)}>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Durum Değiştir
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              toast({
                                title: "Rezervasyon iptal edildi",
                                description: `${reservation.id} numaralı rezervasyon iptal edildi.`,
                              });
                            }}
                          >
                            <X className="mr-2 h-4 w-4" />
                            İptal Et
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                
                {paginatedReservations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      {searchTerm ? 'Aramanızla eşleşen sonuç bulunamadı.' : 'Rezervasyon bulunamadı.'}
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
                Toplam {filteredReservations.length} sonuçtan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredReservations.length)} arası gösteriliyor
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
      
      {/* Reservation details dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Rezervasyon Detayları</DialogTitle>
            <DialogDescription>
              Rezervasyon ID: {selectedReservation?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReservation && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Müşteri</h4>
                  <p className="text-lg font-medium">{selectedReservation.customer}</p>
                  <p className="text-sm text-gray-500">{selectedReservation.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Durum</h4>
                  <div>{getStatusBadge(selectedReservation.status)}</div>
                  <div className="mt-1">{getPaymentStatusBadge(selectedReservation.paymentStatus)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Bungalov</h4>
                  <p>{selectedReservation.bungalow}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Misafirler</h4>
                  <p>{selectedReservation.guests}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Giriş Tarihi</h4>
                  <p>{formatDate(selectedReservation.checkIn)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Çıkış Tarihi</h4>
                  <p>{formatDate(selectedReservation.checkOut)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Rezervasyon Tarihi</h4>
                  <p>{formatDate(selectedReservation.createdAt)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Toplam Tutar</h4>
                  <p className="text-lg font-semibold text-green-700">{selectedReservation.total}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Status update dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Rezervasyon Durumu Değiştir</DialogTitle>
            <DialogDescription>
              {selectedReservation?.id} numaralı rezervasyonun durumunu değiştir.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label className="mb-3 block">Durum</Label>
            <RadioGroup value={newStatus} onValueChange={setNewStatus} className="gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="onaylandı" id="status-confirmed" />
                <Label htmlFor="status-confirmed" className="flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-2"></span>
                  Onaylandı
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beklemede" id="status-pending" />
                <Label htmlFor="status-pending" className="flex items-center">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full inline-block mr-2"></span>
                  Beklemede
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="iptal" id="status-cancelled" />
                <Label htmlFor="status-cancelled" className="flex items-center">
                  <span className="h-2 w-2 bg-red-500 rounded-full inline-block mr-2"></span>
                  İptal Edildi
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tamamlandı" id="status-completed" />
                <Label htmlFor="status-completed" className="flex items-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full inline-block mr-2"></span>
                  Tamamlandı
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              onClick={updateReservationStatus}
              className="bg-nature-500 hover:bg-nature-600"
            >
              Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminReservations;
