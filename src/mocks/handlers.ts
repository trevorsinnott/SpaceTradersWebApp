import { rest } from 'msw';

const handlers = [
  rest.get(/game\/status/, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 'spacetraders is currently online and available to play',
      })
    );
  }),
];

export default handlers;
