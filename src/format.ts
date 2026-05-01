import { byCode } from "./data";
import type { CurrencyCode } from "./codes";
import type { FormatOptions } from "./types";

function toCurrencyDisplay(
  variant: FormatOptions["variant"],
): Intl.NumberFormatOptions["currencyDisplay"] {
  if (variant === "narrow") return "narrowSymbol";
  if (variant === "wide") return "name";
  return "symbol";
}

export function format(
  amount: number,
  code: CurrencyCode,
  opts?: FormatOptions,
): string {
  const currency = byCode.get(code.toUpperCase());
  if (!currency) throw new Error(`Unknown currency code: ${code}`);

  if (typeof Intl !== "undefined" && Intl.NumberFormat) {
    try {
      const formatterOpts: Intl.NumberFormatOptions = {
        style: "currency",
        currency: code,
        currencyDisplay: toCurrencyDisplay(opts?.variant),
      };
      if (opts?.signDisplay) formatterOpts.signDisplay = opts.signDisplay;
      return new Intl.NumberFormat(opts?.locale, formatterOpts).format(amount);
    } catch {
      // Intl rejected this code (e.g. crypto ticker not in ISO 4217) — fall through
    }
  }

  // Fallback: sign + symbol + toFixed(decimals)
  const sign = amount < 0 ? "-" : "";
  return `${sign}${currency.symbol}${Math.abs(amount).toFixed(currency.decimals)}`;
}

export function parse(
  input: string,
  code: CurrencyCode,
  opts?: { locale?: string },
): number | null {
  const currency = byCode.get(code.toUpperCase());
  if (!currency) return null;

  if (!input || typeof input !== "string") return null;

  let decimalSep = ".";

  if (typeof Intl !== "undefined" && Intl.NumberFormat) {
    try {
      const parts = new Intl.NumberFormat(opts?.locale).formatToParts(1111.1);
      const dec = parts.find((p) => p.type === "decimal");
      if (dec) decimalSep = dec.value;
    } catch {
      // keep default '.'
    }
  }

  // Split on the decimal separator — a valid number has at most one
  const halves = input.split(decimalSep);
  if (halves.length > 2) return null;

  // Strip everything except digits and a leading minus from the integer part
  const intPart = halves[0].replace(/[^\d-]/g, "");
  const fracPart = halves.length === 2 ? halves[1].replace(/\D/g, "") : "";

  const cleaned = fracPart ? `${intPart}.${fracPart}` : intPart;
  if (!cleaned || cleaned === "-") return null;

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}
