import { createClient } from '@supabase/supabase-js'

// Înlocuiește cu datele tale din Supabase Project Settings > API
const supabaseUrl = 'https://ilcxenyggcsgxhueotmm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsY3hlbnlnZ2NzZ3hodWVvdG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjYxODksImV4cCI6MjA4MzU0MjE4OX0.n6IbI65BCr7tBpuellKpEPlxm08WjkdEwu6UZZ-ZdXM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)