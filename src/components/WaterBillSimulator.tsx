'use client';
import { useState } from 'react';
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
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-blue-100 mt-8">
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">水道料金かんたんシミュレーター（2ヶ月分）</h2>
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">① メーターの口径を選んでください</label>
                    <select className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 bg-gray-50" value={pipeSize} onChange={(e) => { setPipeSize(e.target.value); setTotalBill(null); }}>
                        <option value="13mm">13mm</option><option value="20mm">20mm（一般家庭）</option><option value="25mm">25mm</option><option value="30mm">30mm</option><option value="40mm">40mm</option><option value="50mm">50mm</option><option value="75mm">75mm</option><option value="100mm">100mm</option><option value="150mm">150mm</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">② 2ヶ月の使用水量を入力してください (m³)</label>
                    <input type="number" min="0" placeholder="例: 45" className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 bg-gray-50" value={usage} onChange={(e) => { setUsage(e.target.value ? Number(e.target.value) : ''); setTotalBill(null); }} />
                </div>
                <button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-lg transition-colors shadow-sm">料金を計算する</button>
                {totalBill !== null && (
                    <div className="mt-6 p-5 bg-blue-50 rounded-lg border-2 border-blue-200 text-center animate-fade-in">
                        <p className="text-sm font-bold text-gray-600 mb-2">2ヶ月分の水道料金（税込）</p>
                        <p className="text-4xl font-extrabold text-blue-800 tracking-tight">{totalBill.toLocaleString()} <span className="text-xl font-medium">円</span></p>
                        <p className="text-xs text-gray-500 mt-3 text-left">※この計算結果は概算です。実際の請求額（下水道使用料が含まれる場合など）とは異なる場合があります。</p>
                    </div>
                )}
            </div>
        </div>
    );
}
