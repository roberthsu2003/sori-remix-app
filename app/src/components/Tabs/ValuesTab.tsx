import React from 'react';
import { Banknote, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import type { ImpactValue } from '../../../types';

interface ValuesTabProps {
  impactValues: ImpactValue[];
  isAnalyzing: boolean;
  onTriggerAnalysis: () => void;
  onNext: () => void;
}

const ValuesTab: React.FC<ValuesTabProps> = ({
  impactValues,
  isAnalyzing,
  onTriggerAnalysis,
  onNext
}) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section className="bg-white rounded-[4rem] border border-gray-200 shadow-2xl overflow-hidden">
        <div className="px-12 py-10 flex items-center justify-between text-white bg-emerald-600">
          <div className="flex items-center space-x-6">
            <Banknote className="w-12 h-12" />
            <div>
              <h2 className="text-4xl font-black">
                AI 影響價值計算 (未折現)
                <span className="ml-2 text-xs font-medium text-white/65 align-middle">持續開發中</span>
              </h2>
              <p className="text-xl font-bold opacity-80 mt-1">統整定價與折減因子，精確計算每項成果創造的淨社會價值</p>
            </div>
          </div>
          {!isAnalyzing && (
            <button onClick={onTriggerAnalysis} className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black text-xl hover:bg-emerald-50 transition-all flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>重新計算</span>
            </button>
          )}
        </div>
        
        {isAnalyzing ? (
          <div className="py-40 flex flex-col items-center justify-center space-y-8">
            <Loader2 className="w-20 h-20 text-emerald-600 animate-spin" />
            <p className="text-3xl font-black text-gray-400">正在統整數據並計算淨社會影響價值...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed min-w-[1600px]">
              <thead className="bg-gray-50 border-b-4 border-gray-100">
                <tr className="text-gray-800 text-xl font-black uppercase tracking-wide">
                  <th className="px-10 py-8 w-[10%]">利害關係人</th>
                  <th className="px-10 py-8 w-[15%]">成果</th>
                  <th className="px-10 py-8 w-[12%]">成果定價</th>
                  <th className="px-10 py-8 w-[10%]">無謂</th>
                  <th className="px-10 py-8 w-[10%]">移轉</th>
                  <th className="px-10 py-8 w-[10%]">歸因</th>
                  <th className="px-10 py-8 w-[33%]">影響價值 (未折現)</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-100">
                {impactValues.map((v, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/50 transition-colors text-xl font-bold">
                    <td className="px-10 py-8 text-2xl font-black text-gray-900">{v.stakeholder}</td>
                    <td className="px-10 py-8 text-indigo-700 leading-relaxed">{v.outcome}</td>
                    <td className="px-10 py-8 text-gray-900">{v.pricing}</td>
                    <td className="px-10 py-8 text-rose-600">{v.deadweight.split(' ')[0]}</td>
                    <td className="px-10 py-8 text-rose-600">{v.displacement.split(' ')[0]}</td>
                    <td className="px-10 py-8 text-rose-600">{v.attribution.split(' ')[0]}</td>
                    <td className="px-10 py-8">
                      <div className="bg-emerald-900 text-emerald-400 p-6 rounded-3xl font-mono text-lg shadow-inner border border-emerald-800">
                        {v.value}
                      </div>
                    </td>
                  </tr>
                ))}
                {impactValues.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-32 text-center text-gray-400 text-2xl font-black">
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
        <button onClick={onNext} className="flex items-center space-x-8 bg-gray-900 text-white px-24 py-10 rounded-[3rem] text-4xl font-black hover:bg-emerald-600 transition-all shadow-2xl">
          <span>下一步：查看影響力看板</span>
          <ChevronRight className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default ValuesTab;
