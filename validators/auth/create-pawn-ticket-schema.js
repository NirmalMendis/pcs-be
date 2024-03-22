const yup = require('yup');

const createPawnTicketSchema = yup.object({
  body: yup.object({
    pawnDate: yup.date().required(),
    dueDate: yup.date().required(),
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
        caratage: yup.number().required(),
        appraisedValue: yup.number().required(),
        pawningAmount: yup.number().required(),
        weight: yup.number().required(),
      }),
    ),
  }),
});

module.exports = createPawnTicketSchema;
