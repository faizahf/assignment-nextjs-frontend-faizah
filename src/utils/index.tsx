export const formatRupiah = (nominal: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(nominal);
};

export const getCategoryName = (categoryNum: number): string => {
  switch (categoryNum) {
    case 1:
      return 'Art';
    case 2:
      return 'Cooking';
    case 3:
      return 'Development';
    case 4:
      return 'Technology';
    case 5:
      return 'Writing'
    default:
      return 'Category is undefined';
  }
}

export const getMembershipName = (memberNum: number): string => {
  switch (memberNum) {
    case 1:
      return 'Silver';
    case 2:
      return 'Gold'
    case 3:
      return 'Platinum';
    default:
      return '';
  }
}

export const getDiscountByMembership = (memberNum: number): number => {
  switch (memberNum) {
    case 1:
      return 10;
    case 2:
      return 15;
    case 3:
      return 20;
    default:
      return 0;
  }
}

export const getDiscountPrice = (currentPrice: number, memberNum: number): number => {
  switch (memberNum) {
    case 1:
      return currentPrice * 0.1;
    case 2:
      return currentPrice * 0.15;
    case 3:
      return currentPrice * 0.2;
    default:
      return currentPrice * 0;
  }
}

export const formatDate = (date: string): string => {
  let transaction_date = new Date(date);
  const formatted_transaction_date = transaction_date.toLocaleDateString(
    "en",
    { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
  );
  return formatted_transaction_date;
};