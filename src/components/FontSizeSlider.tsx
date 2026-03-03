'use client';

interface FontSizeSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

const PRESETS = [
    { label: 'S', value: 18 },
    { label: 'M', value: 28 },
    { label: 'L', value: 40 },
];

export default function FontSizeSlider({
    value,
    onChange,
    min = 16,
    max = 48
}: FontSizeSliderProps) {
    const pct = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex items-center gap-3">
                {/* Preset buttons */}
                <div className="flex gap-1">
                    {PRESETS.map((p) => (
                        <button
                            key={p.label}
                            type="button"
                            onClick={() => onChange(p.value)}
                            className={`w-8 h-8 rounded-lg text-[11px] font-semibold uppercase tracking-wide transition-all duration-300 ${value === p.value
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25 scale-105'
                                : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-500 border border-slate-200/50 dark:border-slate-700/30'
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Slider */}
                <div className="flex-1 relative">
                    <div className="relative h-1.5 bg-slate-200/80 dark:bg-slate-700/60 rounded-full overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-150"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
                        aria-label="Adjust font size"
                    />
                    {/* Thumb indicator */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-full shadow-md pointer-events-none transition-all duration-150 ring-3 ring-emerald-500/10"
                        style={{ left: `calc(${pct}% - 7px)` }}
                    />
                </div>

                {/* Value display */}
                <span className="min-w-[3rem] text-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/[0.08] px-2 py-1 rounded-lg tabular-nums border border-emerald-500/10">
                    {value}px
                </span>
            </div>
        </div>
    );
}
