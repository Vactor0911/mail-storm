import { useEffect, useRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Avatar, Button, Divider } from "@mui/material";
import { color } from "../utils/theme";
import StyledTable from "../components/StyledTable";
import StyledChart from "../components/StyledChart";
import { EmailProps, emailsAtom, isInputActiveAtom } from "../state";

// 아이콘
import MailLockTwoToneIcon from "@mui/icons-material/MailLockTwoTone";
import GithubIcon from "../assets/github.png";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import TroubleshootRoundedIcon from "@mui/icons-material/TroubleshootRounded";
import { useAtom } from "jotai";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 10px 20px;
    border-bottom: 1px solid ${color.gray};
  }

  header a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${color.primary};
    text-decoration: none;
    white-space: nowrap;
  }

  .main-container {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    max-height: calc(100% - 60px);
  }

  .table-container {
    display: flex;
    flex-direction: column;
    width: 60%;
    max-height: 100%;
  }

  .table-container h1 {
    margin-bottom: 30px;
  }

  .table-wrapper {
    width: 100%;
    border-radius: 10px 0 0 0;
    overflow-y: scroll;
  }

  .table-wrapper table {
    overflow: scroll;
    width: 100%;
    min-width: 350px;
  }

  .table-container .button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid ${color.gray};
    border-radius: 0 0 10px 10px;
  }

  .chart-container {
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 100%;
    align-items: center;
    gap: 30px;
  }

  .divider {
    display: none;
  }

  @media (max-width: 768px) {
    header {
      padding: 10px;
    }

    .main-container {
      flex-direction: column;
      align-items: center;
      max-height: none;
      gap: 60px;
    }

    .table-container {
      width: 100%;
      overflow: scroll;
    }

    .table-container h1 {
      align-self: center;
    }

    .chart-container {
      width: 100%;
      height: auto;
    }

    .divider {
      display: block;
    }
  }

  @media (max-width: 480px) {
    .button-container {
      flex-direction: column;
    }

    .button-container button {
      width: 100%;
    }
  }
`;

const Main = () => {
  const requestAnalysis = async () => {
    try {
      const emailTitles = emails.map((email) => email.title);
      console.log("Data to be sent:", emailTitles);
      const res = await axios.post(
        "https://mailstorm.vactor0911.dev/api/analysis-email",
        {
          emailTitles, // emailTitle 데이터 전송
        }
      );

      console.log("Data sent successfully:", res.data.data);
      setEmails(res.data.data);
    } catch (error) {
      console.error("Error occurred while sending data:", error);
    }
  };

  const [emails, setEmails] = useAtom(emailsAtom);
  const [isInputActive, setIsInputActive] = useAtom(isInputActiveAtom);

  const scrollRef = useRef<HTMLTableElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [emails.length]);

  return (
    <Style>
      <header>
        <Link to="/">
          <MailLockTwoToneIcon fontSize="large" />
          <h2>Mail Storm</h2>
        </Link>
        <Button
          startIcon={
            <Avatar src={GithubIcon} sx={{ width: "30px", height: "30px" }} />
          }
          sx={{
            padding: "5px 20px",
            backgroundColor: "#24292e",
            color: "white",
            textTransform: "none",
          }}
          onClick={() =>
            window.open("https://github.com/Vactor0911/mail-storm", "_blank")
          }
        >
          Github
        </Button>
      </header>

      <div className="main-container">
        <div className="table-container">
          <h1>이메일 제목 입력</h1>
          <div className="table-wrapper" ref={scrollRef}>
            <StyledTable />
          </div>
          <div className="button-container">
            <Button
              variant="outlined"
              color="modern"
              startIcon={<AddRoundedIcon />}
              disabled={
                emails.length >= 10 ||
                !isInputActive ||
                emails.filter(
                  (email) =>
                    email.title === "" || email.title === "새로운 메일 제목"
                ).length > 0
              }
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                if (emails[emails.length - 1]?.title === "새로운 메일 제목") {
                  return;
                }
                setEmails([...emails, { title: "새로운 메일 제목" }]);
              }}
            >
              제목 추가하기
            </Button>
            <Button
              variant="outlined"
              color="modern"
              startIcon={<RefreshRoundedIcon />}
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                setEmails([{ title: "새로운 메일 제목" }] as EmailProps[]);
                window.scrollTo({ top: 0, behavior: "smooth" });
                const emailTitleInput = document.querySelector(
                  "#tf-email-title"
                ) as HTMLInputElement | null;
                if (emailTitleInput) {
                  emailTitleInput.value = "새로운 메일 제목";
                }
                setIsInputActive(true);
              }}
            >
              초기화하기
            </Button>
            <Button
              variant="contained"
              startIcon={<TroubleshootRoundedIcon />}
              disabled={
                !isInputActive ||
                emails.filter((email) => email.title === "").length > 0
              }
              onClick={() => {
                setIsInputActive(false);
                requestAnalysis(); // 분석 시작
              }}
            >
              분석하기
            </Button>
          </div>
        </div>

        <Divider className="divider" variant="middle" flexItem />

        <div className="chart-container">
          <h1>분석결과</h1>
          <StyledChart />
        </div>
      </div>
    </Style>
  );
};

export default Main;
