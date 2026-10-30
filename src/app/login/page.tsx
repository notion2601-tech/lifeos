"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("登录失败: " + error.message);
      else window.location.href = "/dashboard";
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert("注册失败: " + error.message);
      else alert("注册成功，请点击登录");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1b26]">
      <div className="w-[350px] rounded-lg bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-black">Game Life</h1>
        <input
          type="email"
          placeholder="请输入邮箱"
          className="mb-4 w-full rounded border p-2 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="请输入密码"
          className="mb-4 w-full rounded border p-2 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          {isLogin ? "登录" : "注册"}
        </button>
        <p
          className="mt-4 cursor-pointer text-center text-sm text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "没有账号？去注册" : "已有账号？去登录"}
        </p>
      </div>
    </div>
  );
}
