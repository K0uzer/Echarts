import { useEffect, useState } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { ChoiceGroupExample, Item, items } from './Components/ChoiceGroup';
import axios from 'axios';

let typeButton:string;

const symbolAndNameOfCurrency = {
  '$': 'доллара',
  '€': 'евро',
  '¥': 'юаня',
}

const filteredData = (array:any) => array.filter((item:any) => item.indicator === `Курс ${typeButton}`)
const averageValue = (func:any, item:any) => (func(item).map((e:any) => e.value).reduce((accumulator:number, currentValue:number) => accumulator + currentValue) / func.length).toFixed(1)

function App() {

  const [buttonValue, setButtonValue] = useState<Item>(items[0]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);
  const [chart, setChart] = useState([{ date: '2016-02-01', month: 'фев 2016', indicator: 'Курс доллара', value: 72 }])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('ttps://65d4f6c33f1ab8c634365b66.mockapi.io/api/moki/currency/dataOfCurrency')
        setChart(response.data)
        setLoading(false)
      } catch (error) {
        setError(true)
      }
    }
    fetchData()
  }, [buttonValue])

  if(buttonValue === '$') typeButton = symbolAndNameOfCurrency['$']
  if(buttonValue === '€') typeButton = symbolAndNameOfCurrency['€']
  if(buttonValue === '¥') typeButton = symbolAndNameOfCurrency['¥']

  const indicator = filteredData(chart).map((e:any) => e.indicator)
  const value = filteredData(chart).map((e:any) => e.value)
  const data = filteredData(chart).map((e:any) => e.month)

  const option = {
    title: {
      text: `${indicator[0]}, ${buttonValue}/₽`
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
      { error ? <h2>Что-то пошло не так...</h2> : null }
      { error === false && loading ? <h2>Loading...</h2>
        : <>
            <ReactECharts style={{width:'100vw', height: '100vh'}} option={option}/>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <p>Среднее за период</p>
              <p>{averageValue(filteredData, chart)}</p>
            </div>
            <ChoiceGroupExample buttonValue={buttonValue} setButtonValue={setButtonValue} />
          </>
      }
    </div>
    );
}

export default App;