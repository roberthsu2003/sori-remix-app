import { GoogleGenAI, Type } from "@google/genai";
import type { ProjectInput, ProjectOutput } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `# Role
你是一位資深 SROI (社會投資報酬率) 分析師與 ESG 顧問，專精於將質化活動轉化為量化影響力數據。

# Task
你必須根據使用者上傳的 PDF 文件，進行專案結構化分析並推導 SROI 核心要素。

# SROI 核心邏輯 (參考標竿案例與 PDF 規範)
1. **計算公式**：SROI = 影響現值 (Impact Present Value) / 總投入金額 (Total Investment)。
2. **細項對應大項 (Mapping Rules)**：
   所有投入項必須歸類至以下三大類，並套用一致邏輯：
   - **【人 (無薪資者／志工)】**：包含採購、烹飪、送餐、行政、營養師、搬運等志工。
     * 標準時薪：NT$ 196 (搬運工人為 NT$ 300)。
   - **【地 (場地／租金)】**：包含廚房、倉儲、配送點、辦公處、培訓場地。
     * 標準租金：NT$ 1,000 ~ 2,000 / 日。
   - **【物 (贊助／設備／系統)】**：包含各類捐款、補助、食材、設備、系統費。
3. **影響現值 (PV)**：考慮折現率 (預設 1.2%)。
4. **社會價值代理變數 (Social Value Proxies)**：
   - 家屬備餐時間節省：NT$ 760 (時薪 $190 × 4hr)。
   - 預防就醫時間節省：NT$ 1,520 (時薪 $190 × 8hr)。
   - 餐具減量：NT$ 5 / 套。
   - 食材浪費處理：NT$ 30 / 份。
5. **標竿參考**：
   - 100位老人供餐專案：總投入 $2,741,488，產出總計 $26,663,400，**SROI 為 9.7259**。
   - 2017 寶衛地球案例：SROI 為 3.79。

# Guidelines
1. **結構化分析框架**：
   嚴格遵循「企業專案計畫書架構範本」提取資訊，並確保細項正確對應到上述大項。若歸類不明確，請在說明中標示「待確認」。
2. **缺失處理準則**：
   - 若 PDF 中缺乏具體數據，請標記為「未提供」，不得自行編造數據。
   - 對於推論部分，必須標註「分析師建議推估」。

# Output Trigger
請根據使用者的具體指令進行回答，預設以結構化 Markdown 呈現。`;

/**
 * 分析現有數據並提供顧問報告
 */
export const analyzeSROI = async (inputs: ProjectInput[], outputs: ProjectOutput[]) => {
  const model = 'gemini-3-pro-preview';

  const prompt = `
    請根據以下 SROI 專案數據，提供一份專業的影響力報告。
    特別注意：請檢查投入項是否已正確對應到「人、地、物」三大類，並評估其定價是否符合標竿案例邏輯。
    
    【投入項數據 (Inputs)】:
    ${JSON.stringify(inputs, null, 2)}
    
    【產出項數據 (Outputs)】:
    ${JSON.stringify(outputs, null, 2)}
    
    報告應包含：數據總結、價值合理性評估、以及未來優化建議。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "無法生成分析。";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

/**
 * 解析 PDF 計畫書並提取結構化數據
 */
export const parsePDFProposal = async (base64Data: string, mimeType: string) => {
  const model = 'gemini-3-flash-preview';

  const prompt = `
    請仔細閱讀上傳的 PDF 計畫書，並嚴格按照以下結構提取數據。
    
    # 提取規則 (重要)
    1. **投入項對應**：將所有細項歸類為「人（無薪資者／志工）」、「場地投入」或「物力投入」。
    2. **薪資計算**：志工時薪請統一對標 NT$ 196，搬運類對標 NT$ 300。
    3. **標示不明確項**：若某項細項歸類不明確，請在 description 開頭加上 [待確認]。
    4. **志工／人力欄位語意（極重要，避免重複計算）**：
       - 「人（無薪資者／志工）」類別中，**hours 請填「專案總志工時數」**（所有相關活動之工時加總或依 PDF 推算之總工時）。
       - **quantity 請填 1**（或僅作備註之人數說明；後端計算時**不會**用 quantity × hours 連乘）。
       - **不要**同時把「各活動志工人數加總」當成 quantity、又把「總工時」當成 hours，否則會與系統公式衝突。
    5. **場地／物力**：場地可用 quantity（例如場次）與 days（天數）；物力以 quantity 為主。

    請回傳純 JSON 格式：
    {
      "setup": {
        "name": "專案名稱",
        "period": "執行期間",
        "location": "地點",
        "type": "專案類型",
        "motivation": "計畫動機",
        "expectedGoals": "預期目標",
        "participants": "主要參加者",
        "staff": "執行人員",
        "funds": "總投入金額(純數字)",
        "humanResources": "人力投入說明",
        "activities": [
          {
            "title": "活動名稱",
            "content": "活動內容簡述",
            "expectedItems": [
              { "label": "項目名稱", "value": "數值及單位", "price": 數字 }
            ]
          }
        ]
      },
      "inputs": [
        { "category": "人（無薪資者／志工）|場地投入|物力投入", "item": "名稱", "unitCost": 數字, "quantity": 數字, "hours": 數字, "days": 數字, "description": "說明" }
      ],
      "outputs": [
        { "subCategory": "人(有薪資者)|事(活動/服務)|物(實體產品)|社會效益", "item": "名稱", "unitCost": 數字, "quantity": 數字, "param1": 數字, "param2": 數字, "description": "說明" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: mimeType } },
          { text: prompt },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini PDF Parsing Error:", error);
    throw error;
  }
};

