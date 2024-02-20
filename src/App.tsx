import { useState } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { mockData } from './data/data';

const dollar = mockData.filter((_, index) => index !< 8)
const euro = mockData.filter((_, index) => index !< 16 && index !> 8)
const yuan = mockData.filter((_, index) => index !< 24 && index !> 16)

const currency = ['$', '€', '¥']

function App() {

  const [chart, setChart] = useState(dollar)

  const indicator = chart.map((e) => e.indicator)
  const value = chart.map((e) => e.value)
  const data = chart.map((e) => e.month)

  const averageValue = Math.round((chart.map((e) => e.value).reduce((accumulator, currentValue) => accumulator + currentValue) / chart.length) * 10) / 10

  const changeChart = (index:number) => {
    if(index === 0) setChart(dollar)
    if(index === 1) setChart(euro)
    if(index === 2) setChart(yuan)
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
      <div style={{zIndex: 99, position:'absolute', top: '1%', right: '3%'}}>
        {currency.map((e, index) => <button key={index} onClick={() => changeChart(index)} style={{width:'99px', height: '24px', cursor: 'pointer' }}>{e}</button>)}
      </div>
      <ReactECharts style={{width:'100vw', height: '100vh'}} option={option}/>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <p>Среднее за период</p>
        <p>{averageValue}</p>
      </div>
    </div>
    );
}

export default App;
