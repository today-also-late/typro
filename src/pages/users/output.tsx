import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "../../components/atoms";
import {
  addOutputAnswers,
  emptyOutputAnswers,
} from "../../../redux/slices/answersSlice";
import { useEffect } from "react";
import { getAnswers } from "../../../redux/slices/answersSlice";
import { getQuestions } from "../../../redux/slices/questionSlice";
import Router from "next/router";

const Play = () => {
  const dispatch = useDispatch();

  const answers = useSelector(getAnswers).answers; // answers.srcとanswers.outputがある
  const questions = useSelector(getQuestions).questions;

  const [code, setCode] = useState("");
  const [question, setQuesiton] = useState("");
  const [currentId, setCurrentId] = useState("1");
  const [alertText, setAlertText] = useState("");

  const InputCode = useCallback(
    (event) => {
      setAlertText("");
      if (event.target.value.match(/  /)) {
        event.target.value = event.target.value.replace(/  /g, " ");
      }
      setCode(event.target.value);
    },
    [setCode]
  );

  useEffect(() => {
    dispatch(emptyOutputAnswers());
    displayNextQuestion(currentId);
  }, []);

  const displayNextQuestion = (nextQuestionId: string) => {
    setQuesiton(questions["output"][nextQuestionId]);
    setCurrentId(nextQuestionId);
    if (Number(nextQuestionId) > Object.keys(questions["output"]).length) {
      alert("おめでとうございます。クリアです。");
      //   Router.push("/");
    }
  };

  const Judge = (e: any, code: string) => {
    if (e.key === "Enter") {
      if (code.match(/'/)) {
        code = code.replace(/'/g, '"');
      }
      console.log(question);
      if (code === question) {
        dispatch(addOutputAnswers(code));
        setCode("");
        setAlertText("正解です。");
        let nextQuestionId = (Number(currentId) + 1).toString();
        displayNextQuestion(nextQuestionId);
      } else {
        setAlertText("コードが違います。");
      }
    }
  };

  return (
    <body className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4  text-lg">
        {answers.src.length > 0 &&
          answers.src.map((answer: string, index: number) => (
            <div className="ml-24" key={index}>
              {index + 1} : {answer}
            </div>
          ))}
      </div>
      <div className="w-2/4">
        <h1 className="text-center font-mono text-2xl">
          {Number(currentId) <= Object.keys(questions["output"]).length
            ? currentId + "の出力は?"
            : "スコア: 100"}
        </h1>
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
        <div className="text-center text-red-500">{alertText}</div>
      </div>
      <div className="w-1/4  text-lg">
        {answers.output.length > 0 &&
          answers.output.map((answer: string, index: number) => (
            <div className="ml-24" key={index}>
              {index + 1} : {answer}
            </div>
          ))}
      </div>
    </body>
  );
};
export default Play;
