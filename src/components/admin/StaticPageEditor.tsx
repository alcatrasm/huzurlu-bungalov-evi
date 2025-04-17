
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import { StaticPage } from '@/models/StaticPage';

const StaticPageEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [page, setPage] = useState<StaticPage | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('static_pages')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setPage(data as StaticPage);
          setTitle(data.title);
          setContent(data.content);
          setMetaTitle(data.meta_title || '');
          setMetaDescription(data.meta_description || '');
        } else {
          toast({
            title: "Sayfa bulunamadı",
            description: "İstenilen sayfa veritabanında bulunamadı.",
            variant: "destructive"
          });
          navigate('/yonetim/sayfalar');
        }
      } catch (error) {
        console.error('Error fetching page:', error);
        toast({
          title: "Hata",
          description: "Sayfa yüklenirken bir hata oluştu.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPage();
  }, [slug, navigate, toast]);
  
  const handleSave = async () => {
    if (!page) return;
    
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('static_pages')
        .update({
          title,
          content,
          meta_title: metaTitle || null,
          meta_description: metaDescription || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', page.id);
        
      if (error) throw error;
      
      toast({
        title: "Sayfa güncellendi",
        description: "Sayfa içeriği başarıyla kaydedildi.",
      });
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: "Hata",
        description: "Sayfa kaydedilirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-nature-500" />
      </div>
    );
  }
  
  if (!page) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sayfa Düzenleme - {page.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Sayfa Başlığı</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sayfa başlığını girin"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">İçerik (HTML destekler)</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Sayfa içeriğini girin"
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">SEO Ayarları</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Başlık</Label>
              <Input
                id="metaTitle"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Meta başlığını girin"
              />
              <p className="text-xs text-gray-500">
                Tarayıcı sekmesinde ve arama sonuçlarında görünecek başlık
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Açıklama</Label>
              <Textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta açıklamasını girin"
                className="h-20"
              />
              <p className="text-xs text-gray-500">
                Arama sonuçlarında görünecek kısa açıklama (maksimum 160 karakter)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/yonetim/sayfalar')}
        >
          Geri
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-nature-500 hover:bg-nature-600"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Kaydet
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StaticPageEditor;
