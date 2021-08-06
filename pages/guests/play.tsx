import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "../../components/atoms";
import answersSlice from "../../redux/slices/answerSlice";
import questionsJson from "../../questions.json";
import { useEffect } from "react";
import { getAnswers } from "../../redux/slices/answerSlice";

const Play = () => {
  const dispatch = useDispatch();

  // const answers = getAnswersState().answers["answers"];
  const answers = useSelector(getAnswers).answers;

  const [code, setCode] = useState("");
  const [question, setQuesiton] = useState("");
  const [currentId, setCurrentId] = useState("1");
  console.log(answers);

  const InputCode = useCallback(
    (event) => {
      if (event.target.value === "'") {
        event.target.value = '"';
      }
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
    <body className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4">
        <div className="text-center">menu</div>
        <br />
        <div className="text-center">ヒント</div>
        <br />
        <div className="text-center">一時停止</div>
        <br />
        <div className="text-center">出力</div>
        <br />
      </div>
      <div className="w-2/4">
        <h1 className="text-center font-mono text-2xl">{question}</h1>
        <TextInput
          fullWidth={true}
          autoFocus={true}
          margin="dense"
          multiline={false}
          required={true}
          rows={1}
          value={code}
          type={"text"}
          variant={"outlined"}
          onChange={InputCode}
          onKeyDown={(e) => Judge(e, code)}
        />
      </div>
      <div className="w-1/4">
        {answers.length > 0 &&
          answers.map((answer: string, index: number) => (
            <div className="ml-24 text-lg" key={index}>
              {index + 1} : {answer}
            </div>
          ))}
      </div>
    </body>
  );
};
export default Play;
