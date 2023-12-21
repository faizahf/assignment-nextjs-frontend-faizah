export const merchandiseOptions = {
    name: {
      required: "Merchandise name is required",
      minLength: {
        value: 3,
        message: "Merchandise name must have at least 3 characters",
      },
      pattern: {
        value: /^(?=\S)(.{3,})$/,
        message: "Input can't only contains or starts with blank space",
      },
    },
    eventId: {
      required: "Event is required",
    },
    price: {
      required: "Price is required",
      type: Number,
      min: {
        value: 100,
        message: "Minimum price is Rp 100",
      },
      max: {
        value: 999999999,
        message: "Maximum price is Rp 999,999,999",
      },
    },
    stock: {
      required: "Stock is required",
      type: Number,
      min: {
        value: 1,
        message: "Minimum stock is 1",
      },
      max: {
        value: 999,
        message: "Maximum stock is 999",
      },
    },
    image: {
      required: false,
    },
    description: {
      required: "Description is required",
      minLength: {
        value: 5,
        message: "Description must have at least 5 characters",
      },
      maxLength: {
        value: 500,
        message: "Description must have maximum 500 characters",
      },
      pattern: {
        value: /^(?=\S)(.{5,})$/,
        message: "Input can't only contains or starts with blank space",
      },
    },
};