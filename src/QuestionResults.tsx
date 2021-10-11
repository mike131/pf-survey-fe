import { FunctionComponent, useEffect, useState } from "react";
import { withRouter, RouteComponentProps, useParams, Link } from "react-router-dom";
import { io, Socket } from 'socket.io-client';
import { APIResponse, IAnswer } from './APIResponseTypes';

interface IRouteParams {
  questionId: string;
}

const QuestionResults: FunctionComponent<RouteComponentProps<IRouteParams>> =
  () => {
    const socket: Socket = io(`${process.env.REACT_APP_WS_SERVER as string}`, {
      transports: ['websocket', 'polling']
    });
    const { questionId } = useParams<IRouteParams>();
    const [answers, setAnswers] = useState<IAnswer[]>([]);

    useEffect(() => {
      void loadAnswers();

      socket.on('connect', () => {
        // Join the question room
        socket.emit('msg:join', { questionId })
        console.log('Connected to socket ', questionId);
      });

      socket.on('newAnswer', (data) => {
        // Updated list with new answers
        setAnswers([...answers, data]);
      });

      // On Message, load
      return function cleanup () {
        socket.disconnect();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadAnswers() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER as string}/answer/${questionId}`);
        const { data } = (await res.json()) as APIResponse<IAnswer[]>;
        setAnswers(data);
      } catch (e) {
        console.error('QuestionResults: loadAnswers: Error loading answers', e);
      }
    }

    return (
      <div className="container mx-auto">
        <Link to="/" className="text-blue-500">Back To Question List</Link>
        <h1 className="text-8xl text-center mb-5">
          Results
        </h1>
        <div className="answer-list text-left flex flex-col-reverse">
          {answers.map((answer: IAnswer) => (
            <div
              key={answer.id}
              className="text-lg border-2 my-4 py-4 px-2"
            >
              {answer.body}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default withRouter(QuestionResults);
