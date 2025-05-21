



import { createClient } from "@supabase/supabase-js";
import PackagesClient from "./PackagesClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function PackagesPage() {
  // Ini dijalankan di server saat render
  const { data, error } = await supabase.from("packages").select("*");

  let packages = [];
  if (!error && data) {
    packages = data.map((pkg) => ({
      ...pkg,
      activities: typeof pkg.activities === "string" ? JSON.parse(pkg.activities) : pkg.activities || [],
    }));
  }

  // Client-side state dan filtering harus di handle di client component
  // Jadi kita buat komponen client terpisah untuk UI interaktif

  return <PackagesClient packages={packages} />;
}
