'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Etwas ist schiefgelaufen
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
          Bitte lade die Seite neu oder starte den Dev-Server neu.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
