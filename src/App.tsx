import { useEffect, useState } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { ChoiceGroupExample } from './Components/ChoiceGroup';
import axios from 'axios';

export type StateInterface = {
  currencySymbol:string,
  title:string,
};

type ChartDataObject = {
  date: string,
  month: string,
  indicator: string,
  value: number,
}

let typeButton:string;

const initialState = {currencySymbol:'$', title:'Курс доллара'}

function App() {
  const [stateInterface, setStateInterface] = useState<StateInterface>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [chartData, setChartData] = useState<ChartDataObject[]>([])

  const filteredData = chartData.filter((item) => item.indicator === typeButton)
  // const averageValue = (filteredData.map((e) => e.value).reduce((accumulator:number, currentValue:number) => accumulator + currentValue) / filteredData.length).toFixed(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('ttps://65d4f6c33f1ab8c634365b66.mockapi.io/api/moki/currency/dataOfCurrency')
        setChartData(response.data)
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
      }
    }
    fetchData()
  }, [])

  const indicator = filteredData.map((e) => e.indicator)
  const value = filteredData.map((e) => e.value)
  const data = filteredData.map((e) => e.month)

  const option = {
    title: {
      text: `${stateInterface.title}, ${stateInterface.currencySymbol}/₽`
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: false,
      feature: {
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: indicator,
        type: 'line',
        data: value,
      },
    ]
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      { isError ? <h2>Что-то пошло не так...</h2> : null }
      { isLoading ? <h2>Loading...</h2>
        : <>
            <ReactECharts style={{width:'100vw', height: '100vh'}} option={option}/>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <p>Среднее за период</p>
              {/* <p>{averageValue}</p> */}
            </div>
            <ChoiceGroupExample setStateInterface={setStateInterface} />
          </>
      }
    </div>
    );
}

export default App;