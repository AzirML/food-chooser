// api/menu.js - 完全不依赖Supabase
export default async function handler(req, res) {
  try {
    // 允许CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    // 处理OPTIONS预检请求
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // 只允许GET请求
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // 固定的测试数据
    const dishes = [
      { id: 1, name: '红烧肉', description: '经典家常菜，肥而不腻' },
      { id: 2, name: '宫保鸡丁', description: '川菜经典，麻辣鲜香' },
      { id: 3, name: '番茄炒蛋', description: '简单快捷，营养丰富' },
      { id: 4, name: '水煮鱼', description: '麻辣鲜香，鱼肉嫩滑' },
      { id: 5, name: '麻婆豆腐', description: '麻辣下饭，豆腐嫩滑' },
      { id: 6, name: '清炒时蔬', description: '健康清爽，原汁原味' }
    ];
    
    // 成功返回
    return res.status(200).json(dishes);
    
  } catch (error) {
    // 错误处理
    console.error('API错误:', error);
    return res.status(500).json({ 
      error: '服务器内部错误',
      message: error.message 
    });
  }
}
