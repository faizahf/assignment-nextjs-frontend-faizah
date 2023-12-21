export const topupOptions = {
    source: {
      required: "Source of funds is required",
    },
    amount: {
      required: "Top up amount is required",
      min: {
        value: 50000,
        message: "Top Up amount must be between Rp 50,000 - Rp 10,000,000",
      },
      max: {
        value: 10000000,
        message: "Top Up amount must be between Rp 50,000 - Rp 10,000,000",
      },
    },
};