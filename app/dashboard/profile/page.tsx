"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supaBaseClient";
import { useAuth } from "@/lib/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function ProfileContent() {
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authUser) return;
      
      setLoading(true);

      try {
        // Get auth headers
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          setLoading(false);
          return;
        }

        // Fetch profile using the API
        const response = await fetch("/api/profile", {
          headers: {
            "Authorization": `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const profile = await response.json();
          setUser({
            email: authUser.email,
            ...profile,
          });
        } else {
          console.error("Failed to fetch profile");
          // Fallback to basic user info
          setUser({
            email: authUser.email,
            full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || 'User',
            subscription: 'Free',
            storage_used: 0,
            storage_limit: 50,
            datasets_count: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Fallback to basic user info
        setUser({
          email: authUser.email,
          full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || 'User',
          subscription: 'Free',
          storage_used: 0,
          storage_limit: 50,
          datasets_count: 0,
        });
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [authUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  const storageUsed = user.storage_used ?? 0;
  const storageLimit = user.storage_limit ?? 50;
  const storagePercent =
    storageLimit > 0 ? Math.round((storageUsed / storageLimit) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,rgba(0,0,0,1)_85%)]" />
      
      <Navbar />

      <main className="relative z-10 flex-1 container mx-auto px-6 py-12 space-y-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Account Settings
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your account preferences and data
          </p>
        </div>

        {/* Account Info */}
        <Card className="bg-card/80 backdrop-blur-sm border border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-card-foreground flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                👤
              </div>
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-lg font-semibold">
                  {user.full_name || "Not set"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-lg font-semibold">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subscription</p>
                  <p className="text-lg font-semibold">
                    {user.subscription || "Free"}
                  </p>
                </div>
                <Link href="/upgrade">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                  >
                    Manage Subscription
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card className="bg-card/80 backdrop-blur-sm border border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-card-foreground flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                💾
              </div>
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Used Storage</span>
                <span className="font-semibold">{storagePercent}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 transition-all duration-500 ease-out"
                  style={{ width: `${storagePercent}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {storageUsed} MB of {storageLimit} MB used
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dataset Stats */}
        <Card className="bg-card/80 backdrop-blur-sm border border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-card-foreground flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                •
              </div>
              Dataset Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {user.datasets_count || 0}
              </div>
              <p className="text-muted-foreground">
                {user.datasets_count === 1 ? 'Dataset' : 'Datasets'} uploaded
              </p>
            </div>
            <div className="pt-4 border-t border-border">
              <Link href="/dashboard/datasets">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                >
                  View My Datasets
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
