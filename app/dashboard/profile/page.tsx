"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supaBaseClient";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error(error?.message || "No user");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, subscription, storage_used, storage_limit, datasets_count")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(profileError.message);
      }

      setUser({
        email: user.email,
        ...profile,
      });

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>No user logged in.</p>
      </div>
    );
  }

  const storageUsed = user.storage_used ?? 0;
  const storageLimit = user.storage_limit ?? 50;
  const storagePercent =
    storageLimit > 0 ? Math.round((storageUsed / storageLimit) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-12 space-y-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          ⚙️ Account Settings
        </h1>

        {/* Account Info */}
        <Card className="bg-gray-900/80 border border-gray-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-white">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-300">
            <p>
              <span className="font-semibold text-white">Name:</span>{" "}
              {user.full_name || "Not set"}
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-white">Subscription:</span>{" "}
              {user.subscription || "Free"}
            </p>
            <Link href="/upgrade">
              <Button variant="secondary" size="sm" className="mt-3">
                Manage Subscription
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card className="bg-gray-900/80 border border-gray-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-white">Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
              <div
                className="bg-purple-600 h-4 transition-all"
                style={{ width: `${storagePercent}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {storageUsed} MB of {storageLimit} MB used ({storagePercent}%)
            </p>
          </CardContent>
        </Card>

        {/* Dataset Stats */}
        <Card className="bg-gray-900/80 border border-gray-800 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-white">Dataset Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              You’ve uploaded {user.datasets_count || 0} datasets so far.
            </p>
            <Link href="/dashboard/datasets">
              <Button variant="outline" size="sm" className="mt-3">
                View My Datasets
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
