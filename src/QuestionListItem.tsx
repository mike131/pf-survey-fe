import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface IProps {
  questionId: string;
  text: string;
}

const QuestionListItem: FunctionComponent<IProps> = ({ questionId, text }) => {
  return (
    <div className="shadow px-3 py-4">
      <div className="flex justify-between">
        <div>{text}</div>

        <div className="justify-self-end">
          <Link 
            to={`/answer/${questionId}`}
            className="text-blue-500 px-5"
          >
            Answer Question
          </Link>
          <Link 
            to={`/question/${questionId}`}
            className="text-blue-500"
          >
            View Answers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionListItem;
