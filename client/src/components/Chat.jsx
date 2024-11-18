import Loader from "./Loader";
import { Divider } from "@mui/material";
//import Logo from "../assets/logo.png";
import newLogo from "../assets/newLogo.png";
import Avatar from "@mui/material/Avatar";
import randomUser from "../assets/randomAvatar.png";
function Chat({ conversation, handleOptionClick, loading, lastAnswer }) {
  return (
    <div>
      {conversation.length > 0 &&
        conversation.map((entry, index) => {
          return (
            <div key={index} style={{ marginBottom: "15px" }}>
              <div style={{ paddingBottom: "10px" }}>
                {entry.questionAI ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      fontWeight: "500",
                      border: "1px solid #a092fe",
                      padding: "10px",
                      fontSize: "15px",
                      marginBottom: " 10px",
                      marginTop: "10px",
                      borderRadius: "10px",
                      background: "#FCFFFE",
                      color: "#B5B5B6",
                    }}
                  >
                    <img
                      src={newLogo}
                      style={{
                        width: "45px",
                        height: "45px",
                        marginRight: "5px",
                        borderRadius: "50%",
                        background: "#a092fe",
                      }}
                    />
                    {entry.questionAI}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: "500",
                        border: "3px solid #526E48",
                        padding: "10px",
                        fontSize: "15px",
                        marginBottom: " 10px",
                        marginTop: "10px",
                        borderRadius: "10px",
                        background: "white",
                        color: "#526E48",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        src={randomUser}
                        sx={{
                          width: 23,
                          height: 23,
                          marginRight: "5px",
                        }}
                      />
                      {entry.questionUser}
                    </div>
                  </div>
                )}
              </div>
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
                    {entry.chat && (
                      <div
                        style={{
                          textAlign: "right",
                          fontWeight: "600",
                          border: "1px solid #FCFFFE",
                          padding: "10px",
                          fontSize: "16px",
                          marginBottom: " 10px",
                          marginTop: "10px",
                          borderRadius: "10px",
                          background: "#a092fe",
                          color: "white",
                          width: "fit-content",
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: "auto",
                        }}
                      >
                        <Avatar
                          src={randomUser}
                          sx={{
                            width: 23,
                            height: 23,
                            marginRight: "5px",
                          }}
                        />
                        {entry.chat}
                      </div>
                    )}
                    {entry.userAnswer && (
                      <div
                        style={{
                          textAlign: "right",
                          fontWeight: "600",
                          border: "1px solid #FCFFFE",
                          padding: "10px",
                          fontSize: "16px",
                          marginBottom: " 10px",
                          marginTop: "10px",
                          borderRadius: "10px",
                          background: "#a092fe",
                          color: "white",
                          width: "100px",
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: "auto",
                        }}
                      >
                        <Avatar
                          src={randomUser}
                          sx={{
                            width: 23,
                            height: 23,
                            marginRight: "5px",
                          }}
                        />
                        {entry.userAnswer}
                      </div>
                    )}
                    {entry.systemAnswer && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            fontWeight: "500",
                            padding: "10px",
                            fontSize: "15px",
                            marginBottom: " 10px",
                            marginTop: "10px",
                            borderRadius: " 10px",
                            background: "#FCFFFE",
                            color: "#B5B5B6",
                            width: "100%",
                          }}
                        >
                          <img
                            src={newLogo}
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "5px",
                              borderRadius: "50%",
                              background: "#a092fe",
                            }}
                          />
                          <div>{entry.systemAnswer}</div>
                        </div>
                      </>
                    )}
                    {(entry.userAnswer || entry.systemAnswer) && (
                      <Divider style={{ borderColor: "white" }} />
                    )}
                  </>
                </div>
              )}
            </div>
          );
        })}
      {loading && lastAnswer && <Loader />}
    </div>
  );
}

export default Chat;
