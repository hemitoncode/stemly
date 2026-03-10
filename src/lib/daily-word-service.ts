import { supabase } from './supabase';
import { VALID_STEM_WORDS } from './words';

function hashDate(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export async function getDailyWord(): Promise<{ word: string; date: string }> {
  const today = new Date().toISOString().split('T')[0];

  // Check DB first
  const { data: existing } = await supabase
    .from('daily_words')
    .select('word, date')
    .eq('date', today)
    .single();

  if (existing) {
    return { word: existing.word, date: existing.date };
  }

  // Generate deterministic word for today
  const index = hashDate(today) % VALID_STEM_WORDS.length;
  const word = VALID_STEM_WORDS[index];

  // Insert into DB (upsert to handle race conditions)
  await supabase
    .from('daily_words')
    .upsert({ word, date: today }, { onConflict: 'date' });

  return { word, date: today };
}
