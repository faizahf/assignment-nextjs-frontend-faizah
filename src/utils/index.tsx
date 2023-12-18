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
      return 'Writing'
    case 3:
      return 'Cooking';
    case 4:
      return 'Technology';
    case 5:
      return 'Development';
    default:
      return 'Category is undefined';
  }
}