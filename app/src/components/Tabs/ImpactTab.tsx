import React from 'react';
import { Target, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import type { ImpactFactor } from '../../../types';

interface ImpactTabProps {
  impactFactors: ImpactFactor[];
  isAnalyzing: boolean;
  onTriggerAnalysis: () => void;
  onNext: () => void;
}

const ImpactTab: React.FC<ImpactTabProps> = ({
  impactFactors,
  isAnalyzing,
  onTriggerAnalysis,
  onNext
}) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section className="bg-white rounded-[4rem] border border-gray-200 shadow-2xl overflow-hidden">
        <div className="px-12 py-10 flex items-center justify-between text-white bg-rose-600">
          <div className="flex items-center space-x-6">
            <Target className="w-12 h-12" />
            <div>
              <h2 className="text-4xl font-black">
                AI 影響力因子評估 (折減因子)
                <span className="ml-2 text-xs font-medium text-white/65 align-middle">持續開發中</span>
              </h2>
              <p className="text-xl font-bold opacity-80 mt-1">評估無謂、移轉、歸因與衰減因子，確保 SROI 數值的精確性與公信力</p>
            </div>
          </div>
          {!isAnalyzing && (
            <button onClick={onTriggerAnalysis} className="bg-white text-rose-600 px-8 py-4 rounded-2xl font-black text-xl hover:bg-rose-50 transition-all flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>重新分析</span>
            </button>
          )}
        </div>
        
        {isAnalyzing ? (
          <div className="py-40 flex flex-col items-center justify-center space-y-8">
            <Loader2 className="w-20 h-20 text-rose-600 animate-spin" />
            <p className="text-3xl font-black text-gray-400">正在運用專業視角評估四項折減因子...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed min-w-[1600px]">
              <thead className="bg-gray-50 border-b-4 border-gray-100">
                <tr className="text-gray-800 text-xl font-black uppercase tracking-wide">
                  <th className="px-10 py-8 w-[10%]">利害關係人</th>
                  <th className="px-10 py-8 w-[15%]">成果</th>
                  <th className="px-10 py-8 w-[18.75%]">無謂因子 (Deadweight)</th>
                  <th className="px-10 py-8 w-[18.75%]">移轉因子 (Displacement)</th>
                  <th className="px-10 py-8 w-[18.75%]">歸因因子 (Attribution)</th>
                  <th className="px-10 py-8 w-[18.75%]">衰減因子 (Drop-off)</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-100">
                {impactFactors.map((f, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/50 transition-colors text-xl font-bold">
                    <td className="px-10 py-8 text-2xl font-black text-gray-900">{f.stakeholder}</td>
                    <td className="px-10 py-8 text-indigo-700 leading-relaxed">{f.outcome}</td>
                    <td className="px-10 py-8">
                      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="text-rose-600 font-black mb-1">{f.deadweight.split(' ')[0]}</div>
                        <div className="text-sm text-gray-500 font-medium leading-tight">{f.deadweight.substring(f.deadweight.indexOf('('))}</div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="text-rose-600 font-black mb-1">{f.displacement.split(' ')[0]}</div>
                        <div className="text-sm text-gray-500 font-medium leading-tight">{f.displacement.substring(f.displacement.indexOf('('))}</div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="text-rose-600 font-black mb-1">{f.attribution.split(' ')[0]}</div>
                        <div className="text-sm text-gray-500 font-medium leading-tight">{f.attribution.substring(f.attribution.indexOf('('))}</div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="text-rose-600 font-black mb-1">{f.dropOff.split(' ')[0]}</div>
                        <div className="text-sm text-gray-500 font-medium leading-tight">{f.dropOff.substring(f.dropOff.indexOf('('))}</div>
                      </div>
                    </td>
                  </tr>
                ))}
                {impactFactors.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-32 text-center text-gray-400 text-2xl font-black">
                      尚未進行分析，請點擊上方按鈕開始
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
      
      <div className="flex justify-center">
        <button onClick={onNext} className="flex items-center space-x-8 bg-emerald-600 text-white px-24 py-10 rounded-[3rem] text-4xl font-black hover:bg-emerald-700 transition-all shadow-2xl">
          <span>下一步：計算影響價值</span>
          <ChevronRight className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default ImpactTab;
