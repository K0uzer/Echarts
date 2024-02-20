import { useState } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { mockData } from './data/data';
import { ChoiceGroupExample } from './Components/ChoiceGroup';

const dollar = mockData.filter((item) => item.indicator === `Курс {1}`)
fetch('https://65d4f6c33f1ab8c634365b66.mockapi.io/api/moki/currency/dataOfCurrency').then((response) => response.json)

function App() {
  const [chart, setChart] = useState(dollar)

  const indicator = chart.map((e) => e.indicator)
  const value = chart.map((e) => e.value)
  const data = chart.map((e) => e.month)

  // const averageValue = (chart.map((e) => e.value).reduce((accumulator, currentValue) => accumulator + currentValue) / chart.length).toFixed(1)

  const changeChart = (index:number) => {
    if(index === 0) setChart(dollar)
  }

  const currencySign = 1

  const option = {
    title: {
      text: `${indicator[0]}, ${currencySign}/₽`
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
    <div style={{display: 'flex'}}>
      <ReactECharts style={{width:'100vw', height: '100vh'}} option={option}/>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <p>Среднее за период</p>
        <p>{}</p>
      </div>
      <ChoiceGroupExample />
    </div>
    );
}

export default App;
