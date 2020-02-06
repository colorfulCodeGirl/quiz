import React, { Fragment } from "react";
import { withRouter, Redirect } from "react-router";
import classes from "./Question.module.css";
import Button from "../Button/Button";

const Question = props => {
  if (props.questions.length === 0) {
    console.log("here");
    return <Redirect to="/" />;
  }

  const id = props.match.params.id.slice(1);
  if (+id === props.questions.length - 1) {
    props.history.push("/result");
  }

  const answers = [...props.questions[id].incorrect_answers];
  const correctAnswer = props.questions[id].correct_answer;
  const randomIndex = (Math.random() * 3).toFixed(0);
  answers.splice(randomIndex, 0, correctAnswer);

  const submitAnswer = result => {
    props.submitHandler(result);
    props.history.push(`/:${parseFloat(id) + 1}`);
  };

  const answerElements = answers.map(answer => {
    const result = answer === correctAnswer ? true : false;
    return (
      <Button
        type="button"
        name={answer}
        handleClick={() => submitAnswer(result)}
        key={answer}
      />
    );
  });

  const disabledBackButton = id === "0" ? true : false;

  return (
    <Fragment>
      <div className={classes.Navigation}>
        <Button
          type="button"
          disabled={disabledBackButton}
          name="back"
          handleClick={() => {
            props.history.goBack();
          }}
        />
        <Button
          type="button"
          name="skip"
          handleClick={() => {
            props.history.push(`/:${parseFloat(id) + 1}`);
          }}
        />
      </div>
      <div className={classes.Answers}>
        <p className={classes.Question}>{props.questions[id].question}</p>
        {answerElements}
      </div>
    </Fragment>
  );
};

export default withRouter(Question);
