import css from "./TrainingProgress.module.css";

export default function TrainingProgress({ completed, total }) {
  const radius = 22;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const safeCompleted = Number(completed) || 0;
  const safeTotal = Number(total) || 0;

  const percent =
    safeTotal > 0 ? Math.round((safeCompleted / safeTotal) * 100) : 0;

  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className={css.wrapper}>
      <svg height={radius * 2} width={radius * 2} className={css.svg}>
        <circle
          stroke="#fff"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="#85AA9F"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={css.text}
        >
          {percent}
        </text>
      </svg>
    </div>
  );
}
