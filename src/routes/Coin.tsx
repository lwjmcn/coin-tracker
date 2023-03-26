import { Link, Route, Routes, useMatch, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh; //화면 높이의 15%
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  color: ${props=>props.theme.textColor}; 
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Box = styled.div`
  background-color: ${props=>props.theme.boxColor};  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 20px 0px;
  border-radius: 15px;
`;
const TextBox = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  p:first-child {
    display: block;
    font-size: 10px;
    font-weight: 700;
    margin-bottom: 5px;
  }
`;
const Description = styled.span`
  line-height: 1.5;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>` /* {interface props 추가} */
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props=>props.theme.boxColor};
  padding: 7px 0px;
  border-radius: 10px;
  a {
    display: block;
  }
  color: ${props=>props.isActive? props.theme.accentColor : props.theme.textColor};
`;

interface IRouterState{
  state: string;
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD :{ 
      ath_date: string;    
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin () {
  //Router state
  const { state } = useLocation() as IRouterState;
  //URL 변수
  const { coinId } = useParams();
  //url 확인
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data:info } = useQuery<IInfoData>(["info",coinId], () => fetchCoinInfo(coinId!)); 
  const { isLoading: tickersLoading, data:priceInfo } = useQuery<IPriceData>(["tickers",coinId], () => fetchCoinTickers(coinId!), {refetchInterval:5000}); 
  const loading = infoLoading || tickersLoading;
  
  /* const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  useEffect(()=>{
    (async() => {
      try{
        const infoData = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
        const priceData = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
        setInfo(infoData.data);
        setPriceInfo(priceData.data);
        setLoading(false);
      } catch (e) {
        console.log("error: ", e);
      }
      setLoading(false);
    })();
  },[coinId]); */
  
  return (
    <Container>
      <Helmet>
        <title>
        {state? state : loading? "Loading..." : info?.name }
        </title>
      </Helmet>
      <Header>
        <Link to={`/`}>
          <FontAwesomeIcon icon={faChevronLeft} size="2x" color="#b1b8c0" />
        </Link>
        <Title>{state? state : loading? "Loading..." : info?.name }</Title>
        <div> </div>
      </Header>
      {loading ? <Loader>Loading...</Loader> : (
        <>
          <Box>
            <TextBox>
              <p>RANK</p>
              <p>{info?.rank}</p>
            </TextBox>
            <TextBox>
              <p>SYMBOL</p>
              <p>{info?.symbol}</p>
            </TextBox>
            <TextBox>
              <p>PRICE</p>
              <p>${ priceInfo?.quotes.USD.price.toFixed(3) }</p>
            </TextBox>
          </Box>
          <Box>
            <TextBox>
              <p>DESCRIPTION</p>
              <Description>{info?.description}</Description>
            </TextBox>
          </Box>
          <Box>
            <TextBox>
              <p>TOTAL SUPPLY</p>
              <p>{priceInfo?.total_supply}</p>
            </TextBox>
            <TextBox>
              <p>MAX SUPPLY</p>
              <p>{priceInfo?.max_supply}</p>

            </TextBox>
          </Box>
          
          {/* Nested Routes */}
          <Tabs>
            <Tab isActive={chartMatch !== null}><Link to={`/${coinId}/chart`}>CHART</Link></Tab>
            <Tab isActive={priceMatch !== null}><Link to={`/${coinId}/price`}>PRICE</Link></Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!}/>}/>
            <Route path="price" element={
              <Price 
                percent30m={priceInfo!.quotes.USD.percent_change_30m}
                percent1h={priceInfo!.quotes.USD.percent_change_1h}
                percent12h={priceInfo!.quotes.USD.percent_change_12h}
                percent7d={priceInfo!.quotes.USD.percent_change_7d}
                percent30d={priceInfo!.quotes.USD.percent_change_30d}
                percent1y={priceInfo!.quotes.USD.percent_change_1y}
              />
            }/>
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;