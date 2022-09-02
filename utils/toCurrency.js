export default function toCurrency(value) {
  return new Intl.NumberFormat("fil-PH", {
    style: "currency",
    currency: "PHP",
    currencyDisplay: "narrowSymbol",
  }).format(value);
}
