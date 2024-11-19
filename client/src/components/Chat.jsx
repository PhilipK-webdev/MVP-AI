import Loader from "./Loader";
import { Divider } from "@mui/material";
//import Logo from "../assets/logo.png";
import newLogo from "../assets/newLogo.png";
import Avatar from "@mui/material/Avatar";
import randomUser from "../assets/randomAvatar.png";
import styled from "styled-components";
function Chat({ conversation, handleOptionClick, loading, lastAnswer }) {
  return (
    <div>
      {conversation.length > 0 &&
        conversation.map((entry, index) => {
          return (
            <ChatContainer key={index}>
              <QuestionContainer>
                {entry.questionAI ? (
                  <QuestionAIContainer>
                    <ImageLogo src={newLogo} />
                    {entry.questionAI}
                  </QuestionAIContainer>
                ) : (
                  <QuestionUserContainer>
                    <QuestionUser>
                      <Avatar
                        src={randomUser}
                        sx={{
                          width: 23,
                          height: 23,
                          marginRight: "5px",
                        }}
                      />
                      {entry.questionUser}
                    </QuestionUser>
                  </QuestionUserContainer>
                )}
              </QuestionContainer>
              {entry.options && (
                <div>
                  {entry.options.map((option, idx) => {
                    return (
                      <button
                        disabled={entry.isAnswer || loading}
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        className={
                          option === entry.userAnswer || option === entry.chat
                            ? "selected-answer"
                            : "subtitle"
                        }
                      >
                        {option}
                      </button>
                    );
                  })}

                  <>
                    {(entry.userAnswer || entry.systemAnswer) && (
                      <Divider style={{ borderColor: "white" }} />
                    )}

                    {(entry.userAnswer || entry.chat) && (
                      <UserAnswerContainer>
                        <Avatar
                          src={randomUser}
                          sx={{
                            width: 23,
                            height: 23,
                            marginRight: "5px",
                          }}
                        />
                        {entry.userAnswer ? entry.userAnswer : entry.chat}
                      </UserAnswerContainer>
                    )}
                    {entry.systemAnswer && (
                      <>
                        <SystemAnswerContainer>
                          <ImageLogo src={newLogo} />
                          <div>{entry.systemAnswer}</div>
                        </SystemAnswerContainer>
                      </>
                    )}
                    {(entry.userAnswer || entry.systemAnswer) && (
                      <Divider style={{ borderColor: "white" }} />
                    )}
                  </>
                </div>
              )}
            </ChatContainer>
          );
        })}
      {loading && lastAnswer && <Loader />}
    </div>
  );
}

const ChatContainer = styled.div`
  margin-bottom: 15px;
`;

const QuestionContainer = styled.div`
  padding-bottom: 10px;
`;

const QuestionAIContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
  border: 1px solid #a092fe;
  padding: 10px;
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background: #fcfffe;
  color: #b5b5b6;
`;

const ImageLogo = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 5px;
  border-radius: 50%;
  background: #a092fe;
`;

const QuestionUserContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: flex-end;
`;

const QuestionUser = styled.div`
  text-align: right;
  font-weight: 500;
  border: 3px solid #526e48;
  padding: 10px;
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background: white;
  color: #526e48;
  display: flex;
  justify-content: center;
`;

const UserAnswerContainer = styled.div`
  text-align: right;
  font-weight: 600;
  border: 1px solid #fcfffe;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background: #a092fe;
  color: white;
  width: 100px;
  display: flex;
  justify-content: center;
  margin-left: auto;
`;

const SystemAnswerContainer = styled.div`
  display: flex;
  font-weight: 500;
  padding: 10px;
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background: #fcfffe;
  color: #b5b5b6;
  width: 100%;
`;
export default Chat;
