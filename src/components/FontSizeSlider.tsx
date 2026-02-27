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
            <div className="flex items-center gap-4">
                {/* Preset buttons */}
                <div className="flex gap-1.5">
                    {PRESETS.map((p) => (
                        <button
                            key={p.label}
                            type="button"
                            onClick={() => onChange(p.value)}
                            className={`w-8 h-8 rounded-lg text-xs font-black uppercase tracking-wide transition-all duration-300 ${value === p.value
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-500'
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Slider */}
                <div className="flex-1 relative">
                    <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
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
                        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                        aria-label="Adjust font size"
                    />
                    {/* Thumb indicator */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-emerald-500 rounded-full shadow-md pointer-events-none transition-all duration-150 ring-4 ring-emerald-500/10"
                        style={{ left: `calc(${pct}% - 8px)` }}
                    />
                </div>

                {/* Value display */}
                <span className="min-w-[3rem] text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                    {value}px
                </span>
            </div>
        </div>
    );
}
