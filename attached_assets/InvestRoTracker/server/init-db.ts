import { supabase } from './supabase';
import { readFileSync } from 'fs';
import { join } from 'path';

async function initDatabase() {
  try {
    console.log('Initializing database...');
    
    // Read the SQL file
    const sqlContent = readFileSync(join(__dirname, 'database', 'init.sql'), 'utf8');
    
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: sqlContent
    });
    
    if (error) {
      console.error('Error initializing database:', error);
      return false;
    }
    
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error reading SQL file or executing:', error);
    return false;
  }
}

// Export for use in other files
export { initDatabase };

// Run if this file is executed directly
if (require.main === module) {
  initDatabase().then((success) => {
    if (success) {
      console.log('Database setup completed successfully');
      process.exit(0);
    } else {
      console.error('Database setup failed');
      process.exit(1);
    }
  });
}