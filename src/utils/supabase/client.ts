import { createClient as createSupabaseClient } from '@supabase/supabase-js';

let browserClient: ReturnType<typeof createSupabaseClient<any>> | null = null;
const authLockQueues: Record<string, Promise<unknown>> = {};

const localAuthLock = async <Result>(
  name: string,
  _acquireTimeout: number,
  fn: () => Promise<Result>
): Promise<Result> => {
  const previousLock = authLockQueues[name] ?? Promise.resolve();
  let releaseLock: () => void = () => {};

  authLockQueues[name] = new Promise<void>((resolve) => {
    releaseLock = resolve;
  });

  await previousLock.catch(() => undefined);

  try {
    return await fn();
  } finally {
    releaseLock();
  }
};

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  if (!browserClient) {
    browserClient = createSupabaseClient<any>(supabaseUrl, supabaseAnonKey, {
      auth: {
        lock: localAuthLock,
      },
    });
  }

  return browserClient;
};
