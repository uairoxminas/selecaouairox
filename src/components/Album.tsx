"use client";

interface Props {
  checkedDays: number[];
  currentDay: number;
  totalDays: number;
  goldenFrom: number;
}

export default function Album({ checkedDays, currentDay, totalDays, goldenFrom }: Props) {
  const checked = new Set(checkedDays);

  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
      {Array.from({ length: totalDays }, (_, i) => {
        const day = i + 1;
        const isActive = checked.has(day);
        const isGolden = isActive && day >= goldenFrom;
        const isToday = day === currentDay && !isActive;

        let cls = "sticker ";
        if (isGolden) cls += "golden";
        else if (isActive) cls += "active";
        else if (isToday) cls += "today";

        return (
          <div key={day} className={cls} title={`Dia ${day}`}>
            {!isActive && <span className="absolute text-[10px] font-bold opacity-40">{day}</span>}
          </div>
        );
      })}
    </div>
  );
}
