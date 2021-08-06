import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput } from "../../components/";

import { getAnswersState } from "../../reducks/answers/selectors";
import answersSlice from "../../reducks/answers/answerSlice";
import questionsJson from "../../questions.json";
import { useEffect } from "react";

const Play = () => {
  const dispatch = useDispatch();

  const answers = getAnswersState().answers["answers"];

  const [code, setCode] = useState("");
  const [question, setQuesiton] = useState("");
  const [currentId, setCurrentId] = useState("1");

  const InputCode = useCallback(
    (event) => {
      setCode(event.target.value);
    },
    [setCode]
  );

  const questions: { [key: string]: string } = questionsJson.questions.easy;

  useEffect(() => {
    (async () => {
      displayNextQuestion(currentId);
    })();
  }, []);

  const displayNextQuestion = (nextQuestionId: string) => {
    setCurrentId(nextQuestionId);
    setQuesiton(questions[nextQuestionId]);
  };

  const Judge = (e: any, code: string) => {
    if (e.key === "Enter") {
      if (code === question) {
        dispatch(answersSlice.actions.addAnswers(code));
        setCode("");
        let nextQuestionId = (Number(currentId) + 1).toString();
        displayNextQuestion(nextQuestionId);
      } else {
        console.log("コードが違います");
      }
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <h1>{question}</h1>
      <TextInput
        fullWidth={false}
        label={"ここにコードを入力"}
        margin="dense"
        multiline={false}
        required={true}
        rows={1}
        value={code}
        type={"text"}
        onChange={InputCode}
        onKeyDown={(e) => Judge(e, code)}
      />
      <div>
        {answers.length > 0 &&
          answers.map((answer: string, index: number) => (
            <div key={index}>{answer}</div>
          ))}
      </div>
    </div>
  );
};
export default Play;
