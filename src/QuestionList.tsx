import { FunctionComponent } from 'react';
import { IQuestion } from './APIResponseTypes';
import QuestionListItem from './QuestionListItem';

interface IProps {
  questions: IQuestion[]
}

const QuestionList: FunctionComponent<IProps> = ({ questions }) => {

  return (
    <div className="container text-center mx-auto">
      <h1
        className="text-8xl mb-5"
      >
        Question List
      </h1>
      <div className="question-list flex flex-col justify-center align-center">
        {questions.map((question: IQuestion) => (
          <QuestionListItem
            key={question.id}
            questionId={question.id}
            text={question.body}
          />
        ))}
      </div>
    </div>
  )
};

export default QuestionList;