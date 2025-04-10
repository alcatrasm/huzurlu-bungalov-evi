
import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedBungalows from '../components/home/FeaturedBungalows';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedBungalows />
      <Features />
      <Testimonials />
      <Newsletter />
      <CallToAction />
    </Layout>
  );
};

export default Index;
