// import swaggerJsdoc from 'swagger-jsdoc';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Payment Gateway API',
//       version: '1.0.0',
//       description: 'Payment Gateway API documentation',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//         description: 'Local server',
//       },
//     ],
//   },
//   apis: ['./routes/*.js'], // This will include your route files to generate documentation
// };

// const specs = swaggerJsdoc(options);

// export default specs;
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Gateway API',
      version: '1.0.0',
      description: 'API for managing payments',
    },
    components: {
      schemas: {
        Payment: {
          type: 'object',
          properties: {
            user_id: { type: 'string', description: 'ID of the user making the payment' },
            amount: { type: 'number', description: 'Amount of the payment' },
            amount_due: { type: 'number', description: 'Amount due for the payment' },
            status: { type: 'string', description: 'Status of the payment', enum: ['pending', 'completed', 'failed'] },
          },
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Make sure this path correctly matches your routes directory
};

const specs = swaggerJsdoc(options);

export default specs;
