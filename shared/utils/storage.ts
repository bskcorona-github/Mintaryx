export interface UsageHistory {
  id: string;
  toolName: string;
  data: Record<string, any>;
  timestamp: number;
}

export const saveUsageHistory = (toolName: string, data: Record<string, any>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getUsageHistory();
    const newEntry: UsageHistory = {
      id: Date.now().toString(),
      toolName,
      data,
      timestamp: Date.now(),
    };
    
    history.push(newEntry);
    
    // 最新100件のみ保存
    const limitedHistory = history.slice(-100);
    
    localStorage.setItem('mintaryx_usage_history', JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Failed to save usage history:', error);
  }
};

export const getUsageHistory = (): UsageHistory[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('mintaryx_usage_history');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get usage history:', error);
    return [];
  }
};

export const clearUsageHistory = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('mintaryx_usage_history');
  } catch (error) {
    console.error('Failed to clear usage history:', error);
  }
};

export const getToolUsageCount = (toolName: string): number => {
  const history = getUsageHistory();
  return history.filter(entry => entry.toolName === toolName).length;
};