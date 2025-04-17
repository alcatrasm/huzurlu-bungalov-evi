
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { StaticPage } from '@/models/StaticPage';

interface StaticPageViewerProps {
  defaultSlug?: string;
}

const StaticPageViewer = ({ defaultSlug }: StaticPageViewerProps) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const slug = defaultSlug || paramSlug;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [page, setPage] = useState<StaticPage | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
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
          
          // Update page meta data
          if (data.meta_title) {
            document.title = data.meta_title;
          }
          
          if (data.meta_description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute('content', data.meta_description);
            } else {
              const meta = document.createElement('meta');
              meta.name = 'description';
              meta.content = data.meta_description;
              document.head.appendChild(meta);
            }
          }
        } else {
          toast({
            title: "Sayfa bulunamadı",
            description: "İstenilen sayfa veritabanında bulunamadı.",
            variant: "destructive"
          });
          navigate('/');
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
    
    // Cleanup function to reset page title
    return () => {
      document.title = 'Huzurlu Bungalov - Doğayla İç İçe Tatil Deneyimi';
    };
  }, [slug, navigate, toast]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-nature-500" />
      </div>
    );
  }
  
  if (!page) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <div 
          className="prose prose-lg max-w-none prose-headings:text-nature-800 prose-a:text-earth-600"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
};

export default StaticPageViewer;
