export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // 简单的测试数据，确保能工作
  const testData = [
    { id: 1, name: '红烧肉', description: '经典家常菜' },
    { id: 2, name: '宫保鸡丁', description: '川菜经典' },
    { id: 3, name: '番茄炒蛋', description: '简单快捷' },
    { id: 4, name: '水煮鱼', description: '麻辣鲜香' }
  ];
  
  // 返回JSON数据
  return res.status(200).json(testData);
}