/**
 * 盤點專案利害關係人
 */
export const analyzeStakeholders = async (projectData: any) => {
  const model = 'gemini-3-flash-preview';

  const prompt = `
請盤點以下專案的利害關係人，包含直接與間接對象。
專案數據：${JSON.stringify(projectData, null, 2)}

【輸出規範】
1. 嚴格 CSV 格式，無 Markdown。
2. 標題列：類別(直接/間接),利害關係人,系統判斷建議,理由,使用者決策 (按鈕)
3. 「使用者決策 (按鈕)」欄位一律填「待確認」。
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Stakeholder Analysis Error:", error);
    throw error;
  }
};

/**
 * 推導事件鏈與定義成果
 */
export const analyzeOutcomes = async (projectData: any, inputs: ProjectInput[], outputs: ProjectOutput[]) => {
  const model = 'gemini-3-flash-preview';

  const prompt = `
請根據投入與產出推導利害關係人的成果事件鏈。
專案數據：
【基本資訊】: ${JSON.stringify(projectData, null, 2)}
【投入數據】: ${JSON.stringify(inputs, null, 2)}
【產出數據】: ${JSON.stringify(outputs, null, 2)}

【輸出規範】
1. 嚴格 CSV 格式，無 Markdown。
2. 標題列：對象,投入 (來自計畫書),產出 (來自計畫書),推導事件鏈,定義成果,使用者決策 (按鈕)
3. 「推導事件鏈」使用 -> 描述過程。
4. 「使用者決策 (按鈕)」一律填「待確認」。
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Outcome Analysis Error:", error);
    throw error;
  }
};

/**
 * 推導財務代理變數與定價
 */
export const analyzeFinancialProxies = async (stakeholders: any[], outcomes: any[]) => {
  const model = 'gemini-3-flash-preview';

  const prompt = `
請為以下成果推導財務代理變數與合理定價（NTD）。
【利害關係人】: ${JSON.stringify(stakeholders, null, 2)}
【成果】: ${JSON.stringify(outcomes, null, 2)}

【輸出規範】
1. 嚴格 CSV 格式，無 Markdown。
2. 標題列：利害關係人,成果,財務代理變數,定價
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Financial Proxy Analysis Error:", error);
    throw error;
  }
};

/**
 * 評估 SROI 影響力因子 (折減因子)
 */
export const analyzeImpactFactors = async (stakeholders: any[], outcomes: any[]) => {
  const model = 'gemini-3-flash-preview';

  const prompt = `
請評估以下成果的四項折減因子（無謂、移轉、歸因、衰減）。
【利害關係人】: ${JSON.stringify(stakeholders, null, 2)}
【成果】: ${JSON.stringify(outcomes, null, 2)}

【輸出規範】
1. 嚴格 CSV 格式，無 Markdown。
2. 標題列：利害關係人,成果,無謂因子,移轉因子,歸因因子,衰減因子
3. 內容格式：「百分比 (理由)」。
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Impact Factor Analysis Error:", error);
    throw error;
  }
};

/**
 * 計算 SROI 影響價值 (未折現)
 */
export const analyzeImpactValue = async (financials: any[], impactFactors: any[]) => {
  const model = 'gemini-3-flash-preview';

  const prompt = `
請計算影響價值（未折現）。
公式：影響價值 = 定價 × (1 - 無謂因子%) × (1 - 移轉因子%) × (1 - 歸因因子%)。
請參考標竿案例邏輯，確保計算過程嚴謹。

【財務定價】: ${JSON.stringify(financials, null, 2)}
【影響力因子】: ${JSON.stringify(impactFactors, null, 2)}

【輸出規範】
1. 嚴格 CSV 格式，無 Markdown。
2. 標題列：利害關係人,成果,成果定價,無謂因子,移轉因子,歸因因子,衰減因子,影響價值(未折現)
3. 「影響價值(未折現)」欄位請「僅填寫最終計算結果的純數字」，例如：720000。
4. 數值請勿包含逗號或 NT$ 符號，以便系統解析。
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Impact Value Analysis Error:", error);
    throw error;
  }
};

/**
 * 計算最終 SROI 比值與結論
 */
export const calculateFinalSROI = async (totalCost: string, totalImpactValue: string) => {
  const model = 'gemini-3-flash-preview';

  const prompt = `
請計算最終 SROI 比值。
公式：SROI = 總影響現值 / 總投入成本。
註：若為一年期專案，總影響現值可視為總影響價值之折現結果 (參考折現率 1.2%)。
標竿參考：投入 $3,997,650 與 現值 $15,167,250 產生之 SROI 為 3.79。

【總投入成本】: ${totalCost}
【總影響價值 (未折現)】: ${totalImpactValue}

【輸出規範】
1. 嚴格 CSV 格式，無 Markdown。
2. 標題列：總投入成本,總影響價值,SROI比值,結論說明
3. 「SROI比值」欄位請「僅填寫計算結果的純數字」（例如 3.79），四捨五入至小數點後兩位。
4. 結論格式：「本專案每投入 1 元新台幣，將產生 [比值] 元新台幣之社會價值。」
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini SROI Calculation Error:", error);
    throw error;
  }
};
