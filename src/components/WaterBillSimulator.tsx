'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Droplets, Info, ChevronRight } from 'lucide-react';

const rateTable: Record<string, { baseVolume: number; baseRate: number }> = {
    '13mm': { baseVolume: 16, baseRate: 1815 },
    '20mm': { baseVolume: 16, baseRate: 1815 },
    '25mm': { baseVolume: 16, baseRate: 2299 },
    '30mm': { baseVolume: 0, baseRate: 3630 },
    '40mm': { baseVolume: 0, baseRate: 4840 },
    '50mm': { baseVolume: 0, baseRate: 6215 },
    '75mm': { baseVolume: 0, baseRate: 12100 },
    '100mm': { baseVolume: 0, baseRate: 78650 },
    '150mm': { baseVolume: 0, baseRate: 94380 },
};

const unitPrice = 155.1;

export default function WaterBillSimulator() {
    const [pipeSize, setPipeSize] = useState<string>('20mm');
    const [usage, setUsage] = useState<number | ''>('');
    const [totalBill, setTotalBill] = useState<number | null>(null);
    const [displayBill, setDisplayBill] = useState(0);

    const handleCalculate = () => {
        if (usage === '' || usage < 0) return;
        const { baseVolume, baseRate } = rateTable[pipeSize];
        let finalAmount = baseRate;
        if (usage > baseVolume) {
            const extraUsage = usage - baseVolume;
            finalAmount += extraUsage * unitPrice;
        }
        setTotalBill(Math.floor(finalAmount));
    };

    // カウントアップアニメーション
    useEffect(() => {
        if (totalBill === null) {
            setDisplayBill(0);
            return;
        }

        const duration = 800; // ms
        const startTime = Date.now();
        const startValue = displayBill;

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // イージング（easeOutQuart）
            const eased = 1 - Math.pow(1 - progress, 4);

            const currentValue = Math.floor(startValue + (totalBill - startValue) * eased);
            setDisplayBill(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [totalBill]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto relative group mt-8"
        >
            {/* 装飾用背景 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-main to-secondary-vibrant rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-glow border border-white/50 overflow-hidden">
                {/* ヘッダー */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-primary-main/10 p-3 rounded-2xl text-primary-main">
                        <Calculator size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-primary-deep leading-tight">料金シミュレーター</h2>
                        <p className="text-text-sub text-xs md:text-sm">2ヶ月分のおおよその目安となります</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* メーター口径 */}
                    <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-black text-primary-deep mb-3 pl-1">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-main text-white text-[10px]">1</span>
                            メーターの口径
                        </label>
                        <div className="relative">
                            <select
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-base md:text-lg appearance-none focus:ring-4 focus:ring-primary-main/10 focus:border-primary-main focus:bg-white transition-all outline-none cursor-pointer font-bold text-primary-deep"
                                value={pipeSize}
                                onChange={(e) => { setPipeSize(e.target.value); setTotalBill(null); }}
                            >
                                <option value="13mm">13mm</option>
                                <option value="20mm">20mm（一般家庭）</option>
                                <option value="25mm">25mm</option>
                                <option value="30mm">30mm</option>
                                <option value="40mm">40mm</option>
                                <option value="50mm">50mm</option>
                                <option value="75mm">75mm</option>
                                <option value="100mm">100mm</option>
                                <option value="150mm">150mm</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-main opacity-40">
                                <ChevronRight className="rotate-90" size={20} />
                            </div>
                        </div>
                    </div>

                    {/* 使用水量 */}
                    <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-black text-primary-deep mb-3 pl-1">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-main text-white text-[10px]">2</span>
                            2ヶ月の使用水量
                        </label>
                        <div className="relative group/input">
                            <input
                                type="number"
                                min="0"
                                placeholder="例: 45"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 pr-16 text-base md:text-lg focus:ring-4 focus:ring-primary-main/10 focus:border-primary-main focus:bg-white transition-all outline-none font-bold text-primary-deep"
                                value={usage}
                                onChange={(e) => { setUsage(e.target.value ? Number(e.target.value) : ''); setTotalBill(null); }}
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-text-sub">
                                m³
                            </div>
                        </div>
                    </div>

                    {/* 計算ボタン */}
                    <button
                        onClick={handleCalculate}
                        className="btn-shine w-full py-5 rounded-2xl bg-gradient-to-r from-primary-deep via-primary-main to-secondary-vibrant text-white font-black text-lg md:text-xl shadow-glow-lg hover:shadow-premium active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                        <CalculatedIcon />
                        <span>計算結果を表示する</span>
                    </button>

                    {/* 結果表示エリア */}
                    <AnimatePresence mode="wait">
                        {totalBill !== null && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="mt-8 p-8 bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] rounded-3xl border border-primary-light/20 text-center relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 text-primary-main opacity-5 pointer-events-none">
                                    <Droplets size={120} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-xs md:text-sm font-bold text-text-sub uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                                        <div className="h-0.5 w-4 bg-primary-main/20 rounded-full" />
                                        Estimated Total
                                        <div className="h-0.5 w-4 bg-primary-main/20 rounded-full" />
                                    </p>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-5xl md:text-7xl font-black text-primary-deep tracking-tighter drop-shadow-sm">
                                            {displayBill.toLocaleString()}
                                        </span>
                                        <span className="text-xl md:text-2xl font-bold text-primary-main">円</span>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-text-sub/70 mt-4 flex items-center justify-center gap-1.5 leading-relaxed bg-white/40 py-2 px-4 rounded-xl">
                                        <Info size={14} className="shrink-0 text-primary-main" />
                                        <span>この結果は概算です。実際の請求額とは異なる場合があります。</span>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

const CalculatedIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
        <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
);
