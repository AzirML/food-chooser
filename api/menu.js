// api/menu.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 只允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // 从环境变量获取Supabase配置
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('缺少Supabase环境变量');
      return res.status(500).json({ 
        error: '服务器配置错误',
        details: '缺少数据库配置'
      });
    }
    
    // 创建Supabase客户端
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });
    
    // 查询菜品数据 - 只获取name和category两列
    const { data, error } = await supabase
      .from('dishes')
      .select('id, name, category')  // 只选择这两列
      .order('name');
    
    if (error) {
      console.error('数据库查询错误:', error);
      return res.status(500).json({ 
        error: '数据库查询失败',
        details: error.message 
      });
    }
    
    // 返回数据
    return res.status(200).json(data || []);
    
  } catch (error) {
    console.error('API处理错误:', error);
    return res.status(500).json({ 
      error: '服务器内部错误',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
