import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atom";
import { useRecoilValue } from "recoil";

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}
function Chart({coinId}:ChartProps){
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId!), {refetchInterval: 10000}); 
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading? "Loading chart..." : 
        <>
          Line Chart
          <ApexChart 
            type="line" 
            series={[
              {
                name: "close price",
                data: data!.map((price)=>parseFloat(price.close))
              },
            ]}
            options={{
              theme:{
                mode: isDark ? "dark" : "light",
              },
              chart:{
                height:500,
                width:500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }} 
          />
          CandleStick Chart
          <ApexChart
            type="candlestick"
            series={[
              {
                data: data!.map((price) => {
                  return [
                    price.time_close,
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ];
                }),
              },
            ]}
            options={{
              theme:{
                mode:"dark"
              },
              chart:{
                type:"candlestick",
                height:500,
                width:500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisTicks: { show: false },

                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#2ed573",
                    downward: '#da5157'
                  }
                }
              }
            }} 
          />
        </>
      }
    </div>
  );
  
}

export default Chart;