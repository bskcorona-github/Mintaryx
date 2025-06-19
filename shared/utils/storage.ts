// ローカルストレージヘルパー関数
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("ストレージ保存エラー:", error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};

// 使用履歴の管理
interface HistoryEntry {
  id: number;
  timestamp: string;
  input: any;
  output: any;
}

export const saveUsageHistory = (toolName: string, input: any, output: any) => {
  const history = storage.get<HistoryEntry[]>(`${toolName}_history`, []);
  const newEntry: HistoryEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    input,
    output,
  };

  history.unshift(newEntry);
  // 最新50件のみ保持
  if (history.length > 50) {
    history.splice(50);
  }

  storage.set(`${toolName}_history`, history);
};

export const getUsageHistory = (toolName: string) => {
  return storage.get(`${toolName}_history`, []);
};
