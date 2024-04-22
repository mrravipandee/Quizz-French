import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../assets/data';

const Quiz = () => {

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [modal, setModal] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const optionArray = [Option1, Option2, Option3, Option4];

    const checkAns = (element, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                element.target.classList.add("correct");
                setScore(score + 1);
            } else {
                element.target.classList.add("wrong");
                optionArray[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    const nextQuestion = () => {
        if (index + 1 < data.length) {
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            resetOptions();
            setLock(false);
        } else {
            toggleModal();
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    }

    const resetOptions = () => {
        optionArray.forEach(option => {
            if (option.current) {
                option.current.classList.remove("correct", "wrong");
            }
        });
    };

    const restartGame = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        resetOptions();
        setLock(false);
        setModal(!modal);
    };

    return (
        <div className='container'>
            <h1>Quiz app</h1>
            <hr />
            <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(element) => { checkAns(element, 1) }}>{question.option1}</li>
                <li ref={Option2} onClick={(element) => { checkAns(element, 2) }}>{question.option2}</li>
                <li ref={Option3} onClick={(element) => { checkAns(element, 3) }}>{question.option3}</li>
                <li ref={Option4} onClick={(element) => { checkAns(element, 4) }}>{question.option4}</li>
            </ul>
            {/* <div className="score">Score: {score}</div> */}
            <button onClick={nextQuestion}>Next</button>
            <div className="index">
                {index + 1} of {data.length} questions
            </div>

            {modal && (
                <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <h2>Your Score:</h2>
                        <hr />
                        <div className="modal-score">
                            <span>{score}</span>
                        </div>
                        <button onClick={restartGame}>Restart Game</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
};

export default Quiz;
