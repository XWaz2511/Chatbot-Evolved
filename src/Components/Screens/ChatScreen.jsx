import React from "react";
import { useState, useEffect } from "react";

const ChatScreen = () => {
    const [AnswerTemperature, SetAnswerTemperature] = useState(0);

    const UpdateAnswerTemperature = () => {
        SetAnswerTemperature(document.querySelector(".TemperatureSelectorContainer input").value);
    };

    const query = async () => {
        const params = {};

        const DEFAULT_PARAMS = {
            prompt: document.querySelector(".InputText textarea").value,
            model: "text-davinci-002",
            temperature: parseInt(AnswerTemperature),
            max_tokens: 3500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        };

        document.querySelector(".OutputText textarea").value = "Please Wait Until Your Request Is Processed (It Can Take Up To 2 Minutes Following The Complexity And The Length Of Your Instruction(s))...";

        const params_ = { ...DEFAULT_PARAMS, ...params };

        const requestOptions = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + String("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")
            },
            body: JSON.stringify(params_)
        };

        const response = await fetch("https://api.openai.com/v1/completions", requestOptions);

        const data = await response.json();
        
        document.querySelector(".OutputText textarea").value = data.choices[0].text;
    };

    useEffect(() => {
        document.querySelector(".TemperatureSelectorContainer input").value = 0;
    }, []);
    

    return (
        <section>
            <div id="ChatScreen" className="Screen">
                <div className="ChatScreenTitle">
                    <h1>
                        Chatbot Evolved
                    </h1>
                </div>
                <div className="ChatScreenContent">
                    <div className="InOutPutsContainer">
                        <div className="InputText">
                            <textarea placeholder="Please Write Your Instruction(s) Here (Number Of Characters Is Limited To 120 To Avoid AI Bugs)" maxLength="120"></textarea>
                        </div>
                        <div className="OutputText">
                            <textarea placeholder="Your Response Will Be Displayed Right There, Typing Something Here Would Be Useless"></textarea>
                        </div>
                    </div>
                </div>
                <div className="SubmitButtonContainer">
                    <div className="TemperatureSelectorContainer">
                        <label for="TemperatureSelector">
                            Temperature of the answer (0 : very classic and straightforward answer ; 1 : gives the AI a lot of liberty, the answer may be more surprising and original, but also less precise) :
                        </label>
                        <input type="range" min="0" max="1" step="0.1" className="TemperatureSelector" name="TemperatureSelector" onChange={ UpdateAnswerTemperature } />
                        <label for="TemperatureSelector">
                            { "Temperature : " + AnswerTemperature + " / 1" }
                        </label>
                    </div>
                    <button className="SubmitButton" onClick={ query }>
                        Submit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ChatScreen;