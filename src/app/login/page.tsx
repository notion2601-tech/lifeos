"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // 拼接原生的请求地址
    const endpoint = isLogin 
      ? `${supabaseUrl}/auth/v1/token?grant_type=password`
      : `${supabaseUrl}/auth/v1/signup`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "apikey": supabaseKey!,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        alert((isLogin ? "登录失败: " : "注册失败: ") + (data.msg || data.error_description || data.message));
      } else {
        if (isLogin) {
          alert("登录成功！即将进入系统。");
          // 保存 token 并跳转主页（使用原生跳转）
          localStorage.setItem("supabase_token", data.access_token);
          window.location.href = "/";
        } else {
          alert("注册成功！请点击下方切换到登录。");
          setIsLogin(true);
        }
      }
    } catch (err) {
      alert("网络请求出错，请稍后重试");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6" }}>
      <div style={{ width: "350px", backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#111" }}>Game Life</h1>
        <input
          type="email"
          placeholder="请输入邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px", color: "#111", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px", color: "#111", boxSizing: "border-box" }}
        />
        <button
          onClick={handleSubmit}
          style={{ width: "100%", padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}
        >
          {isLogin ? "登录" : "注册"}
        </button>
        <p
          style={{ textAlign: "center", fontSize: "14px", color: "#2563eb", marginTop: "15px", cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "没有账号？去注册" : "已有账号？去登录"}
        </p>
      </div>
    </div>
  );
}
