"use client";

import { useEffect, useState } from "react";

/** WIB tidak memakai DST, jadi offset tetap UTC+7. */
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

/** Sisa milidetik sampai tengah malam WIB berikutnya. */
function msUntilMidnightJakarta(now: number): number {
  const wib = new Date(now + WIB_OFFSET_MS);
  const nextMidnightWib =
    Date.UTC(wib.getUTCFullYear(), wib.getUTCMonth(), wib.getUTCDate() + 1) -
    WIB_OFFSET_MS;
  return Math.max(0, nextMidnightWib - now);
}

function splitDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function Countdown() {
  // null pada SSR & render pertama -> tidak ada hydration mismatch.
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(msUntilMidnightJakarta(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = remaining === null ? null : splitDuration(remaining);

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label="Sisa waktu flash sale hari ini"
      className="flex items-center gap-0.5"
    >
      <Unit value={parts?.hours} />
      <Separator />
      <Unit value={parts?.minutes} />
      <Separator />
      <Unit value={parts?.seconds} />
    </div>
  );
}

function Unit({ value }: { value?: number }) {
  return (
    <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-bold tabular-nums">
      {value === undefined ? "--" : String(value).padStart(2, "0")}
    </span>
  );
}

function Separator() {
  return (
    <span aria-hidden className="text-red-500 font-bold">
      :
    </span>
  );
}
