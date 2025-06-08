export function LogoTempCon({ colapsed }: { colapsed: boolean }) {
  return (
    <svg
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-50 select-none shadow-2xl"
    >
      <text
        x="30"
        y="30"
        className={colapsed ? "font-bold text-[50px]" : "font-bold text-[28px]"}
        fill="currentColor"
      >
        {colapsed ? "" : <tspan className="text-primary">CON</tspan>}
        <tspan className="text-gray-900">TEMP</tspan>
      </text>
    </svg>
  );
}
