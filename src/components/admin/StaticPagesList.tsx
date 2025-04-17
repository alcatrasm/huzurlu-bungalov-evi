
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Edit, Plus } from 'lucide-react';
import { StaticPage } from '@/models/StaticPage';

const StaticPagesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data, error } = await supabase
          .from('static_pages')
          .select('*')
          .order('title');
          
        if (error) throw error;
        
        setPages(data as StaticPage[]);
      } catch (error) {
        console.error('Error fetching pages:', error);
        toast({
          title: "Hata",
          description: "Sayfalar yüklenirken bir hata oluştu.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPages();
  }, [toast]);
  
  const handleCreate = () => {
    navigate('/yonetim/sayfalar/yeni');
  };
  
  const handleEdit = (slug: string) => {
    navigate(`/yonetim/sayfalar/duzenle/${slug}`);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-nature-500" />
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Statik Sayfalar</CardTitle>
          <CardDescription>Web sitenizdeki statik sayfa içeriklerini yönetin</CardDescription>
        </div>
        <Button 
          onClick={handleCreate}
          className="bg-nature-500 hover:bg-nature-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni Sayfa
        </Button>
      </CardHeader>
      <CardContent>
        {pages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Henüz hiç sayfa oluşturulmamış.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Başlık</th>
                  <th className="text-left py-3">Slug</th>
                  <th className="text-left py-3">Son Güncelleme</th>
                  <th className="text-right py-3">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{page.title}</td>
                    <td className="py-3 font-mono text-sm text-gray-500">{page.slug}</td>
                    <td className="py-3 text-sm text-gray-500">
                      {page.updated_at ? new Date(page.updated_at).toLocaleDateString('tr-TR') : '-'}
                    </td>
                    <td className="py-3 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(page.slug)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Düzenle
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
  );
};

export default StaticPagesList;
