
import React from 'react';
import Layout from '../components/layout/Layout';

const Gallery = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Galeri</h1>
        <p className="text-gray-600 mb-8">
          Doğa ve bungalovlarımızdan etkileyici kareler
        </p>
        
        {/* Gallery content will be implemented here */}
        <div className="bg-gray-100 p-12 rounded-lg text-center">
          <p className="text-lg text-gray-600">
            Galeri sayfası çok yakında!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
