// currencify
export function useCurrencify(amount) {
    let posNegSymbol = '';
    if (amount < 0) posNegSymbol = '-';
    else if (amount > 0) posNegSymbol = '+';
  
    const currencySymbol = '$';
  
    const amountPositive = Math.abs(amount);
  
    const amountFormatted = amountPositive.toLocaleString('en-US', { // Corrected here
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
    
    return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`;
  }