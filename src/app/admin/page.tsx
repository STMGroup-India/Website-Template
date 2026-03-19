"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, BarChart3, Link as LinkIcon, Package, LogIn } from "lucide-react";
import { products } from "@/data/products";

const mockAnalytics = [
  { product: "Sony WH-1000XM5", clicks: 1243, conversions: 89 },
  { product: "GoPro HERO12", clicks: 987, conversions: 67 },
  { product: "MacBook Pro 16\"", clicks: 856, conversions: 23 },
  { product: "DJI Mini 4 Pro", clicks: 743, conversions: 45 },
  { product: "Sony A7 IV", clicks: 654, conversions: 31 },
  { product: "PUMA Speedcat OG", clicks: 521, conversions: 78 },
];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<"products" | "analytics">("products");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-neutral-100 p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center mx-auto mb-3">
              <LogIn size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-neutral-900">Admin Login</h1>
            <p className="text-xs text-neutral-500 mt-1">Sign in to manage your products</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-3">
            <input type="email" placeholder="admin@alextorque.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent" aria-label="Email" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent" aria-label="Password" />
            <button type="submit" className="w-full bg-neutral-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
              Sign In
            </button>
          </form>
          <p className="text-[11px] text-neutral-400 text-center mt-4">Demo: any credentials work</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4 bg-neutral-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <button onClick={() => setLoggedIn(false)} className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            Sign Out
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: products.length, icon: Package },
            { label: "Total Clicks", value: "5,004", icon: BarChart3 },
            { label: "Conversions", value: "333", icon: LinkIcon },
            { label: "Revenue (est.)", value: "$4,280", icon: BarChart3 },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-neutral-100 p-4">
              <card.icon size={18} className="text-neutral-400 mb-2" />
              <p className="text-xl font-bold text-neutral-900">{card.value}</p>
              <p className="text-xs text-neutral-500">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit mb-6">
          {(["products", "analytics"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${tab === t ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="font-semibold text-sm text-neutral-900">All Products</h2>
              <button className="inline-flex items-center gap-1.5 bg-neutral-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-accent transition-colors">
                <Plus size={14} /> Add Product
              </button>
            </div>
            <div className="divide-y divide-neutral-50">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{p.name}</p>
                    <p className="text-xs text-neutral-500">{p.category.replace("-", " ")} · {p.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-neutral-400 hover:text-accent transition-colors" aria-label={`Edit ${p.name}`}>
                      <Edit2 size={14} />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors" aria-label={`Delete ${p.name}`}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
            <div className="p-4 border-b border-neutral-100">
              <h2 className="font-semibold text-sm text-neutral-900">Click Analytics</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left p-4 text-xs font-medium text-neutral-500">Product</th>
                    <th className="text-right p-4 text-xs font-medium text-neutral-500">Clicks</th>
                    <th className="text-right p-4 text-xs font-medium text-neutral-500">Conversions</th>
                    <th className="text-right p-4 text-xs font-medium text-neutral-500">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {mockAnalytics.map((row) => (
                    <tr key={row.product} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4 font-medium text-neutral-900">{row.product}</td>
                      <td className="p-4 text-right text-neutral-600">{row.clicks.toLocaleString()}</td>
                      <td className="p-4 text-right text-neutral-600">{row.conversions}</td>
                      <td className="p-4 text-right">
                        <span className="text-accent font-medium">
                          {((row.conversions / row.clicks) * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
