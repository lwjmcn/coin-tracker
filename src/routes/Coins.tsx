import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";
import { isDarkAtom } from "../atom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh; //화면 높이의 15%
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  color: ${props=>props.theme.textColor};
`;
const DarkModeButton = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  span {
    margin-right: 5px;
    font-size: 12px;
  }
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${props=>props.theme.boxColor};  
  color: ${(props)=>props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 17px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex; //div를 선택해도 hover됨
    align-items: center;
  }
  &:hover {
    a{
      color: ${(props)=>props.theme.accentColor};
    }
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Icon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}
function Coins (){
  const { isLoading, data } = useQuery<ICoin[]>(["Coins"],fetchCoins);
  // const [loading, setLoading] = useState(true);
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // useEffect(()=>{
  //   (async() => {
  //     try{
  //     const response = await axios("https://api.coinpaprika.com/v1/coins");
  //     setCoins(response.data.slice(0,100));
  //     } catch (e) {
  //       console.log("error: ", e);
  //     }
  //     setLoading(false);
  //   })();
  // },[]);
  const setterFn = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleMode = () => {
    setterFn((prev)=>!prev);
  }

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <DarkModeButton onClick={toggleMode}>
          <span>Dark Mode</span>
          {isDark ? <FontAwesomeIcon icon={faToggleOn} size="lg"/> : <FontAwesomeIcon icon={faToggleOff} size="lg"/>}
        </DarkModeButton>
        <Title>Coins</Title>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : (
        <CoinsList>
          {data?.map((coin)=>(
            <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin.name}>
                  <Icon src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                  {coin.name} &rarr;
                </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;