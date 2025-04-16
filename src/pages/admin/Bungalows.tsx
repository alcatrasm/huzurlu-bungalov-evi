
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Loader2, 
  Home, 
  Users, 
  Maximize, 
  Eye
} from 'lucide-react';
import { bungalows } from '@/data/bungalows';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Bungalow } from '@/models/Bungalow';

const AdminBungalows = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBungalowId, setSelectedBungalowId] = useState<string | null>(null);
  
  const handleDelete = (id: string) => {
    setSelectedBungalowId(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    setLoading(true);
    // Demo amaçlı yükleniyor efekti
    setTimeout(() => {
      setLoading(false);
      setDeleteDialogOpen(false);
      toast({
        title: "Bungalov silindi",
        description: "Bungalov başarıyla silindi.",
      });
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bungalovlar</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-nature-500 hover:bg-nature-600">
              <Plus className="mr-2 h-4 w-4" /> Yeni Bungalov
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Yeni Bungalov Ekle</DialogTitle>
              <DialogDescription>
                Yeni bungalov bilgilerini doldurun. Tüm alanlar zorunludur.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Bungalov Adı</Label>
                  <Input id="name" placeholder="Orman Manzaralı Bungalov" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">SEO URL</Label>
                  <Input id="slug" placeholder="orman-manzarali-bungalov" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Kısa Açıklama</Label>
                <Textarea 
                  id="description" 
                  placeholder="Doğanın kalbinde, modern konforla buluşan eşsiz bir kaçamak..." 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Gecelik Fiyat (₺)</Label>
                  <Input id="price" type="number" placeholder="1500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Büyüklük (m²)</Label>
                  <Input id="size" type="number" placeholder="45" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adults">Yetişkin</Label>
                  <Input id="adults" type="number" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="children">Çocuk</Label>
                  <Input id="children" type="number" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Pasif</SelectItem>
                      <SelectItem value="maintenance">Bakımda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Kapak Resmi</Label>
                <Input id="image" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button">İptal</Button>
              <Button 
                type="button"
                className="bg-nature-500 hover:bg-nature-600"
                onClick={() => {
                  toast({
                    title: "Bungalov eklendi",
                    description: "Yeni bungalov başarıyla eklendi.",
                  });
                }}
              >
                Kaydet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bungalows.map((bungalow) => (
          <Card key={bungalow.id} className="overflow-hidden">
            <div className="relative h-48">
              <img 
                src={bungalow.images[0].url} 
                alt={bungalow.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{bungalow.name}</h3>
                <div className="flex items-center text-sm mt-1 space-x-3">
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {bungalow.capacity.adults + bungalow.capacity.children} Kişi
                  </span>
                  <span className="flex items-center">
                    <Maximize className="h-3 w-3 mr-1" />
                    {bungalow.size} m²
                  </span>
                  <span className="font-semibold">
                    {bungalow.pricePerNight} ₺
                  </span>
                </div>
              </div>
            </div>
            <CardContent className="p-4 pt-3">
              <p className="text-gray-600 text-sm line-clamp-2">{bungalow.shortDescription}</p>
              
              <div className="flex items-center mt-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <Home className="h-3 w-3 mr-1" />
                  {bungalow.features.length} Özellik
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  {bungalow.available ? (
                    <span className="flex items-center text-green-600">
                      <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-1"></span>
                      Müsait
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <span className="h-2 w-2 bg-red-500 rounded-full inline-block mr-1"></span>
                      Dolu
                    </span>
                  )}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                <Edit className="h-4 w-4 mr-1" />
                Düzenle
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`/bungalovlar/${bungalow.slug}`} target="_blank" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-1" />
                  Görüntüle
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => handleDelete(bungalow.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Sil
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bungalov Silinecek</DialogTitle>
            <DialogDescription>
              Bu işlem geri alınamaz. Bu bungalov ve ilgili tüm rezervasyon verileri silinecektir.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={loading}>
              İptal
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Siliniyor..." : "Evet, Sil"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminBungalows;
