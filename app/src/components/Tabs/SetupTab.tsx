import React from 'react';
import { Upload, Loader2, Sparkles, Building2, Rocket, Zap, DollarSign, Plus, Trash2 } from 'lucide-react';
import { Category, OutputSubCategory, OutputCategory } from '../../../types';
import type { ProjectSetupData, ProjectInput, ProjectOutput } from '../../../types';

interface SetupTabProps {
  isParsing: boolean;
  selectedFileInfo: string | null;
  lastParseError: string | null;
  errorMsg: string | null;
  setupData: ProjectSetupData;
  userInputs: ProjectInput[];
  userOutputs: ProjectOutput[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateSetup: (key: keyof ProjectSetupData, value: any) => void;
  onUpdateInput: (id: string, updates: Partial<ProjectInput>) => void;
  onRemoveInput: (id: string) => void;
  onAddInput: () => void;
  onUpdateOutput: (id: string, updates: Partial<ProjectOutput>) => void;
  onRemoveOutput: (id: string) => void;
  onAddOutput: () => void;
  onTriggerStakeholders: () => void;
  onTriggerOutcomes: () => void;
  onTriggerFinancials: () => void;
  onTriggerImpactFactors: () => void;
  onTriggerImpactValues: () => void;
  onTriggerSROI: () => void;
  onGoToDashboard: () => void;
}

const SetupTab: React.FC<SetupTabProps> = ({
  isParsing,
  selectedFileInfo,
  lastParseError,
  errorMsg,
  setupData,
  userInputs,
  userOutputs,
  fileInputRef,
  handleFileChange,
  onUpdateSetup,
  onUpdateInput,
  onRemoveInput,
  onAddInput,
  onUpdateOutput,
  onRemoveOutput,
  onAddOutput,
  onTriggerStakeholders,
  onTriggerOutcomes,
  onTriggerFinancials,
  onTriggerImpactFactors,
  onTriggerImpactValues,
  onTriggerSROI,
  onGoToDashboard
}) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 上傳區塊 - 使用按鈕觸發檔案選擇 */}
      <div className="relative flex flex-col items-center justify-center p-20 bg-white border-4 border-dashed border-gray-200 rounded-[4rem] shadow-sm hover:border-indigo-400 transition-all group overflow-hidden">
        {isParsing && (
          <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center backdrop-blur-md animate-in fade-in text-center px-10">
            <Loader2 className="w-24 h-24 text-indigo-600 animate-spin mb-8" />
            <h3 className="text-4xl font-black text-gray-900 mb-2">正在提取計畫數據與定價指標...</h3>
          </div>
        )}
        <div className="bg-indigo-50 p-10 rounded-full mb-10 group-hover:scale-110 transition-transform">
          <Upload className="w-20 h-20 text-indigo-600" />
        </div>
        <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter text-center">PDF 計畫書智慧導入 (SROI 專用)</h2>
        <p className="text-2xl text-gray-700 font-bold mb-12 text-center">AI 將自動識別活動內容並推論每個產出項目的「財務定價數字」</p>
        {selectedFileInfo && (
          <p className="text-xl font-bold text-emerald-600 mb-6 px-6 py-3 bg-emerald-50 rounded-2xl">
            已選擇：{selectedFileInfo}
          </p>
        )}
        {(lastParseError || errorMsg) && (
          <div className="mb-6 w-full max-w-2xl p-6 bg-red-100 border-4 border-red-500 rounded-2xl">
            <p className="text-xl font-black text-red-800 mb-2">錯誤訊息：</p>
            <p className="text-lg font-bold text-red-700 break-words">{lastParseError || errorMsg}</p>
          </div>
        )}
        <input
          id="pdf-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="sr-only"
          accept="application/pdf,.pdf"
          disabled={isParsing}
        />
        <label
          htmlFor={isParsing ? undefined : 'pdf-upload'}
          className={`inline-flex items-center gap-6 bg-gray-900 text-white px-20 py-8 rounded-[3rem] font-black text-3xl hover:bg-indigo-600 shadow-2xl transition-all ${isParsing ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
        >
          <Sparkles className="w-12 h-12 text-indigo-400" />
          <span>立即解析 PDF 並提取定價數據</span>
        </label>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <section className="bg-white p-14 rounded-[3.5rem] shadow-xl border border-gray-100 space-y-10">
          <div className="flex items-center space-x-5"><Building2 className="w-10 h-10 text-indigo-600" /><h3 className="text-4xl font-black tracking-tighter">專案背景</h3></div>
          <div className="grid grid-cols-1 gap-8">
            {[
              { key: 'name', label: '名稱' },
              { key: 'period', label: '期間' },
              { key: 'location', label: '地點' },
              { key: 'type', label: '類型' }
            ].map((item) => (
              <div key={item.key} className="space-y-2">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest">{item.label}</label>
                <input 
                  type="text" 
                  value={(setupData as any)[item.key]} 
                  onChange={(e) => onUpdateSetup(item.key as keyof ProjectSetupData, e.target.value)}
                  className="w-full bg-gray-50 rounded-2xl px-8 py-5 text-2xl font-black outline-none focus:ring-4 focus:ring-indigo-100 transition-all" 
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-14 rounded-[3.5rem] shadow-xl border border-gray-100 space-y-10">
          <div className="flex items-center space-x-5"><Rocket className="w-10 h-10 text-amber-600" /><h3 className="text-4xl font-black tracking-tighter">目標與影響力</h3></div>
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest">計畫動機</label>
              <textarea 
                value={setupData.motivation} 
                onChange={(e) => onUpdateSetup('motivation', e.target.value)}
                className="w-full bg-gray-50 rounded-2xl px-8 py-5 text-2xl font-bold min-h-[140px] outline-none focus:ring-4 focus:ring-indigo-100 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest">預期目標</label>
              <textarea 
                value={setupData.expectedGoals} 
                onChange={(e) => onUpdateSetup('expectedGoals', e.target.value)}
                className="w-full bg-gray-50 rounded-2xl px-8 py-5 text-2xl font-bold min-h-[140px] outline-none focus:ring-4 focus:ring-indigo-100 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest">總投入金額 (NT$)</label>
              <input
                type="number"
                min={0}
                step={1}
                value={Number.isFinite(setupData.funds) ? setupData.funds : 0}
                onChange={(e) => onUpdateSetup('funds', e.target.value === '' ? 0 : Number(e.target.value))}
                className="w-full max-w-md bg-gray-50 rounded-2xl px-8 py-5 text-2xl font-black outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
              <p className="text-sm text-gray-500 font-bold">PDF 解析後可在此微調；用於 SROI 分母（總投入）。</p>
            </div>
          </div>
        </section>
      </div>

      {/* 投入項管理 */}
      <section className="bg-white p-14 rounded-[4rem] shadow-xl border border-gray-100 space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="bg-emerald-100 p-5 rounded-[2rem]"><DollarSign className="w-12 h-12 text-emerald-600" /></div>
            <div>
              <h3 className="text-4xl font-black tracking-tighter">投入項管理 (Inputs)</h3>
              <p className="text-xl text-gray-500 font-bold mt-1">管理專案的人力、場地與物力投入</p>
            </div>
          </div>
          <button onClick={onAddInput} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all flex items-center space-x-3">
            <Plus className="w-6 h-6" />
            <span>新增投入</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-gray-100">
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">類別</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">項目名稱</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">單位成本</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">數量</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">時數/天數</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">總計</th>
                <th className="py-6 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {userInputs.map((inp) => (
                <tr key={inp.id} className="border-b-2 border-gray-50 hover:bg-gray-50/50 transition-all">
                  <td className="py-6 px-4">
                    <select 
                      value={inp.category} 
                      onChange={(e) => onUpdateInput(inp.id, { category: e.target.value as Category })}
                      className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                    >
                      {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="py-6 px-4">
                    <input 
                      type="text" 
                      value={inp.item} 
                      onChange={(e) => onUpdateInput(inp.id, { item: e.target.value })}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                    />
                  </td>
                  <td className="py-6 px-4">
                    <input 
                      type="number" 
                      value={inp.unitCost} 
                      onChange={(e) => onUpdateInput(inp.id, { unitCost: Number(e.target.value) })}
                      className="w-32 bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                    />
                  </td>
                  <td className="py-6 px-4">
                    <input 
                      type="number" 
                      value={inp.quantity} 
                      onChange={(e) => onUpdateInput(inp.id, { quantity: Number(e.target.value) })}
                      className="w-24 bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                    />
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        value={inp.hours} 
                        onChange={(e) => onUpdateInput(inp.id, { hours: Number(e.target.value) })}
                        className="w-20 bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                      />
                      <span className="text-gray-400 font-bold">時 ×</span>
                      <input 
                        type="number" 
                        value={inp.days} 
                        onChange={(e) => onUpdateInput(inp.id, { days: Number(e.target.value) })}
                        className="w-20 bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                      />
                      <span className="text-gray-400 font-bold">天</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-2xl font-black text-gray-900">
                    ${inp.totalValue.toLocaleString()}
                  </td>
                  <td className="py-6 px-4">
                    <button onClick={() => onRemoveInput(inp.id)} className="text-gray-300 hover:text-red-500 transition-all">
                      <Trash2 className="w-8 h-8" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userInputs.length === 0 && <div className="py-20 text-center text-gray-400 text-2xl font-black">尚無投入數據</div>}
        </div>
      </section>

      {/* 產出項管理 */}
      <section className="bg-white p-14 rounded-[4rem] shadow-xl border border-gray-100 space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="bg-indigo-100 p-5 rounded-[2rem]"><Zap className="w-12 h-12 text-indigo-600" /></div>
            <div>
              <h3 className="text-4xl font-black tracking-tighter">產出項管理 (Outputs)</h3>
              <p className="text-xl text-gray-500 font-bold mt-1">管理專案的各項活動產出與社會效益</p>
            </div>
          </div>
          <button onClick={onAddOutput} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all flex items-center space-x-3">
            <Plus className="w-6 h-6" />
            <span>新增產出</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-gray-100">
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">類別</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">項目名稱</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">單位成本</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">數量</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase">總計</th>
                <th className="py-6 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {userOutputs.map((out) => (
                <tr key={out.id} className="border-b-2 border-gray-50 hover:bg-gray-50/50 transition-all">
                  <td className="py-6 px-4">
                    <select 
                      value={out.subCategory} 
                      onChange={(e) => onUpdateOutput(out.id, { subCategory: e.target.value as OutputSubCategory })}
                      className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                    >
                      {Object.values(OutputSubCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="py-6 px-4">
                    <input 
                      type="text" 
                      value={out.item} 
                      onChange={(e) => onUpdateOutput(out.id, { item: e.target.value })}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                    />
                  </td>
                  <td className="py-6 px-4">
                    <input 
                      type="number" 
                      value={out.unitCost} 
                      onChange={(e) => onUpdateOutput(out.id, { unitCost: Number(e.target.value) })}
                      className="w-32 bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                    />
                  </td>
                  <td className="py-6 px-4">
                    <input 
                      type="number" 
                      value={out.quantity} 
                      onChange={(e) => onUpdateOutput(out.id, { quantity: Number(e.target.value) })}
                      className="w-24 bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-bold text-lg outline-none focus:border-indigo-400"
                    />
                  </td>
                  <td className="py-6 px-4 text-2xl font-black text-gray-900">
                    ${out.totalValue.toLocaleString()}
                  </td>
                  <td className="py-6 px-4">
                    <button onClick={() => onRemoveOutput(out.id)} className="text-gray-300 hover:text-red-500 transition-all">
                      <Trash2 className="w-8 h-8" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userOutputs.length === 0 && <div className="py-20 text-center text-gray-400 text-2xl font-black">尚無產出數據</div>}
        </div>
      </section>

      {/* 活動總覽 */}
      <section className="bg-white p-14 rounded-[4rem] shadow-xl border border-gray-100 space-y-14">
        <div className="flex items-center space-x-6">
          <div className="bg-purple-100 p-5 rounded-[2rem]"><Zap className="w-12 h-12 text-purple-600" /></div>
          <div>
            <h3 className="text-4xl font-black tracking-tighter">活動總覽</h3>
            <p className="text-xl text-gray-500 font-bold mt-1">系統已自動識別文件內容，並為每項產出對應財務代理變數</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {setupData.activities.map((act, idx) => (
            <div key={idx} className="relative p-12 bg-[#fafafa] rounded-[3.5rem] border-2 border-gray-100 space-y-10 shadow-inner">
              <div className="absolute top-0 right-0 bg-gray-900 text-white px-10 py-4 rounded-bl-[2.5rem] font-black text-2xl">活動 {idx + 1}</div>
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-400">活動名稱</label>
                <div className="text-3xl font-black text-gray-900">{act.title}</div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-400">活動內容</label>
                <div className="text-xl font-bold text-gray-700 leading-relaxed">{act.content}</div>
              </div>
            </div>
          ))}
          {setupData.activities.length === 0 && <div className="md:col-span-2 py-32 text-center text-gray-400 text-2xl font-black">等待解析計畫書...</div>}
        </div>
      </section>

      {/* 暫時隱藏 Tab 0 底部快捷按鈕（還原時取消註解整段） */}
      {/*
      <div className="flex justify-center pt-10 space-x-6 flex-wrap gap-y-6">
        <button onClick={onTriggerStakeholders} className="flex items-center space-x-6 bg-indigo-600 text-white px-16 py-8 rounded-[3rem] text-3xl font-black hover:bg-indigo-700 transition-all shadow-2xl">
          <Users className="w-10 h-10" />
          <span>AI 盤點利害關係人</span>
        </button>
        <button onClick={onTriggerOutcomes} className="flex items-center space-x-8 bg-purple-600 text-white px-16 py-8 rounded-[3rem] text-3xl font-black hover:bg-purple-700 transition-all shadow-2xl">
          <ArrowRightLeft className="w-10 h-10" />
          <span>AI 推導事件鏈與成果</span>
        </button>
        <button onClick={onTriggerFinancials} className="flex items-center space-x-8 bg-amber-600 text-white px-16 py-8 rounded-[3rem] text-3xl font-black hover:bg-amber-700 transition-all shadow-2xl">
          <DollarSign className="w-10 h-10" />
          <span>AI 推導財務定價</span>
        </button>
        <button onClick={onTriggerImpactFactors} className="flex items-center space-x-8 bg-rose-600 text-white px-16 py-8 rounded-[3rem] text-3xl font-black hover:bg-rose-700 transition-all shadow-2xl">
          <Target className="w-10 h-10" />
          <span>AI 評估影響力因子</span>
        </button>
        <button onClick={onTriggerImpactValues} className="flex items-center space-x-8 bg-emerald-600 text-white px-16 py-8 rounded-[3rem] text-3xl font-black hover:bg-emerald-700 transition-all shadow-2xl">
          <DollarSign className="w-10 h-10" />
          <span>AI 計算影響價值</span>
        </button>
        <button onClick={onTriggerSROI} className="flex items-center space-x-8 bg-indigo-600 text-white px-16 py-8 rounded-[3rem] text-3xl font-black hover:bg-indigo-700 transition-all shadow-2xl">
          <TrendingUp className="w-10 h-10" />
          <span>AI 計算最終 SROI</span>
        </button>
        <button onClick={onGoToDashboard} className="flex items-center space-x-8 bg-gray-900 text-white px-24 py-10 rounded-[3rem] text-4xl font-black hover:bg-emerald-600 transition-all shadow-2xl">
          <span>查看影響力看板 (Step 2)</span>
          <ChevronRight className="w-12 h-12" />
        </button>
      </div>
      */}
    </div>
  );
};

export default SetupTab;
