import React, { ReactElement, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnswerBox from './AnswerBox';
import { APIResponse, IQuestion } from "./APIResponseTypes";
import QuestionList from './QuestionList';
import QuestionResults from "./QuestionResults";

function App(): ReactElement {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    // Use effect to get question list, load question/answer view if only 1 question
    void loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_SERVER as string}/question`);
      const { data } = (await res.json()) as APIResponse<IQuestion[]>;
      if (data) {
        setQuestions(data);
      }
    } catch (e) {
      console.error("App: loadQuestions failed ", e);
    }
  }

  return (
    <Router>
      <div className="">
        <Switch>
          <Route path="/answer/:questionId" render={({ match }) => {
            const question = questions.find(q => q.id === match.params.questionId) as IQuestion
            return question ? (
              <AnswerBox 
                questionId={question.id} 
                question={question?.body} 
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                disallowed={question.disallowedStrings} 
              />
            ) : '';
          }} />
          <Route path="/question/:questionId">
            <QuestionResults />
          </Route>
          <Route path="/">
            {questions.length ? (
              <QuestionList questions={questions} />) : 'No Questions'
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
