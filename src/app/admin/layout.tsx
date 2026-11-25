export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-root min-h-screen bg-[#14171a] text-white/90 text-[14px] font-normal">
      <style>{`
        .admin-root *{cursor:auto}
        .admin-root button,.admin-root summary,.admin-root select,.admin-root label{cursor:pointer}
        .admin-root input,.admin-root textarea,.admin-root select{background:#14171a;border:1px solid rgba(255,255,255,.15);border-radius:6px;color:#fff;padding:8px 10px;width:100%;font:inherit;font-size:14px;outline:none}
        .admin-root input:focus,.admin-root textarea:focus,.admin-root select:focus{border-color:#f0b31c}
        .admin-root input[type=checkbox]{width:auto}
        .admin-root input[type=file]{display:none}
        .admin-root textarea{resize:vertical;line-height:1.5}
        .admin-root summary{list-style:none}
        .admin-root summary::-webkit-details-marker{display:none}
        .admin-root ::-webkit-scrollbar{display:block!important;width:10px;height:10px}
        .admin-root ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:6px}
        .admin-root,.admin-root *{scrollbar-width:auto!important;-ms-overflow-style:auto!important}
      `}</style>
      {children}
    </div>
  );
}
