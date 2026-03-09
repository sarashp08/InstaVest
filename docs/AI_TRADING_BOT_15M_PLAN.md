# AI Crypto Futures Bot Blueprint (15m) — BTC, ETH, SOL

> **Purpose:** give you a production-ready playbook for building a 15-minute crypto futures bot that targets *consistency first* (risk-adjusted returns), not hype.

## 1) Internet-scouted strategy shortlist (best fit for 15m futures)

I filtered for strategies that are repeatedly discussed in professional crypto/systematic communities and are practical to automate on liquid perpetual futures.

### A. Regime-filtered trend continuation (core)
**Why it works on 15m:** BTC/ETH/SOL often show intraday directional bursts around session opens, macro news, and momentum clustering.

**Entry logic (long example):**
- Higher-timeframe trend filter (1H): price above 200 EMA and ADX(14) > 18.
- 15m pullback into dynamic support (20 EMA or VWAP band).
- Momentum re-acceleration confirmation: breakout of prior 2-candle high + volume > 1.2x 20-bar median.

**Exit / risk:**
- Initial SL = 1.2–1.8 ATR(14) from entry.
- First take-profit at +1R; move stop to break-even after partial.
- Trail remainder by Chandelier Exit (ATR-based).

**Best for:** normal-to-trending sessions, liquid pairs, lower slippage windows.

---

### B. Volatility breakout with false-break filter
**Why it works on 15m:** crypto perpetually compresses then expands; breakouts can be excellent if you avoid fakeouts.

**Entry logic:**
- Squeeze condition: Bollinger bandwidth in bottom 25% of last 30 days (15m).
- Trigger: break above/below range + close outside Keltner or Donchian channel.
- Confirm with order-flow proxy (volume spike and low wick rejection against breakout direction).

**Exit / risk:**
- SL near opposite edge of squeeze box.
- Scale out at 1.5R and 2.5R.
- Time stop: exit if no expansion within 6 bars.

**Best for:** pre/post major events, NY open, sudden risk-on/risk-off windows.

---

### C. Mean reversion in low-trend regime (secondary)
**Why it works on 15m:** in chop, overextensions revert quickly, especially in ETH/SOL.

**Entry logic:**
- Regime gate: ADX(14) < 16 and price near anchored VWAP bands.
- Long when z-score < -2 with bullish divergence or exhaustion wick.
- Short when z-score > +2 with bearish divergence.

**Exit / risk:**
- Target at VWAP / mid-band.
- Tight SL (0.8–1.2 ATR) and strict max holding time (4–8 bars).

**Best for:** range-bound hours and post-impulse cooldown periods.

---

### D. Funding/OI bias overlay (filter, not standalone)
**Why it works:** perpetual futures include funding and positioning distortions that can improve directional confidence when combined with price action.

**Use as filter:**
- Avoid aggressive longs when funding is extremely positive and price is extended.
- Prefer squeeze-breakdown shorts when OI rises into resistance with weak spot follow-through.

**Best for:** avoiding crowded trades and reducing late-trend entries.

---

## 2) Recommended production architecture (what actually goes live)

Use a **hybrid ensemble** instead of one strategy:

- **Primary alpha:** Trend continuation + volatility breakout.
- **Defensive alpha:** Mean reversion only when low-trend gate is active.
- **Meta-controller:** chooses which strategy can trade based on regime classifier.

### Regime classifier (must-have)
Classify each 15m bar into one of:
1. Trend up
2. Trend down
3. Range/chop
4. High-volatility event

Suggested features:
- ADX, ATR percentile, Bollinger bandwidth percentile
- Distance from 1H/4H VWAP and EMAs
- Volume percentile, spread/slippage proxies
- Funding rate and open interest deltas

If classifier confidence < threshold (e.g., 0.55), **don’t trade**.

---

## 3) Risk model for consistency (most important section)

### Position sizing
- Risk per trade: **0.25%–0.75%** of equity (start at 0.35%).
- Max concurrent risk across BTC/ETH/SOL: **1.25%** total.
- Correlation throttle: if all three signals same direction, reduce each size by 30–50%.

### Hard kill-switches
- Daily max loss: 2.0% (stop trading for day).
- Weekly max drawdown: 6% (switch to paper mode).
- Consecutive losses >= 5: cut size by 50% until recovery.
- Abnormal spread/slippage/funding spike: block new entries.

