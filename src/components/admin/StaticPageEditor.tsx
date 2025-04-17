
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
  const [pageSlug, setPageSlug] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);
  
  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) {
        // New page
        setIsNew(true);
        setLoading(false);
        return;
      }
      
      try {
        console.log('Fetching page with slug:', slug);
        const { data, error } = await supabase
          .from('static_pages')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (error) {
          console.error('Error fetching page:', error);
          throw error;
        }
        
        if (data) {
          console.log('Page data:', data);
          setPage(data as StaticPage);
          setTitle(data.title || '');
          setPageSlug(data.slug || '');
          setContent(data.content || '');
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
    if (!title || !pageSlug || !content) {
      toast({
        title: "Eksik bilgi",
        description: "Lütfen başlık, slug ve içerik alanlarını doldurunuz.",
        variant: "destructive"
      });
      return;
    }
    
    setSaving(true);
    
    try {
      if (isNew) {
        // Create new page
        console.log('Creating new page');
        const { data, error } = await supabase
          .from('static_pages')
          .insert({
            title,
            slug: pageSlug,
            content,
            meta_title: metaTitle || null,
            meta_description: metaDescription || null
          })
          .select()
          .single();
          
        if (error) {
          console.error('Error creating page:', error);
          throw error;
        }
        
        toast({
          title: "Sayfa oluşturuldu",
          description: "Yeni sayfa başarıyla oluşturuldu.",
        });
        
        navigate(`/yonetim/sayfalar/duzenle/${data.slug}`);
      } else if (page) {
        // Update existing page
        console.log('Updating page:', page.id);
        const { error } = await supabase
          .from('static_pages')
          .update({
            title,
            slug: pageSlug,
            content,
            meta_title: metaTitle || null,
            meta_description: metaDescription || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', page.id);
          
        if (error) {
          console.error('Error saving page:', error);
          throw error;
        }
        
        toast({
          title: "Sayfa güncellendi",
          description: "Sayfa içeriği başarıyla kaydedildi.",
        });
        
        if (pageSlug !== slug) {
          // If slug changed, redirect to the new URL
          navigate(`/yonetim/sayfalar/duzenle/${pageSlug}`);
        }
      }
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
  
  const generateSlugFromTitle = () => {
    if (title && (!pageSlug || pageSlug === slug)) {
      const newSlug = title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      setPageSlug(newSlug);
    }
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
      <CardHeader>
        <CardTitle>{isNew ? 'Yeni Sayfa Oluştur' : `Sayfa Düzenleme - ${page?.title}`}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Sayfa Başlığı</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={generateSlugFromTitle}
            placeholder="Sayfa başlığını girin"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slug">Sayfa URL (Slug)</Label>
          <Input
            id="slug"
            value={pageSlug}
            onChange={(e) => setPageSlug(e.target.value)}
            placeholder="sayfa-url-adresi"
            className="font-mono"
          />
          <p className="text-xs text-gray-500">
            URL adresinde sadece küçük harfler, rakamlar ve tire (-) kullanılabilir.
          </p>
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
              {isNew ? 'Oluştur' : 'Kaydet'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StaticPageEditor;
