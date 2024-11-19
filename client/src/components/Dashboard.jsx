import { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/state.jsx";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import CustomDrawer from "./CustomDrawer.jsx";
import CustomAppBar from "./CustomAppBar.jsx";
import CustomInput from "./CustomInput.jsx";
import Chat from "./Chat.jsx";
function Dashboard() {
  const { selectedId, config, userId } = useContext(StateContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState({});
  const [modifyTopic, setModifyTopic] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentNode, setCurrentNode] = useState();
  const [conversation, setConversation] = useState([]);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [messageUUID, setMessageUUID] = useState("");
  useEffect(() => {
    if ((selectedId || id) && config.length > 0) {
      const data = config[0].topics.filter((f) => f.id === id);
      if (data && Object.keys(data).length > 0) {
        setTopic(data);
        setModifyTopic({ ...data, conversation: [] });
        setCurrentNode(data);
        setConversation([
          {
            role: "system",
            questionAI: data[0].question,
            userAnswer: data[0].userAnswer1 || null,
            options: [...data[0].subtitles],
          },
        ]);
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

  const handleOptionClick = async (data) => {
    const conversationData = [...conversation];
    conversationData.forEach((topics) => {
      topics.options.forEach((option) => {
        if (option.id === data.id) {
          topics.userAnswer = data.key;
        }
      });
    });

    if (data.subtopics) {
      setConversation([
        ...conversationData,
        {
          role: "system",
          questionAI: data.question,
          userAnswer: data.userAnswer2 || null,
          options: data.subtopics,
        },
      ]);
      const promptSting = `Hi chat, give me all information you have on ${data.key}`;
      setPrompt(promptSting);
    } else {
      setConversation([...conversationData]);
      setLoading(true);
      setIsChatEnded(true);
    }

    // setConversation((prev) => {
    //   const updated = [...prev];
    //   console.log(updated);
    //   // dataToModify["conversation"].push({
    //   //   questionAI: updated[updated.length - 1].question,
    //   //   userAnswer: key,
    //   // });
    //   //updated[updated.length - 1].userAnswer = key;
    //   updated[updated.length - 1].isAnswer = true;
    //   const promptSting = `Hi chat, give me all information you have on ${data.key}`;
    //   setPrompt(promptSting);
    //   return updated;
    // });

    // setAnswerTwo(key);
    // const lastAnswer =
    //   currentNode.subtopics &&
    //   currentNode.subtopics.length > 0 &&
    //   currentNode.subtopics.some((s) => s === key);
    // setLastAnswer(lastAnswer);
    // let chatResponse = "";
    // setLoading(true);
    // const dataToModify = { ...modifyTopic };
    // if (lastAnswer) {
    //   try {
    //     let options = {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         uuid: userId || localStorage.getItem("uuid"),
    //         title: `${topic.name} - ${answerOne} and ${key}`,
    //       }),
    //     };
    //     const res = await fetch("/api/add-conversation", options);
    //     if (res.status !== 200) {
    //       throw new Error("Bad Response");
    //     }
    //     const resuuid = await res.json();
    //     setMessageUUID(resuuid);
    //     options = {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         prompt: `${prompt} and ${key}`,
    //         userUUID: userId || localStorage.getItem("uuid"),
    //         messageUUID: resuuid,
    //       }),
    //     };
    //     const response = await fetch("/api/ask", options);
    //     if (response.status !== 200) {
    //       throw new Error("Bad Response");
    //     }
    //     const resChat = await response.json();
    //     chatResponse = resChat;
    //     chatResponse = formatTextToParagraphs(chatResponse.answer);
    //     setConversation((prev) => {
    //       const updated = [...prev];
    //       dataToModify["conversation"].push({
    //         questionAI: updated[updated.length - 1].question,
    //         userAnswer: key,
    //       });
    //       dataToModify["conversation"].push({
    //         questionAI: `${prompt} and ${key}`,
    //         systemAnswer: resChat.answer,
    //       });
    //       updated[updated.length - 1].systemAnswer = chatResponse;
    //       updated[updated.length - 1].chat = key;
    //       updated[updated.length - 1].isAnswer = true;
    //       return updated;
    //     });
    //     setIsChatEnded(true);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   setAnswerOne(key);
    //   setConversation((prev) => {
    //     const updated = [...prev];
    //     dataToModify["conversation"].push({
    //       questionAI: updated[updated.length - 1].question,
    //       userAnswer: key,
    //     });
    //     updated[updated.length - 1].userAnswer = key;
    //     updated[updated.length - 1].isAnswer = true;
    //     const promptSting = `Hi chat, give me all information you have on ${key}`;
    //     setPrompt(promptSting);
    //     return updated;
    //   });
    //   if (currentNode.subtitles && currentNode.subtitles[key]) {
    //     const nextNode = currentNode.subtitles[key];
    //     setCurrentNode(nextNode);
    //     setConversation((prev) => [
    //       ...prev,
    //       {
    //         questionAI: nextNode.question,
    //         questionUser: null,
    //         userAnswer: null,
    //         systemAnswer: null,
    //         isAnswer: false,
    //         options: nextNode.subtopics || [],
    //       },
    //     ]);
    //   }
    // }
    // setModifyTopic({ ...dataToModify });
    // setLoading(false);
  };

  const handleInputSubmit = async (e) => {
    // e.preventDefault();
    // const userInput = e.target.elements.userInput.value;
    // setLoading(true);
    // try {
    //   const options = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       prompt: userInput,
    //       userUUID: userId || localStorage.getItem("uuid"),
    //       messageUUID,
    //     }),
    //   };
    //   const response = await fetch("/api/ask", options);
    //   if (response.status !== 200) {
    //     throw new Error("Bad Response");
    //   }
    //   setLoading(false);
    //   let chatResponse = await response.json();
    //   chatResponse = formatTextToParagraphs(chatResponse.answer);
    //   setConversation((prev) => [
    //     ...prev,
    //     {
    //       questionUser: userInput,
    //       systemAnswer: chatResponse,
    //       options: [],
    //       sender: "system",
    //     },
    //   ]);
    //   e.target.elements.userInput.value = "";
    // } catch (error) {
    //   console.log(error);
    // }
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

      <ConversationContainer>
        <Chat
          conversation={conversation}
          handleOptionClick={handleOptionClick}
          loading={loading}
        />
        {isChatEnded && <CustomInput handleInputSubmit={handleInputSubmit} />}
      </ConversationContainer>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  width: 100%;
  overflow: hidden;
  .subtitle {
    border: 1px solid white;
    padding: 5px;
    margin: 10px 0;
    width: auto;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
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
    width: 100%;
  }
`;

const HeaderComponent = styled.div`
  width: 100%;
`;

const ConversationContainer = styled.div`
  padding: 20px;
`;
export default Dashboard;
