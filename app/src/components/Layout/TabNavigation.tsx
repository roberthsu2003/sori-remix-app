import React from 'react';
import { FileText, Users, ArrowRightLeft, DollarSign, Target, Banknote, LayoutDashboard, Sparkles, Lock } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isSetupComplete: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, isSetupComplete }) => {
  const tabs = [
    { id: 'setup', label: '0. 計畫解析', icon: <FileText /> },
    { id: 'stakeholders', label: '1. 利害關係人', icon: <Users /> },
    { id: 'outcomes', label: '2. 成果推導', icon: <ArrowRightLeft /> },
    { id: 'financials', label: '3. 財務定價', icon: <DollarSign /> },
    { id: 'impact', label: '4. 影響力因子', icon: <Target /> },
    { id: 'values', label: '5. 影響價值', icon: <Banknote /> },
    { id: 'dashboard', label: '6. 影響力看板', icon: <LayoutDashboard /> },
    { id: 'ai', label: '7. 顧問報告', icon: <Sparkles /> }
  ];

  return (
    <nav className="flex flex-wrap gap-3 items-center bg-gray-200/50 p-3 rounded-[3rem] w-fit shadow-inner">
      {tabs.map((tab) => {
        const isSetup = tab.id === 'setup';
        const isLocked = !isSetup && !isSetupComplete;
        return (
          <button
            key={tab.id}
            onClick={() => !isLocked && setActiveTab(tab.id)}
            disabled={isLocked}
            title={isLocked ? '請先完成 Tab 0 計畫解析（上傳 PDF 或輸入專案數據）' : undefined}
            className={`flex items-center space-x-4 px-10 py-6 rounded-[2.5rem] text-2xl font-black transition-all ${
              isLocked
                ? 'opacity-50 cursor-not-allowed text-gray-400'
                : activeTab === tab.id
                  ? 'bg-white shadow-2xl text-indigo-700 scale-105'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            {isLocked ? <Lock className="w-8 h-8" /> : tab.icon}
            <span className="flex items-baseline gap-2 flex-wrap">
              <span>{tab.label}</span>
              {(tab.id === 'impact' || tab.id === 'values') && (
                <span className="text-[11px] font-normal tracking-wide text-gray-400/90">持續開發中</span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default TabNavigation;
