import { supabase } from "@/lib/supabase";
import Link from "next/link";
import AnalystSentiment from "@/components/AnalystSentiment";

async function fetchGlobalQuote(symbol: string) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=SD2BHB9D9ARCGK44`
  );
  const json = await res.json();
  return json["Global Quote"];
}

export default async function StockPage({
  params
}: {
  params: Promise<{ symbol: string }>
}) {
  const symbol = params.symbol.toUpperCase();

  const quote = await fetchGlobalQuote(symbol);
  const { data: overview } = await supabase
    .from("overview")
    .select(
      "peratio, pegratio, analystratingstrongbuy, analystratingbuy, analystratinghold, analystratingsell, analystratingstrongsell, analysttargetprice"
    )
    .eq("symbol", symbol)
    .single();

  if (!quote || !overview) {
    return (
      <div className="p-4 text-center text-red-600">
        No data found for {symbol}
      </div>
    );
  }

  const change = parseFloat(quote["09. change"]);
  const percent = quote["10. change percent"];
  const isUp = change > 0;
  const textColor = isUp ? "text-green-600" : "text-red-600";

  return (
    <main className="min-h-screen p-6 bg-white relative">
      <div className="relative inline-block">
        <Link
          href={`/stock/${symbol}/overview`}
          className={`text-4xl font-bold ${textColor} relative group leading-none pl-4`}
        >
          {symbol}
        </Link>
        <span
          className={`absolute left-full ml-1 top-0 text-sm font-semibold ${textColor} whitespace-nowrap`}
          style={{ transform: "translateY(-10%)" }}
        >
          {(isUp ? "+" : "") + change.toFixed(2)} ({(isUp ? "+" : "") + percent})
        </span>
      </div>

      <div className="mt-16 text-lg text-gray-700 space-y-2 pl-2"></div>

      <AnalystSentiment
        data={overview}
        currentPrice={parseFloat(quote["05. price"])}
      />
    </main>
  );
}
