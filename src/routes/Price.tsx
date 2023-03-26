import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendDown, faArrowTrendUp, faMinus } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2,1fr);
  max-width: 480px;
  margin: 0 auto;
`;
const Box = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  padding: 20px;
  border-radius: 15px;
  width: 100%;
`;
const TimeText = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 15px;
  color: ${(props) => props.theme.grayTextColor};
`;
const Percent = styled.div<{ percent: number }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${(props) => 
    props.percent > 0 ? "#DA5157" : props.percent < 0 ? "#4880EE" : props.theme.grayTextColor
  };
  span {
    font-size: 35px;
    font-weight: 600;
  }
`;

interface IPriceProps {
  percent30m: number;
  percent1h: number;
  percent12h: number;
  percent7d: number;
  percent30d: number;
  percent1y: number;
}

function Price({ percent30m, percent1h, percent12h, percent7d, percent30d, percent1y }: IPriceProps) {
  const percentList = [
    { text: "30m", value: percent30m },
    { text: "1h", value: percent1h },
    { text: "12h", value: percent12h },
    { text: "7d", value: percent7d },
    { text: "30d", value: percent30d },
    { text: "1y", value: percent1y },
  ];
  return (
    <Container>
      {percentList.map((item) => (
        <Box key={item.text}>
          <TimeText>From {item.text} ago</TimeText>
          <Percent percent={item.value}>
            <span>
              {item.value > 0 ? `+${item.value}%` : `${item.value}%`}
            </span>
            {item.value > 0 ? (<FontAwesomeIcon icon={faArrowTrendUp} size="2x" />) : item.value < 0 ? (<FontAwesomeIcon icon={faArrowTrendDown} size="2x" />) : (<FontAwesomeIcon icon={faMinus} size="2x"/>)}
          </Percent>
        </Box>
      ))}
    </Container>
  );
}

export default Price;