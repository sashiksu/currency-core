import { byCode } from "./data";
import type { CurrencyCode } from "./codes";

export function toMinor(amount: number, code: CurrencyCode): number {
  const currency = byCode.get(code);
  if (!currency) throw new Error(`Unknown currency code: ${code}`);
  return Math.round(amount * Math.pow(10, currency.decimals));
}

export function fromMinor(amount: number, code: CurrencyCode): number {
  const currency = byCode.get(code);
  if (!currency) throw new Error(`Unknown currency code: ${code}`);
  return amount / Math.pow(10, currency.decimals);
}
