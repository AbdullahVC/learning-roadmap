type Props = { message: string; onRetry?: () => void };

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div
      role="alert"
      style={{
        marginTop: "12px",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #f3c2c2",
        background: "#ffecec",
        color: "#7a1f1f",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
      }}>
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            border: "1px solid #d99",
            background: "#fff",
            borderRadius: 6,
            padding: "6px 10px",
            cursor: "pointer",
          }}>
          Tekrar dene
        </button>
      )}
    </div>
  );
}
