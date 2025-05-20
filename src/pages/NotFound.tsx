
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

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
      <div className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
        <div className="rounded-full bg-amber-100 p-3 text-amber-600 mb-6">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
