import { createClient } from '@supabase/supabase-js';
import { packages } from './packages';


const supabaseUrl = "https://qgqnnzkvsnuqurhlkemv.supabase.co";
const supabaseServiceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFncW5uemt2c251cXVyaGxrZW12Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzgwMTMzMywiZXhwIjoyMDYzMzc3MzMzfQ.WuD7qiIK0uVLQPThfRRY2lUJdstqjhpXlSmkynuyoz8";

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function uploadPackages() {
  for (const pkg of packages) {
    const { data, error } = await supabase.from('packages').upsert(pkg);
    if (error) {
      console.error('Error inserting package:', pkg.name, error);
    } else {
      console.log('Inserted/updated package:', pkg.name);
    }
  }
}

uploadPackages()
  .then(() => {
    console.log('Upload selesai!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Upload gagal:', err);
    process.exit(1);
  });
