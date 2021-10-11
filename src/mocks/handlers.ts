import { rest } from 'msw';

const API_SERVER = `${process.env.REACT_APP_API_SERVER as string}`;
const WS_SERVER = `${process.env.REACT_APP_WS_SERVER as string}`;

export const handlers = [
  rest.get(`${API_SERVER}/question`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: '',
        data: [
          {
            id: '1123r23rf2424f',
            body: 'Question?',
          },
        ],
      }),
    );
  }),
  rest.get(`${API_SERVER}/answer/*`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: '',
        data: [
          {
            id: '3890f2uyf9823yf0y3',
            body: 'some answer 1',
            questionId: '1123r23rf2424f',
          },
          {
            id: '823y809f2yh328eh9f98efh',
            body: 'some answer 2',
            questionId: '1123r23rf2424f',
          },
        ],
      }),
    );
  }),
];
