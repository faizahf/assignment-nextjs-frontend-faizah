export const eventOptions = {
    name: {
        required: "Event name is required",
        minLength: {
            value: 5,
            message: "Event name must have at least 5 characters",
        },
        pattern: {
            value: /^(?=\S)(.{5,})$/,
            message: "Input can't only contains or starts with blank space"
        },
    },
    category: {
      required: "Event name is required",
    },
    location: { 
        required: "Event location is required",
        minLength: {
            value: 5,
            message: "Event location must have at least 5 characters",
        },
        pattern: {
            value: /^(?=\S)(.{5,})$/,
            message: "Input can't only contains or starts with blank space"
        },
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
        message: "Maximum price is Rp 999,999,999"
    }
    },
    capacity: {
      required: "Capacity is required",
      type: Number,
      min: {
        value: 1,
        message: "Minimum capacity is 1",
    },
      max: {
        value: 999,
        message: "Maximum capacity is 999",
    }
    },
    date: {
        required: "Date is required",
    },
    startTime: {
        required: "Event date is required",
    },
    duration: {
        required: "Duration is required",
        min: {
          value: 1,
          message: "Minimum duration is 1 hour"
        },
        max: {
          value: 8,
          message: "Maximum duration is 8 hour"
        }
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
            message: "Input can't only contains or starts with blank space"
        },
    },
    
    
  };