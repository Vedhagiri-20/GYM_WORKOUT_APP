import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AccessDenied() {
const { user } = useAuth();
return (
<div style={{
minHeight: "100vh",
display: "grid",
placeItems: "center",
padding: 24,
fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
textAlign: "center",
background: "radial-gradient(circle at 20% 20%, #ffe4e1 0, #fff 40%), radial-gradient(circle at 80% 30%, #e0f2ff 0, #fff 35%)",
}}>
<div>
<h1 style={{ fontSize: 48, marginBottom: 8 }}>Access Denied</h1>
<p style={{ fontSize: 16, opacity: 0.8 }}>
{user ? `Your role "${user.role}" doesn't have permission for this page.` : "You don't have permission for this page."}
</p>
<div style={{ marginTop: 24 }}>
<Link to="/" style={{ padding: "10px 16px", borderRadius: 12, border: "1px solid #ddd" }}>Go Home</Link>
</div>
</div>
</div>
);
}