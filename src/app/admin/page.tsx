"use client";
import { useState } from "react";
import {
  Plus, Edit2, Trash2, BarChart3, Package, LogIn,
  Film, ShoppingBag, Handshake, X, Save, Eye, EyeOff, Mail, Calendar,
  Building2, MessageSquare, CheckCircle, Clock, XCircle,
} from "lucide-react";
import { products as initialProducts, Product, categories } from "@/data/products";

interface ContentItem { id: string; type: "reel" | "video"; title: string; thumbnail: string; url: string; visible: boolean; }
interface CollabInquiry { id: string; name: string; email: string; company: string; message: string; date: string; status: "new" | "replied" | "declined"; }

const initialContent: ContentItem[] = [
  { id: "c1", type: "reel", title: "Monaco GP Paddock Tour", thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=800&fit=crop", url: "#", visible: true },
  { id: "c2", type: "video", title: "My Race Weekend Camera Setup", thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop", url: "#", visible: true },
  { id: "c3", type: "reel", title: "Best F1 Merch Haul 2025", thumbnail: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&h=800&fit=crop", url: "#", visible: true },
  { id: "c4", type: "video", title: "Tech I Pack for Every Grand Prix", thumbnail: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&h=400&fit=crop", url: "#", visible: true },
  { id: "c5", type: "reel", title: "Silverstone Vlog Day 1", thumbnail: "https://images.unsplash.com/photo-1625758476104-f2ed6c81248e?w=600&h=800&fit=crop", url: "#", visible: true },
  { id: "c6", type: "video", title: "Product Demo: GoPro at 200mph", thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop", url: "#", visible: true },
];
const initialInquiries: CollabInquiry[] = [
  { id: "q1", name: "Sarah Chen", email: "sarah@redbullracing.com", company: "Red Bull Racing", message: "We'd love to discuss a content partnership for the upcoming season.", date: "2026-03-14", status: "new" },
  { id: "q2", name: "Marco Rossi", email: "marco@pirelli.com", company: "Pirelli Motorsport", message: "Interested in a tyre tech explainer series with your audience.", date: "2026-03-12", status: "replied" },
  { id: "q3", name: "James Wright", email: "james@mclaren.com", company: "McLaren", message: "Paddock access content collaboration for Silverstone GP.", date: "2026-03-10", status: "new" },
  { id: "q4", name: "Lisa Park", email: "lisa@gopro.com", company: "GoPro", message: "Product seeding + affiliate deal for HERO13 launch.", date: "2026-03-08", status: "declined" },
];
const mockAnalytics = [
  { product: "Sony WH-1000XM5", clicks: 1243, conversions: 89 },
  { product: "GoPro HERO12", clicks: 987, conversions: 67 },
  { product: 'MacBook Pro 16"', clicks: 856, conversions: 23 },
  { product: "DJI Mini 4 Pro", clicks: 743, conversions: 45 },
  { product: "Sony A7 IV", clicks: 654, conversions: 31 },
  { product: "PUMA Speedcat OG", clicks: 521, conversions: 78 },
];
type Tab = "products" | "content" | "collabs" | "analytics";

const inputCls = "w-full px-3 py-2.5 glass-input rounded-xl text-sm text-white placeholder:text-white/20";

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4" onClick={onClose}>
      <div className="glass-card rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h3 className="font-semibold text-white font-display">{title}</h3>
          <button onClick={onClose} className="p-1 text-white/30 hover:text-white transition-colors" aria-label="Close"><X size={18} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium text-white/30 mb-1.5">{label}</label>{children}</div>;
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>("products");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [productList, setProductList] = useState<Product[]>([...initialProducts]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [contentList, setContentList] = useState<ContentItem[]>([...initialContent]);
  const [editContent, setEditContent] = useState<ContentItem | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [inquiries, setInquiries] = useState<CollabInquiry[]>([...initialInquiries]);
  const [viewInquiry, setViewInquiry] = useState<CollabInquiry | null>(null);

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); setLoggedIn(true); };
  const openNewProduct = () => { setEditProduct({ id: `p${Date.now()}`, name: "", description: "", price: "", image: "", affiliateUrl: "", category: "tech", isFavorite: false, review: "" }); setShowProductModal(true); };
  const openEditProduct = (p: Product) => { setEditProduct({ ...p }); setShowProductModal(true); };
  const saveProduct = () => { if (!editProduct) return; setProductList((prev) => { const idx = prev.findIndex((p) => p.id === editProduct.id); if (idx >= 0) { const next = [...prev]; next[idx] = editProduct; return next; } return [...prev, editProduct]; }); setShowProductModal(false); setEditProduct(null); };
  const deleteProduct = (id: string) => setProductList((prev) => prev.filter((p) => p.id !== id));
  const openNewContent = () => { setEditContent({ id: `c${Date.now()}`, type: "reel", title: "", thumbnail: "", url: "", visible: true }); setShowContentModal(true); };
  const openEditContent = (c: ContentItem) => { setEditContent({ ...c }); setShowContentModal(true); };
  const saveContent = () => { if (!editContent) return; setContentList((prev) => { const idx = prev.findIndex((c) => c.id === editContent.id); if (idx >= 0) { const next = [...prev]; next[idx] = editContent; return next; } return [...prev, editContent]; }); setShowContentModal(false); setEditContent(null); };
  const deleteContent = (id: string) => setContentList((prev) => prev.filter((c) => c.id !== id));
  const toggleContentVisibility = (id: string) => { setContentList((prev) => prev.map((c) => c.id === id ? { ...c, visible: !c.visible } : c)); };
  const updateInquiryStatus = (id: string, status: CollabInquiry["status"]) => { setInquiries((prev) => prev.map((q) => q.id === id ? { ...q, status } : q)); setViewInquiry(null); };
  const statusIcon = (s: CollabInquiry["status"]) => { if (s === "new") return <Clock size={14} className="text-amber-400" />; if (s === "replied") return <CheckCircle size={14} className="text-green-400" />; return <XCircle size={14} className="text-white/20" />; };
  const statusLabel = (s: CollabInquiry["status"]) => s === "new" ? "New" : s === "replied" ? "Replied" : "Declined";

  if (!loggedIn) {
    return (
      <div className="pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm glass-card rounded-2xl p-8 glow-border" style={{ borderRadius: "1rem" }}>
          <div className="text-center mb-6">
            <div className="w-12 h-12 btn-neon rounded-xl flex items-center justify-center mx-auto mb-3"><LogIn size={20} className="text-white" /></div>
            <h1 className="text-xl font-bold text-white font-display">Admin Login</h1>
            <p className="text-xs text-white/30 mt-1">Sign in to manage your site</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-3">
            <input type="email" placeholder="admin@alextorque.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} aria-label="Email" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} aria-label="Password" />
            <button type="submit" className="w-full btn-neon text-white py-2.5 rounded-xl text-sm font-semibold">Sign In</button>
          </form>
          <p className="text-[11px] text-white/20 text-center mt-4">Demo: any credentials work</p>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: "products", label: "Products", icon: <ShoppingBag size={15} />, count: productList.length },
    { key: "content", label: "Content", icon: <Film size={15} />, count: contentList.length },
    { key: "collabs", label: "Collabs", icon: <Handshake size={15} />, count: inquiries.filter((q) => q.status === "new").length },
    { key: "analytics", label: "Analytics", icon: <BarChart3 size={15} /> },
  ];

  return (
    <div className="pt-24 pb-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white font-display">Dashboard</h1>
          <button onClick={() => setLoggedIn(false)} className="text-sm text-white/30 hover:text-accent transition-colors">Sign Out</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{ label: "Products", value: productList.length, icon: Package }, { label: "Content", value: contentList.filter((c) => c.visible).length, icon: Film }, { label: "New Inquiries", value: inquiries.filter((q) => q.status === "new").length, icon: Mail }, { label: "Est. Revenue", value: "$4,280", icon: BarChart3 }].map((card) => (
            <div key={card.label} className="glass-card rounded-xl p-4">
              <card.icon size={18} className="text-accent/50 mb-2" />
              <p className="text-xl font-bold text-white font-display">{card.value}</p>
              <p className="text-xs text-white/30">{card.label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-1 glass-card rounded-xl p-1 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${tab === t.key ? "glass-card text-white" : "text-white/30 hover:text-white"}`}>
              {t.icon} {t.label}
              {t.count !== undefined && <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${tab === t.key ? "bg-accent text-white" : "bg-white/[0.06] text-white/30"}`}>{t.count}</span>}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="font-semibold text-sm text-white">All Products ({productList.length})</h2>
              <button onClick={openNewProduct} className="inline-flex items-center gap-1.5 btn-neon text-white px-4 py-2 rounded-lg text-xs font-semibold"><Plus size={14} /> Add</button>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {productList.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors">
                  <img src={p.image || "https://via.placeholder.com/48"} alt={p.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><p className="text-sm font-medium text-white truncate">{p.name}</p>{p.isFavorite && <span className="text-[10px] bg-accent/20 text-accent-light px-1.5 py-0.5 rounded-full font-medium">Fav</span>}</div>
                    <p className="text-xs text-white/30">{p.category.replace("-", " ")} · {p.price}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEditProduct(p)} className="p-2 text-white/20 hover:text-accent transition-colors" aria-label={`Edit ${p.name}`}><Edit2 size={14} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors" aria-label={`Delete ${p.name}`}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "content" && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="font-semibold text-sm text-white">Reels & Videos ({contentList.length})</h2>
              <button onClick={openNewContent} className="inline-flex items-center gap-1.5 btn-neon text-white px-4 py-2 rounded-lg text-xs font-semibold"><Plus size={14} /> Add</button>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {contentList.map((c) => (
                <div key={c.id} className={`flex items-center gap-4 p-4 transition-colors ${c.visible ? "hover:bg-white/[0.03]" : "opacity-40"}`}>
                  <img src={c.thumbnail} alt={c.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><p className="text-sm font-medium text-white truncate">{c.title}</p><span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${c.type === "reel" ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}>{c.type === "reel" ? "Reel" : "Video"}</span></div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => toggleContentVisibility(c.id)} className={`p-2 transition-colors ${c.visible ? "text-green-400" : "text-white/20"}`} aria-label={c.visible ? "Hide" : "Show"}>{c.visible ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                    <button onClick={() => openEditContent(c)} className="p-2 text-white/20 hover:text-accent transition-colors" aria-label="Edit"><Edit2 size={14} /></button>
                    <button onClick={() => deleteContent(c.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors" aria-label="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "collabs" && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]"><h2 className="font-semibold text-sm text-white">Brand Inquiries ({inquiries.length})</h2></div>
            <div className="divide-y divide-white/[0.04]">
              {inquiries.map((q) => (
                <button key={q.id} onClick={() => setViewInquiry(q)} className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors text-left">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center flex-shrink-0"><Building2 size={16} className="text-accent" /></div>
                  <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><p className="text-sm font-medium text-white truncate">{q.name}</p><span className="text-[10px] text-white/20">{q.company}</span></div><p className="text-xs text-white/30 truncate">{q.message}</p></div>
                  <div className="flex items-center gap-2 flex-shrink-0"><span className="flex items-center gap-1 text-xs text-white/30">{statusIcon(q.status)} {statusLabel(q.status)}</span></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "analytics" && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]"><h2 className="font-semibold text-sm text-white">Click Analytics</h2></div>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/[0.06]"><th className="text-left p-4 text-xs font-medium text-white/30">Product</th><th className="text-right p-4 text-xs font-medium text-white/30">Clicks</th><th className="text-right p-4 text-xs font-medium text-white/30">Conv.</th><th className="text-right p-4 text-xs font-medium text-white/30">Rate</th></tr></thead>
              <tbody className="divide-y divide-white/[0.04]">
                {mockAnalytics.map((row) => (
                  <tr key={row.product} className="hover:bg-white/[0.03] transition-colors"><td className="p-4 font-medium text-white">{row.product}</td><td className="p-4 text-right text-white/50">{row.clicks.toLocaleString()}</td><td className="p-4 text-right text-white/50">{row.conversions}</td><td className="p-4 text-right"><span className="text-accent font-semibold">{((row.conversions / row.clicks) * 100).toFixed(1)}%</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal open={showProductModal} onClose={() => { setShowProductModal(false); setEditProduct(null); }} title={editProduct && productList.some((p) => p.id === editProduct.id) ? "Edit Product" : "Add Product"}>
          {editProduct && (<div className="space-y-4">
            <Field label="Name"><input value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className={inputCls} /></Field>
            <Field label="Description"><textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} className={inputCls + " resize-none"} rows={2} /></Field>
            <div className="grid grid-cols-2 gap-4"><Field label="Price"><input value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} className={inputCls} /></Field><Field label="Category"><select value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className={inputCls + " bg-transparent"}>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></Field></div>
            <Field label="Image URL"><input value={editProduct.image} onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })} className={inputCls} /></Field>
            <Field label="Affiliate URL"><input value={editProduct.affiliateUrl} onChange={(e) => setEditProduct({ ...editProduct, affiliateUrl: e.target.value })} className={inputCls} /></Field>
            <Field label="Review"><textarea value={editProduct.review || ""} onChange={(e) => setEditProduct({ ...editProduct, review: e.target.value })} className={inputCls + " resize-none"} rows={3} /></Field>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={editProduct.isFavorite} onChange={(e) => setEditProduct({ ...editProduct, isFavorite: e.target.checked })} className="w-4 h-4 rounded border-white/20 text-accent focus:ring-accent bg-transparent" /><span className="text-sm text-white/60">Creator Favorite</span></label>
            <button onClick={saveProduct} className="w-full btn-neon inline-flex items-center justify-center gap-2 text-white py-2.5 rounded-xl text-sm font-semibold"><Save size={14} /> Save</button>
          </div>)}
        </Modal>

        <Modal open={showContentModal} onClose={() => { setShowContentModal(false); setEditContent(null); }} title={editContent && contentList.some((c) => c.id === editContent.id) ? "Edit Content" : "Add Content"}>
          {editContent && (<div className="space-y-4">
            <Field label="Title"><input value={editContent.title} onChange={(e) => setEditContent({ ...editContent, title: e.target.value })} className={inputCls} /></Field>
            <Field label="Type"><select value={editContent.type} onChange={(e) => setEditContent({ ...editContent, type: e.target.value as "reel" | "video" })} className={inputCls + " bg-transparent"}><option value="reel">Reel</option><option value="video">Video</option></select></Field>
            <Field label="Thumbnail URL"><input value={editContent.thumbnail} onChange={(e) => setEditContent({ ...editContent, thumbnail: e.target.value })} className={inputCls} /></Field>
            <Field label="Content URL"><input value={editContent.url} onChange={(e) => setEditContent({ ...editContent, url: e.target.value })} className={inputCls} /></Field>
            <button onClick={saveContent} className="w-full btn-neon inline-flex items-center justify-center gap-2 text-white py-2.5 rounded-xl text-sm font-semibold"><Save size={14} /> Save</button>
          </div>)}
        </Modal>

        <Modal open={!!viewInquiry} onClose={() => setViewInquiry(null)} title="Inquiry">
          {viewInquiry && (<div className="space-y-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full glass-card flex items-center justify-center"><Building2 size={16} className="text-accent" /></div><div><p className="font-semibold text-white">{viewInquiry.name}</p><p className="text-xs text-white/30">{viewInquiry.company}</p></div></div>
            <div className="flex items-center gap-4 text-xs text-white/30"><span className="flex items-center gap-1"><Mail size={12} /> {viewInquiry.email}</span><span className="flex items-center gap-1"><Calendar size={12} /> {viewInquiry.date}</span></div>
            <div className="glass-card rounded-xl p-4"><div className="flex items-start gap-2"><MessageSquare size={14} className="text-white/20 mt-0.5 flex-shrink-0" /><p className="text-sm text-white/60 leading-relaxed">{viewInquiry.message}</p></div></div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => updateInquiryStatus(viewInquiry.id, "replied")} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-600/80 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-500 transition-colors"><CheckCircle size={14} /> Replied</button>
              <button onClick={() => updateInquiryStatus(viewInquiry.id, "declined")} className="flex-1 inline-flex items-center justify-center gap-1.5 btn-glass text-white/60 py-2.5 rounded-xl text-sm font-medium"><XCircle size={14} /> Decline</button>
            </div>
          </div>)}
        </Modal>
      </div>
    </div>
  );
}
