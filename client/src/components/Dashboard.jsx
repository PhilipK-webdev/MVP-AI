import { useContext, useState, useEffect, useRef } from "react";
import { StateContext } from "../context/state.jsx";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import CustomDrawer from "./CustomDrawer.jsx";
import CustomAppBar from "./CustomAppBar.jsx";
import { Divider } from "@mui/material";
function Dashboard() {
  const { selectedId, config } = useContext(StateContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isBegin, setIsBegin] = useState(false);
  const [currentNode, setCurrentNode] = useState(); // Start at root
  const [conversation, setConversation] = useState([]); // Track conversation flow
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(false);
  useEffect(() => {
    if ((selectedId || id) && config.length > 0) {
      const data = config[0];
      for (const [key, value] of Object.entries(data)) {
        if (value.id === selectedId || value.id === id) {
          setTopic(data[key]);
          setCurrentNode(data[key]);
          setConversation([
            {
              sender: "system",
              question: data[key].question,
              answer: null,
              options: [...Object.keys(data[key].subtitles)],
            },
          ]);
        }
      }
    }
  }, [config, selectedId, id]);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [conversation, isChatEnded]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleBeginToChat = (e) => {
    e.preventDefault();
    setIsBegin(true);
  };

  const handleOptionClick = async (key) => {
    const lastAnswer =
      currentNode.subtopics &&
      currentNode.subtopics.length > 0 &&
      currentNode.subtopics.some((s) => s === key);
    setLastAnswer(lastAnswer);
    let chatResponse = "";
    if (lastAnswer) {
      try {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Hi chat, give me all information you have on ${key}`,
          }),
        };

        const response = await fetch("/api/ask", options);
        if (response.status !== 200) {
          throw new Error("Bad Response");
        }
        chatResponse = await response.json();
        console.log(chatResponse);
        //loading spinner
        setConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].answer = chatResponse.answer;
          return updated;
        });
        setIsChatEnded(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setConversation((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = key;
        return updated;
      });
      if (currentNode.subtitles && currentNode.subtitles[key]) {
        const nextNode = currentNode.subtitles[key];
        setCurrentNode(nextNode);
        setConversation((prev) => [
          ...prev,
          {
            question: nextNode.question,
            answer: null,
            options: nextNode.subtopics || [],
          },
        ]);
      }
    }
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const userInput = e.target.elements.userInput.value;
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userInput,
        }),
      };

      const response = await fetch("/api/ask", options);
      if (response.status !== 200) {
        throw new Error("Bad Response");
      }
      const chatResponse = await response.json();
      console.log(chatResponse);

      setConversation((prev) => [
        ...prev,
        { question: userInput, answer: chatResponse.answer, options: [] },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardContainer>
      <HeaderComponent>
        <CustomAppBar
          topic={topic}
          handleDrawerOpen={handleDrawerOpen}
          handleBack={handleBack}
        />
        <CustomDrawer open={openDrawer} handleDrawerClose={handleDrawerClose} />
      </HeaderComponent>
      <ButtonContainer>
        <ButtonBegin onClick={handleBeginToChat}>
          {isBegin ? "In conversation" : "Start conversation"}
        </ButtonBegin>
      </ButtonContainer>
      {isBegin && (
        <div style={{ padding: "20px" }}>
          {/* Conversation History */}
          <div>
            {conversation.map((entry, index) => {
              return (
                <div key={index} style={{ marginBottom: "15px" }}>
                  <div style={{ paddingBottom: "10px" }}>{entry.question}</div>
                  {entry.options && (
                    <div>
                      {entry.options.map((option, idx) => {
                        return (
                          <div
                            key={idx}
                            onClick={() => handleOptionClick(option)}
                            className={
                              option === entry.answer
                                ? "selected-answer"
                                : "subtitle"
                            }
                          >
                            {option}
                          </div>
                        );
                      })}

                      {entry.answer && (
                        <>
                          <Divider style={{ borderColor: "white" }} />
                          <div
                            style={{
                              textAlign: "right",
                              padding: "10px 0",
                              fontWeight: "500",
                            }}
                          >
                            {entry.answer}
                          </div>
                          <Divider style={{ borderColor: "white" }} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Input Field if Chat Ends */}
          {isChatEnded && (
            <form
              onSubmit={handleInputSubmit}
              style={{ display: "flex", marginTop: "10px" }}
            >
              <input
                name="userInput"
                type="text"
                placeholder="Message MVP_AI"
                style={{
                  flex: "1",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginRight: "10px",
                  color: "black",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 15px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor: "#007bff",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
          )}
        </div>
        // <div style={{ padding: "20px" }}>
        //   <div style={{ paddingBottom: "10px" }}>{currentNode.question}</div>
        //   <div>
        //     {currentNode.subtitles &&
        //       Object.keys(currentNode.subtitles).map((key) => (
        //         <div
        //           className="subtitle"
        //           key={topic.subtitles[key].id}
        //           onClick={() => handleOptionClick(key)}
        //         >
        //           {key}
        //         </div>
        //       ))}
        //   </div>
        // </div>
        // <div style={{ padding: "20px" }}>
        //   <div style={{ paddingBottom: "10px" }}>{topic.question}</div>
        //   {Object.keys(topic.subtitles).map((sub) => {
        //     return (
        //       <div className="subtitle" key={topic.subtitles[sub].id}>
        //         {sub}
        //       </div>
        //     );
        //   })}
        //   <Divider style={{ borderColor: "white" }} />
        //   <div style={{ textAlign: "right", paddingTop: "10px" }}>Answer</div>
        // </div>
      )}
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;

  .subtitle {
    border: 1px solid white;
    padding: 5px;
    margin: 10px 0;
    width: auto;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
  }

  .selected-answer {
    background: white;
    color: #7615e1;
    font-weight: 700;
    border: 1px solid white;
    padding: 5px;
    margin: 10px 0;
    width: auto;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const HeaderComponent = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;
const ButtonBegin = styled.button`
  width: 62vw;
  height: 20px;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #7615e1;
  color: white;
  border: none;
`;
export default Dashboard;
