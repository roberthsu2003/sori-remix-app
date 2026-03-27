import React, { useRef, useState } from 'react';
import { Sparkles, Download, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface AIReportTabProps {
  isAnalyzing: boolean;
  analysis: string;
}

/** 顧問報告 Markdown：啟用 GFM（表格、刪除線等）並加上易讀樣式，避免表格以原始 | 語法顯示 */
const reportMarkdownComponents: Components = {
  h1: ({ children }) => <h1 className="text-4xl font-black text-gray-900 mt-12 mb-6 border-b-4 border-purple-100 pb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-black text-gray-900 mt-10 mb-4">{children}</h2>,
  h3: ({ children }) => <h3 className="text-2xl font-black text-gray-800 mt-8 mb-3">{children}</h3>,
  p: ({ children }) => <p className="text-xl text-gray-700 leading-relaxed mb-5">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-8 mb-6 text-xl text-gray-700 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-8 mb-6 text-xl text-gray-700 space-y-2">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-black text-gray-900">{children}</strong>,
  hr: () => <hr className="my-10 border-gray-200" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-purple-400 pl-6 my-6 text-gray-600 italic text-lg">{children}</blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 rounded-2xl border-2 border-gray-200 shadow-sm bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-gray-50/80">{children}</tr>,
  th: ({ children }) => (
    <th className="border border-gray-200 px-4 py-3 text-lg font-black text-gray-900 whitespace-nowrap">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-200 px-4 py-3 text-lg text-gray-800 align-top">{children}</td>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 my-6 text-base text-emerald-100">{children}</pre>
  ),
  code: ({ className, children, ...props }) => {
    if (className?.includes('language-')) {
      return (
        <code className={`${className} text-sm`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-gray-100 px-2 py-0.5 text-lg font-mono text-purple-800" {...props}>
        {children}
      </code>
    );
  },
};

const AIReportTab: React.FC<AIReportTabProps> = ({ isAnalyzing, analysis }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    const element = reportRef.current;
    if (!element || typeof window === 'undefined') return;
    setIsExportingPdf(true);
    try {
      const { default: html2pdf } = await import('html2pdf.js');
      await html2pdf()
        .set({
          margin: [16, 16, 16, 16],
          filename: `SROI顧問報告_${new Date().toISOString().slice(0, 10)}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(element)
        .save();
    } catch (err) {
      console.error('PDF 匯出失敗:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const hasReport = !isAnalyzing && analysis.trim().length > 0;

  return (
    <div className="bg-white rounded-[5rem] p-20 max-w-7xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between mb-16 border-b-4 border-gray-50 pb-16">
        <div className="flex items-center space-x-10">
          <Sparkles className="w-14 h-14 text-purple-600" />
          <h2 className="text-5xl font-black">SROI 永續顧問深度解析</h2>
        </div>
        {hasReport && (
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center space-x-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {isExportingPdf ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>產生 PDF 中...</span>
              </>
            ) : (
              <>
                <Download className="w-6 h-6" />
                <span>下載 PDF</span>
              </>
            )}
          </button>
        )}
      </div>
      <div ref={reportRef}>
        {isAnalyzing ? (
          <div className="py-40 flex flex-col items-center justify-center space-y-8">
            <Loader2 className="w-20 h-20 text-purple-600 animate-spin" />
            <p className="text-3xl font-black text-gray-400">正在深度分析專案數據並生成顧問報告...</p>
          </div>
        ) : (
          <div className="markdown-body max-w-none text-gray-900">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={reportMarkdownComponents}>
              {analysis}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIReportTab;
