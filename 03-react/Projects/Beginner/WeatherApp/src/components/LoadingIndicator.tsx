export default function LoadingIndicator() {
  return (
    <div
      aria-busy="true"
      style={{
        marginTop: "12px",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        opacity: 0.8,
      }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          border: "2px solid #999",
          borderTopColor: "transparent",
          animation: "spin 0.9s linear infinite",
          display: "inline-block",
        }}
      />
      <span>Yükleniyor…</span>
      <style>
        {`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}
      </style>
    </div>
  );
}
