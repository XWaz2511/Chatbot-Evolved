import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./Components/Screens/ChatScreen";
import "./Public/Styles/index.scss";
import "floc-off";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={ <ChatPage /> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
