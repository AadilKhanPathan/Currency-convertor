// FIRST API

export const dynamic = 'force-static'; // <--- ADD THIS LINE AT THE TOP

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

    const res = await fetch(
      `https://api.exchangerate.host/timeframe?access_key=${API_KEY}&start_date=${start}&end_date=${end}&source=${from}&currencies=${to}`
    );

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// SECOND API

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);

//   const from = searchParams.get("from");
//   const to = searchParams.get("to");
//   const start = searchParams.get("start");
//   const end = searchParams.get("end");

//   const res = await fetch(
//     `https://api.frankfurter.app/${start}..${end}?from=${from}&to=${to}`
//   );

//   if (!res.ok) {
//     return Response.json(
//       { error: "Failed to fetch exchange rates" },
//       { status: res.status }
//     );
//   }

//   const data = await res.json();

//   return Response.json(data);
// }