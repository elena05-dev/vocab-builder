import css from "./CircularProgress.module.css";

export default function CircularProgress({ value }) {
  const radius = 14;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className={css.svg}>
      <circle
        stroke="#D4F8D3"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      <circle
        stroke="#2BD627"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className={css.progress}
      />

      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className={css.text}
      >
        {value}%
      </text>
    </svg>
  );
}
