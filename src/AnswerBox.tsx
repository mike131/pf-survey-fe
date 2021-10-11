import { FormEvent, FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIResponse, IAnswer } from './APIResponseTypes';

interface IProps {
  questionId: string;
  question: string;
  disallowed: string[];
}

const AnswerBox: FunctionComponent<IProps> = ({ questionId, question, disallowed }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setError('');
    setSuccess('');

    if (!isAnswerValid(answer)) {
      setError(`'${answer}' is not allowed.`);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await submitAnswer();

      if (result?.id) {
        setSuccess('Successfully submitted answer!');
        // Clear answer so user can submit a new answer
        setAnswer('');
      }
    } catch (e) {
      console.error('AnswerBox: handleFormSubmit ', e);
    }
  };

  const isAnswerValid = (answer: string) => {
    let additionalValidation = true;

    // Do basic checking of our answer against the disallowed values
    if (disallowed && disallowed.length) {
      additionalValidation = disallowed.filter((disallowedString) => 
        disallowedString.toLowerCase() === answer.toLowerCase()).length <= 0;
    }

    return answer.length && additionalValidation;
  }

  async function submitAnswer(): Promise<IAnswer> {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const res = await fetch(`${process.env.REACT_APP_API_SERVER}/answer/${questionId}` , {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: answer
        })
      })

      const { data } = (await res.json()) as APIResponse<IAnswer>;
      return data;
    } catch (e) {
      console.error('AnswerBox: submitAnswer ', e);
    }
    
    return {} as IAnswer;
  }

  return (
    <div className="container mx-auto max-w-xlg">
      <Link to="/" className="text-blue-500">Back To List</Link>
      <div 
        className="border-2 px-5 py-24 border-black text-7xl text-center"
      >
        {question}
      </div>
      <form 
        className="my-3 flex flex-col justify-center" 
        onSubmit={handleFormSubmit}
      >
        {error.length ? (
          <div
            className="text-red-500 text-center text-xl py-3"
          >
            {error}
          </div>
        ): ''}
        <label 
          className="border-1 shadow text-center"
          htmlFor="answer"
        >
          <input 
            id="answer"
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            className="border-1 px-3 py-2 w-full shadow text-3xl text-center"
          />
        </label>
        <button
          className="block mt-3 bg-green-500 text-white py-2 px-4 rounded"
        >
          Answer!
        </button>
        {success ? (
          <div
            className="text-center text-lg text-green-500 font-medium"
          >
            {success}
          </div>
        ) : ''}
      </form>
    </div>
  );
};

export default AnswerBox;
