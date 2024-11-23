import Loader from "./Loader";
import { Divider } from "@mui/material";
import Logo from "../assets/logo.png";
import newLogo from "../assets/newLogo.png";
import Avatar from "@mui/material/Avatar";
import randomUser from "../assets/randomAvatar.png";
import styled from "styled-components";

function Chat({ conversation, handleOptionClick, loading }) {
  return (
    <div>
      {conversation.length > 0 &&
        conversation.map((entry, index) => {
          return (
            <ChatContainer key={index}>
              <QuestionContainer>
                {entry.questionAI ? (
                  <QuestionAIContainer>
                    <ImageLogo src={Logo} />
                    {entry.questionAI}
                  </QuestionAIContainer>
                ) : (
                  entry.questionUser && (
                    <QuestionUserContainer>
                      <QuestionUser>
                        {/* <Avatar
                          src={randomUser}
                          sx={{
                            width: 23,
                            height: 23,
                            marginRight: "5px",
                          }}
                        /> */}
                        {entry.questionUser}
                      </QuestionUser>
                    </QuestionUserContainer>
                  )
                )}
              </QuestionContainer>
              {entry.systemAnswer ? (
                <>
                  {entry.userAnswer && (
                    <Divider style={{ borderColor: "white" }} />
                  )}

                  {entry.userAnswer && (
                    <UserAnswerContainer>
                      {/* <Avatar
                        src={randomUser}
                        sx={{
                          width: 23,
                          height: 23,
                          marginRight: "5px",
                        }}
                      /> */}
                      {entry.userAnswer}
                    </UserAnswerContainer>
                  )}
                  {entry.systemAnswer && (
                    <>
                      <SystemAnswerContainer>
                        <ImageLogo src={Logo} />
                        <div>{entry.systemAnswer}</div>
                      </SystemAnswerContainer>
                    </>
                  )}
                  {entry.userAnswer && (
                    <Divider style={{ borderColor: "white" }} />
                  )}
                </>
              ) : (
                entry.options && (
                  <div>
                    {entry.options.map((option, idx) => {
                      return (
                        <button
                          disabled={entry.userAnswer || loading}
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          className={
                            option.key === entry.userAnswer
                              ? "selected-answer"
                              : "subtitle"
                          }
                        >
                          {option.key}
                        </button>
                      );
                    })}

                    <>
                      {entry.userAnswer && (
                        <Divider style={{ borderColor: "white" }} />
                      )}

                      {entry.userAnswer && (
                        <UserAnswerContainer>
                          {/* <Avatar
                            src={randomUser}
                            sx={{
                              width: 23,
                              height: 23,
                              marginRight: "5px",
                            }}
                          /> */}
                          {entry.userAnswer}
                        </UserAnswerContainer>
                      )}
                      {entry.systemAnswer && (
                        <>
                          <SystemAnswerContainer>
                            <ImageLogo src={Logo} />
                            <div>{entry.systemAnswer}</div>
                          </SystemAnswerContainer>
                        </>
                      )}
                      {entry.userAnswer && (
                        <Divider style={{ borderColor: "white" }} />
                      )}
                    </>
                  </div>
                )
              )}
            </ChatContainer>
          );
        })}
      {loading && <Loader />}
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
  //background: #fcfffe;
  background-color: rgba(50, 50, 50, 0.3);
  color: white;
`;

const ImageLogo = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 5px;
  border-radius: 50%;
  //background: #a092fe;
  background-color: rgba(173, 216, 230, 0.6);
`;

const QuestionUserContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: flex-end;
`;

const QuestionUser = styled.div`
  text-align: right;
  font-weight: 500;
  //border: 3px solid #526e48;
  border: 1px solid #fcfffe;
  padding: 10px;
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  // background: white;
  background-color: rgba(173, 216, 230, 0.6);
  //color: #526e48;
  color: white;
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
  //background: #a092fe;
  background-color: rgba(173, 216, 230, 0.6);
  color: white;
  width: fit-content;
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
  //background: #fcfffe;
  background-color: rgba(50, 50, 50, 0.3);
  //color: #b5b5b6;
  color: black;
  width: 100%;
`;
export default Chat;