### Execution controls
- Prefer limit-maker when feasible; fall back to IOC only on breakout urgency.
- No entries 3–5 minutes before high-impact macro releases unless strategy explicitly event-enabled.
- Enforce min expected edge after fees + slippage (e.g., EV per trade > 0.15R).

---

## 4) Backtest and validation standards (non-negotiable)

To avoid overfitting, require all of these:
- Walk-forward tests (rolling windows).
- Out-of-sample period from a distinct regime.
- Fee/funding/slippage included realistically.
- Symbol transfer test (train on BTC/ETH, validate on SOL).
- Monte Carlo trade sequence reshuffle.

### Minimum “go-live” thresholds
- Profit factor >= 1.25 net.
- Sharpe (or Sortino) above your baseline benchmark.
- Max drawdown within risk tolerance (target < 12%).
- Positive expectancy after costs on all 3 symbols (or disable laggard symbol).

---

## 5) Best initial parameter ranges (safe starting grid)

- Trend EMA lengths: 20/50 on 15m, 200 on 1H.
- ADX gate: 16–22.
- ATR stop multiplier: 1.2–1.8.
- Breakout lookback: 20–55 bars.
- Volume confirmation: 1.1x–1.8x median.
- Max hold:
  - Trend/breakout: 8–30 bars.
  - Mean reversion: 4–8 bars.

Use Bayesian optimization or constrained random search; avoid huge brute-force grids.

---

## 6) “Ready-to-go” implementation checklist

1. Exchange + account permissions locked (sub-account, API key restrictions, IP allowlist).
2. Unified market data layer (candles, funding, OI, mark/index price).
3. Feature pipeline with strict no-leakage alignment.
4. Strategy engine + regime gate + portfolio risk allocator.
5. Execution engine with retries, idempotency keys, and state reconciliation.
6. Paper trading for 2–4 weeks.
7. Micro-live phase at 10–20% size.
8. Full live only after KPI thresholds sustained.

---

## 7) Critical questions you must answer before build

### A. Exchange & instrument
1. Which exchange(s) are you deploying on (Binance, Bybit, OKX, etc.)?
2. USDT-margined or coin-margined perpetuals?
3. Cross margin or isolated margin by symbol?

### B. Risk & business constraints
4. Starting capital and max acceptable monthly drawdown?
5. Target return style: steady (lower return/lower DD) or aggressive?
6. Max daily loss and whether bot must auto-stop after hitting it?

### C. Execution preferences
7. Market, limit, or hybrid order policy?
8. Max tolerated slippage (bps) per symbol?
9. Should bot avoid trading around CPI/FOMC/NFP/news windows?

### D. Strategy design
10. Do you want one unified model for BTC/ETH/SOL or per-symbol models?
11. Are short trades always allowed, or long-only during bull regime?
12. Should funding/OI data be required for entries or only optional filters?

### E. Operations
13. Preferred stack (Python + ccxt + pandas/polars + backtrader/vectorbt?)
14. Deployment target (local VPS, AWS, GCP, Docker, Kubernetes)?
15. Alerting channel (Telegram/Discord/Slack) and audit logging requirements?

### F. Compliance & safety
16. Jurisdiction/legal constraints for futures trading?
17. Need hard notional caps per trade/symbol/account?
18. Required human-approval mode (semi-auto) before each live order?

---

## 8) My recommended default starting profile (if you want me to proceed immediately)

- Symbols: BTCUSDT, ETHUSDT, SOLUSDT perpetuals.
- Timeframe: 15m entries, 1H regime filter.
- Strategy mix: 60% trend continuation, 30% breakout, 10% mean reversion.
- Per-trade risk: 0.35%; daily stop: 2%; weekly stop: 6%.
- Execution: limit-first, market fallback on breakout confirmations.
- Live rollout: 3 weeks paper + 2 weeks micro-live.

If you answer the 18 questions above, I can convert this into a fully specified bot design doc (data schema, rules, pseudocode, and deployment plan).

## 9) Source links to validate and extend (internet scouting list)

- Binance Academy (futures mechanics, funding, liquidation).
- Bybit Learn (perpetual market structure and risk controls).
- Glassnode insights (market regime and on-chain/derivatives context).
- Kaiko research (liquidity, slippage, market microstructure).
- Exchange API docs (Binance/Bybit/OKX) for execution constraints and order types.
- Academic references on trend-following, breakout systems, and volatility clustering in high-frequency/intraday markets.

> Note: before production, we should benchmark each rule set on your exact exchange fee tier, funding profile, and latency conditions.
