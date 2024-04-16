const yup = require('yup');

const createPawnTicketSchema = yup.object({
  body: yup.object({
    pawnDate: yup.date().required(),
    periodInMonths: yup.number().required(),
    serviceCharge: yup
      .number()
      .positive()
      .typeError()
      .nullable()
      .transform((_, val) => (val ? Number(val) : null)),
    interestRate: yup.number().positive().required().typeError(),
    customerId: yup.number().positive().required().typeError(),
    items: yup.array().of(
      yup.object().shape({
        description: yup.string().required(),
        appraisedValue: yup.number().required(),
        pawningAmount: yup.number().required(),
        itemDetails: yup.array(),
      }),
    ),
  }),
});

module.exports = createPawnTicketSchema;
