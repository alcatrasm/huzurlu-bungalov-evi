
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-nature-500 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">
            Üzgünüz, aradığınız sayfa bulunamadı
          </p>
          <Button className="btn-primary">
            <Link to="/">Ana Sayfaya Dön</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
