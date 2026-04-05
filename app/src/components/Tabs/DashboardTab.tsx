import React from 'react';
import { TrendingUp, Loader2, LayoutDashboard, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { SROIFinalResult, ImpactValue } from '../../../types';

interface DashboardTabProps {
  sroiResult: SROIFinalResult | null;
  isCalculating: boolean;
  impactValues: ImpactValue[];
  onTriggerSROI: () => void;
  onNext: () => void;
  COLORS: string[];
}

const DashboardTab: React.FC<DashboardTabProps> = ({
  sroiResult,
  isCalculating,
  impactValues,
  onTriggerSROI,
  onNext,
  COLORS
}) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* SROI 核心結果卡片 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[4rem] border border-gray-200 shadow-2xl p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-4 text-indigo-600 mb-6">
              <TrendingUp className="w-10 h-10" />
              <h2 className="text-3xl font-black">SROI 最終分析結論</h2>
            </div>
            {isCalculating ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-6">
                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
                <p className="text-2xl font-black text-gray-400">正在計算最終 SROI 比值...</p>
              </div>
            ) : sroiResult ? (
              <div className="space-y-8">
                <div className="bg-indigo-50 p-10 rounded-[3rem] border-2 border-indigo-100">
                  <p className="text-4xl font-black text-indigo-900 leading-tight">
                    {sroiResult.conclusion}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <p className="text-gray-500 font-bold text-lg mb-2">總投入成本 (Input)</p>
                    <p className="text-3xl font-black text-gray-900">{sroiResult.totalCost}</p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <p className="text-gray-500 font-bold text-lg mb-2">總影響價值 (Impact)</p>
                    <p className="text-3xl font-black text-emerald-600">{sroiResult.totalImpactValue}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-2xl font-black text-gray-300">尚未進行 SROI 計算</p>
                <button onClick={onTriggerSROI} className="mt-8 bg-indigo-600 text-white px-12 py-5 rounded-3xl font-black text-xl hover:bg-indigo-700 transition-all">
                  立即計算 SROI
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-indigo-900 rounded-[4rem] shadow-2xl p-12 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <h3 className="text-2xl font-bold opacity-80 mb-4 relative z-10">SROI 比值</h3>
          {isCalculating ? (
            <Loader2 className="w-20 h-20 text-white/50 animate-spin" />
          ) : (
            <div className="relative z-10">
              <span className="text-9xl font-black tracking-tighter">{sroiResult?.ratio || "0.00"}</span>
              <p className="text-xl font-bold mt-6 opacity-60">Social Return on Investment</p>
            </div>
          )}
        </div>
      </section>

      {/* 影響力價值分布（依 Tab 5 影響價值列） */}
      <section className="bg-white rounded-[4rem] border border-gray-200 shadow-2xl p-12">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <LayoutDashboard className="w-10 h-10 text-emerald-600" />
            <h2 className="text-3xl font-black">影響力價值分布</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="h-[500px]">
            {impactValues.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xl font-bold text-gray-300">請先完成 Tab 5 影響價值計算</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={impactValues.map((v, i) => {
                      const numericValue = parseFloat(v.value.replace(/[^\d.]/g, '')) || 0;
                      return {
                        name: v.stakeholder,
                        value: numericValue
                      };
                    })}
                    cx="50%"
                    cy="50%"
                    innerRadius={120}
                    outerRadius={180}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {impactValues.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    formatter={(value) => `NT$ ${(value ?? 0).toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="flex flex-col justify-center space-y-6">
            {impactValues.map((v, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-xl font-bold text-gray-700">{v.stakeholder}</span>
                </div>
                <span className="text-2xl font-black text-gray-900">
                  NT$ {(parseFloat(v.value.replace(/[^\d.]/g, '')) || 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <button onClick={onNext} className="flex items-center space-x-8 bg-gray-900 text-white px-24 py-10 rounded-[3rem] text-4xl font-black hover:bg-indigo-600 transition-all shadow-2xl">
          <span>下一步：生成顧問報告</span>
          <ChevronRight className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default DashboardTab;
