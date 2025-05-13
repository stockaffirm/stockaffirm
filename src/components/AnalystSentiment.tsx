// eslint-disable-next-line @typescript-eslint/no-explicit-any
"use client";


import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

export default function AnalystSentiment({ data, currentPrice }: { data: any; currentPrice: number }) {
  const targetPrice = parseFloat(data.analysttargetprice);
  const upside = targetPrice && currentPrice ? (((targetPrice - currentPrice) / currentPrice) * 100).toFixed(2) : null;

  const score =
    2 * data.analystratingstrongbuy +
    1 * data.analystratingbuy -
    1 * data.analystratingsell -
    2 * data.analystratingstrongsell;

  const maxScore = 2 * (data.analystratingstrongbuy + data.analystratingbuy + data.analystratinghold + data.analystratingsell + data.analystratingstrongsell);
  const scoreRatio = Math.max(-1, Math.min(1, score / maxScore));
  const pointerRotation = scoreRatio * 90; // -90 to +90 degrees

  const isUp = upside && parseFloat(upside) > 0;

  return (
    <div className="absolute top-6 right-6 text-center flex flex-col items-center gap-3">
      <div className="relative w-64 h-32 overflow-visible">
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="25%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="75%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
          <path d="M10,90 A90,90 0 0,1 190,90" fill="none" stroke="url(#sentimentGradient)" strokeWidth="12" />
          <line
            x1="100"
            y1="90"
            x2="100"
            y2="20"
            stroke="black"
            strokeWidth="3"
            transform={`rotate(${pointerRotation} 100 90)`}
          />
        </svg>
      </div>

<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[80%] text-center">

  <div className="text-[15px] font-semibold whitespace-nowrap text-gray-500">
  Analyst Target Price
</div>


  <div className="text-lg font-bold">
    ${targetPrice.toFixed(2)}
    <sup className={`ml-2 text-sm font-semibold ${isUp ? "text-green-600" : "text-red-600"}`}>
      {isUp ? "+" : ""}{upside}%
    </sup>
  </div>
</div>
    </div>
  );
}
