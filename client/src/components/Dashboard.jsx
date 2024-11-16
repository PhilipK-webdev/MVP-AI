import { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/state.jsx";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import CustomDrawer from "./CustomDrawer.jsx";
import CustomAppBar from "./CustomAppBar.jsx";
import { Divider } from "@mui/material";
import Loader from "./Loader.jsx";
import Logo from "../assets/logo.png";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
function Dashboard() {
  const { selectedId, config, userData, setUserData } =
    useContext(StateContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({});
  const [modifyTopic, setModifyTopic] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentNode, setCurrentNode] = useState();
  const [conversation, setConversation] = useState([]);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openOpenConversations, setOpenConverstations] = useState(false);
  const [prompt, setPrompt] = useState("");
  useEffect(() => {
    if ((selectedId || id) && config.length > 0) {
      const data = config[0];
      for (const [key, value] of Object.entries(data)) {
        if (value.id === selectedId || value.id === id) {
          setTopic(data[key]);
          setModifyTopic({ ...data[key], conversation: [] });
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
  const handleReloadPage = (e) => {
    e.preventDefault();
    navigate(0);
  };

  const handleOptionClick = async (key) => {
    const lastAnswer =
      currentNode.subtopics &&
      currentNode.subtopics.length > 0 &&
      currentNode.subtopics.some((s) => s === key);
    setLastAnswer(lastAnswer);
    let chatResponse = "";
    setLoading(true);
    const dataToModify = { ...modifyTopic };
    if (lastAnswer) {
      try {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `${prompt} and ${key}`,
          }),
        };
        const response = await fetch("/api/ask", options);
        if (response.status !== 200) {
          throw new Error("Bad Response");
        }
        const resChat = await response.json();
        chatResponse = resChat;
        chatResponse = formatTextToParagraphs(chatResponse.answer);
        setConversation((prev) => {
          const updated = [...prev];
          dataToModify["conversation"].push({
            question: updated[updated.length - 1].question,
            answer: key,
          });
          dataToModify["conversation"].push({
            question: `${prompt} and ${key}`,
            answer: resChat.answer,
          });
          updated[updated.length - 1].answer = chatResponse;
          updated[updated.length - 1].chat = key;
          return updated;
        });

        setIsChatEnded(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setConversation((prev) => {
        const updated = [...prev];
        dataToModify["conversation"].push({
          question: updated[updated.length - 1].question,
          answer: key,
        });
        updated[updated.length - 1].answer = key;
        const promptSting = `Hi chat, give me all information you have on ${key}`;
        setPrompt(promptSting);
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
    setModifyTopic({ ...dataToModify });
    setLoading(false);
    console.log(modifyTopic);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const userInput = e.target.elements.userInput.value;
    setLoading(true);
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
      setLoading(false);
      let chatResponse = await response.json();
      chatResponse = formatTextToParagraphs(chatResponse.answer);
      setConversation((prev) => [
        ...prev,
        { question: userInput, answer: chatResponse, options: [] },
      ]);

      e.target.elements.userInput.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const formatTextToParagraphs = (inputText) => {
    return inputText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => <p key={index}>{line.trim()}</p>);
  };

  return (
    <DashboardContainer>
      <HeaderComponent>
        <CustomAppBar
          topic={topic}
          handleDrawerOpen={handleDrawerOpen}
          handleBack={handleBack}
          handleReloadPage={handleReloadPage}
        />
        <CustomDrawer open={openDrawer} handleDrawerClose={handleDrawerClose} />
      </HeaderComponent>

      <div style={{ padding: "20px" }}>
        {/* Conversation History */}
        <div>
          {conversation.map((entry, index) => {
            return (
              <div key={index} style={{ marginBottom: "15px" }}>
                <div style={{ paddingBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={Logo}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "5px",
                      }}
                    />
                    {entry.question}
                  </div>
                </div>
                {entry.options && (
                  <div>
                    {entry.options.map((option, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          className={
                            option === entry.answer || option === entry.chat
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
                        {lastAnswer ? (
                          <div
                            style={{
                              textAlign: "left",
                              padding: "10px 0",
                              fontWeight: "500",
                            }}
                          >
                            {entry.answer}
                          </div>
                        ) : (
                          <div
                            style={{
                              textAlign: "right",
                              padding: "10px 0",
                              fontWeight: "500",
                            }}
                          >
                            {entry.answer}
                          </div>
                        )}
                        <Divider style={{ borderColor: "white" }} />
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {loading && lastAnswer && <Loader />}
        </div>

        {isChatEnded && (
          <form
            onSubmit={handleInputSubmit}
            style={{ display: "flex", marginTop: "10px" }}
          >
            <Input
              id="standard-adornment-amount"
              disableUnderline={true}
              type="text"
              autoFocus={true}
              name="userInput"
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid white",
                color: "white",
                width: "100%",
              }}
              startAdornment={
                <InputAdornment position="end">
                  <AccountCircle
                    sx={{
                      mr: 1,
                      my: 0.5,
                      color: "white",
                    }}
                  />
                </InputAdornment>
              }
            />
          </form>
        )}
      </div>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  width: 100%;
  height: 100vh;
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
  margin-top: 80px;
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
