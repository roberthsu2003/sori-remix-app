import React from 'react';
import { RotateCcw, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-10 py-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-white/90">
      <div className="flex items-center space-x-6">
        <div className="bg-indigo-600 p-4 rounded-[1.5rem] shadow-lg shadow-indigo-200">
          <LayoutDashboard className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">SROI 投入管理系統</h1>
          <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">Social Return on Investment Management</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button
          onClick={onReset}
          className="px-10 py-5 rounded-2xl font-black text-2xl flex items-center space-x-4 shadow-xl transition-all bg-indigo-600 text-white hover:bg-indigo-700"
          title="清除所有資料並重新開始"
        >
          <RotateCcw className="w-8 h-8" />
          <span>資料帶入</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
