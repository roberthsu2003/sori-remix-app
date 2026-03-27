import { Category } from '../../types';

/**
 * 依投入類別計算總金額（避免志工項「時薪 × 人數 × 總工時」重複相乘）。
 *
 * - 人（無薪資者／志工）：總價值 = 時薪 × 總工時（hours 為專案總志工時數，不與 quantity 連乘）
 * - 場地投入：單位成本 × 數量 × 天數
 * - 物力投入：單位成本 × 數量
 */
export function computeProjectInputTotalValue(inp: {
  category: string;
  unitCost: number;
  quantity: number;
  hours: number;
  days: number;
}): number {
  const uc = Number(inp.unitCost) || 0;
  const q = Number(inp.quantity) || 0;
  const h = Number(inp.hours) || 0;
  const d = Number(inp.days) || 0;

  const isHuman =
    inp.category === Category.Human || inp.category === '人（無薪資者／志工）';
  const isSpace = inp.category === Category.Space || inp.category === '場地投入';
  const isMaterial = inp.category === Category.Material || inp.category === '物力投入';

  if (isHuman) {
    if (h > 0) {
      return uc * h;
    }
    if (q > 0 && d > 0) {
      return uc * q * d;
    }
    if (q > 0) {
      return uc * q;
    }
    return 0;
  }

  if (isSpace) {
    return uc * (q || 1) * (d || 1);
  }

  if (isMaterial) {
    return uc * (q || 1);
  }

  return uc * (q || 1);
}
