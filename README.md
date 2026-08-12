# 💱 Currency Converter

A real-time currency converter built with **Next.js** and **shadcn/ui**, featuring live exchange rates, historical trend charts, and a clean, responsive interface.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)



<h2>Demo</h2>
<a href="https://currency-convertor-steel-eight.vercel.app/">
  <img src="https://img.shields.io/badge/View%20Site-4A4A4A?style=for-the-badge" />
</a>

<!-- <img width="1257" height="623" alt="image" src="https://github.com/user-attachments/assets/25d40658-e652-494a-a339-1117542a5aac" /> -->
<a href="https://currency-convertor-steel-eight.vercel.app/">
<img width="1220" height="684" alt="Screenshot 2026-08-06 154708" src="https://github.com/user-attachments/assets/31ec5c35-727b-448d-ab61-5283fb8c3f4a" />
</a>

## ✨ Features

- **Live currency conversion** between 150+ world currencies
- **Searchable currency picker** with country flags for quick selection
- **Swap button** to instantly flip the From/To currencies
- **Historical exchange rate chart** with `Last Week`, `1 Month`, and `1 Year` views
- **Interactive tooltips** on the chart showing exact date and rate on hover
- **Percentage change indicator** showing rate movement over the selected period
- Built with **shadcn/ui** components for a polished, accessible UI

## 🖼️ Preview

| Currency Picker | Rate Trend Chart |
|---|---|
| Searchable dropdown with flags | Interactive line chart with timeframe toggle |

*(Add screenshots or a GIF of the app here — see `/screenshots` folder)*

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** Tailwind CSS
- **Charts:** Recharts & shadcn line graph
- **Exchange Rate Data:**  ExchangeRateHost-API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/currency-converter.git
cd currency-converter

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Environment Variables

If the exchange rate API you're using requires a key, create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_api_key_here
```

> ⚠️ Never commit `.env.local` or expose private API keys in client-side code.

## 📁 Project Structure

```
currency-convertor/
├── public/                     # Static assets
│   ├── bg.jpg
│   └── bg2.jpg
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/history/
│   │   │   └── route.js        # API route for historical exchange rate data
│   │   ├── Components/         # Page-level components
│   │   │   ├── ConvertorForm.jsx
│   │   │   ├── CurrencySelect.jsx
│   │   │   └── Graph.jsx       # Exchange rate trend chart
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/             # Shared/shadcn-ui components
│   ├── data/                   # Static data (e.g. currency list)
│   └── lib/                    # Utility functions, API helpers
├── .env                        # Environment variables (not committed)
```


## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- *(Exchange rate API provider)* for currency data
