
export enum Category {
  Human = "人（無薪資者／志工）",
  Space = "場地投入",
  Material = "物力投入",
  Other = "其他",
}

export enum OutputCategory {
  Direct = "直接產出",
  Indirect = "間接產出",
}

export enum OutputSubCategory {
  HumanPaid = "人(有薪資者)",
  Activity = "事(活動/服務)",
  Product = "物(實體產品)",
  Social = "社會效益",
  Other = "其他",
}

export interface ActivityExpectedItem {
  label: string;  // 項目名稱
  value: string;  // 數值
  price?: number; // 參考定價
}

export interface ActivityDetail {
  title: string;
  content: string;
  expectedItems: ActivityExpectedItem[];
}

export interface ProjectSetupData {
  name: string;
  period: string;
  location: string;
  type: string;
  motivation: string;
  expectedGoals: string;
  participants: string;
  staff: string;
  /** 總投入金額（新台幣，純數字） */
  funds: number;
  humanResources: string;
  activities: ActivityDetail[];
}

export interface ProjectInput {
  id: string;
  category: Category;
  item: string;
  unitCost: number;
  quantity: number;
  hours: number;
  days: number;
  totalValue: number;
  description: string;
}

export interface ProjectOutput {
  id: string;
  category: OutputCategory;
  subCategory: OutputSubCategory;
  item: string;
  unitCost: number;
  quantity: number;
  totalValue: number;
  description: string;
}

export interface DashboardStats {
  totalInvestment: number;
  totalOutput: number;
  sroiRatio: number;
  inputByCategory: { name: string; value: number }[];
  outputBySubCategory: { name: string; value: number }[];
  inputCount: number;
  outputCount: number;
}

export interface Stakeholder {
  category: string;
  name: string;
  suggestion: string;
  reason: string;
  decision: string;
}

export interface Outcome {
  stakeholder: string;
  input: string;
  output: string;
  chain: string;
  outcome: string;
  decision: string;
}

export interface FinancialProxy {
  stakeholder: string;
  outcome: string;
  proxy: string;
  pricing: string;
}

export interface ImpactFactor {
  stakeholder: string;
  outcome: string;
  deadweight: string;
  displacement: string;
  attribution: string;
  dropOff: string;
}

export interface ImpactValue {
  stakeholder: string;
  outcome: string;
  pricing: string;
  deadweight: string;
  displacement: string;
  attribution: string;
  dropOff: string;
  value: string;
}

export interface SROIFinalResult {
  totalCost: string;
  totalImpactValue: string;
  ratio: string;
  conclusion: string;
}
