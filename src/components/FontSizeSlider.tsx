'use client';

interface FontSizeSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export default function FontSizeSlider({
    value,
    onChange,
    min = 16,
    max = 48
}: FontSizeSliderProps) {
    return (
        <div className="w-full max-w-sm mx-auto mt-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-600 dark:text-slate-400">Text Size</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{value}px</span>
            </div>

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-600 dark:[&::-webkit-slider-thumb]:bg-slate-400
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-slate-600 dark:[&::-moz-range-thumb]:bg-slate-400
          [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                aria-label="Adjust font size"
            />

            <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-slate-500">Small</span>
                <span className="text-[10px] text-slate-500">Large</span>
            </div>
        </div>
    );
}
