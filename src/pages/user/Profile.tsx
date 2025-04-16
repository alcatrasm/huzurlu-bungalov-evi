import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Profile as ProfileType } from '@/models/Profile';
import { Reservation as ReservationType } from '@/models/Reservation';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileType | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [reservationsLoading, setReservationsLoading] = useState(true);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setProfileData(data as ProfileType);
          setFirstName(data.first_name || '');
          setLastName(data.last_name || '');
          setPhone(data.phone || '');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);
  
  // Fetch user reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('reservations')
          .select(`
            *,
            bungalows (name)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          const formattedReservations = data.map(item => ({
            ...item,
            bungalow_name: item.bungalows?.name || 'Bilinmiyor',
          })) as ReservationType[];
          
          setReservations(formattedReservations);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setReservationsLoading(false);
      }
    };
    
    fetchReservations();
  }, [user]);
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const updateData = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updateData);
        
      if (error) throw error;
      
      toast({
        title: "Profil Güncellendi",
        description: "Bilgileriniz başarıyla kaydedildi.",
      });
    } catch (error: any) {
      toast({
        title: "Hata",
        description: "Profil güncellenirken bir hata oluştu: " + error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'onaylandi':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Onaylandı</span>;
      case 'beklemede':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Beklemede</span>;
      case 'iptal':
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">İptal Edildi</span>;
      case 'tamamlandi':
        return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">Tamamlandı</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">{status}</span>;
    }
  };
  
  const viewReservationDetails = (id: string) => {
    navigate(`/profil/rezervasyonlarim/${id}`);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-500"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Hesabım</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profil Bilgileri</TabsTrigger>
            <TabsTrigger value="reservations">Rezervasyonlarım</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
                <CardDescription>
                  Kişisel bilgilerinizi güncelleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Adınız"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-muted-foreground">
                    E-posta adresiniz değiştirilemez
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefon numaranız"
                  />
                </div>
                
                <Button 
                  onClick={handleSaveProfile} 
                  className="bg-nature-500 hover:bg-nature-600"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Değişiklikleri Kaydet
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Rezervasyonlarım</CardTitle>
                <CardDescription>
                  Geçmiş ve gelecek rezervasyonlarınızı görüntüleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reservationsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-nature-500" />
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Henüz bir rezervasyonunuz bulunmuyor.</p>
                    <Button 
                      className="mt-4 bg-nature-500 hover:bg-nature-600"
                      onClick={() => navigate('/bungalovlar')}
                    >
                      Bungalov Keşfet
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 text-left">Bungalov</th>
                          <th className="py-3 text-left">Tarihler</th>
                          <th className="py-3 text-left">Durum</th>
                          <th className="py-3 text-left">Toplam</th>
                          <th className="py-3 text-right">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((reservation) => (
                          <tr key={reservation.id} className="border-b hover:bg-gray-50">
                            <td className="py-4">{reservation.bungalow_name}</td>
                            <td className="py-4">
                              {formatDate(reservation.check_in)} - {formatDate(reservation.check_out)}
                            </td>
                            <td className="py-4">
                              {getStatusBadge(reservation.status)}
                            </td>
                            <td className="py-4">{reservation.total_price} ₺</td>
                            <td className="py-4 text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => viewReservationDetails(reservation.id)}
                              >
                                Detay
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
