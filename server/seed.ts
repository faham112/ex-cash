import { supabase } from './supabase';
import { storage } from './storage';

async function seed() {
  const { data: { user } } = await supabase.auth.signUp({
    email: 'admin@example.com',
    password: 'password',
  });

  if (user) {
    await storage.createUser({
      auth_id: user.id,
      username: 'admin',
      email: 'admin@example.com',
      full_name: 'Admin User',
      role: 'admin',
    });
  }
}

seed();
