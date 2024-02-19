import React from 'react';
import { ReactECharts } from './Echarts/ReactECharts';

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [100, 230, 224, 218, 135, 147, 260],
      mooth: true,
      type: 'line'
    }
  ]
};

function App() {

  const active = () => {
    
  }

  return (
    <div style={{position: 'relative', width:'100vw', height: '100vh'}}>
      <div style={{font:'inter', fontWeight:'700px', fontSize:'20px', lineHeight:'30px', textTransform:'uppercase'}}>
        <p style={{position:'absolute'}}><strong>Курс Доллара, $/₽</strong></p>
        <p style={{position:'absolute'}}><strong>Курс Евро, €/₽ </strong></p>
        <p style={{position:'absolute'}}><strong>Курс Юань, ¥/₽ </strong></p>
      </div>
      <div style={{zIndex: 99, position:'absolute', top: '1%', right: '3%'}}>
        <button onClick={() => active} style={{width:'99px', height: '24px', cursor: 'pointer', borderRadius:'4px' , background: '#00426947' }}>$</button>
        <button onClick={() => active} style={{width:'99px', height: '24px', cursor: 'pointer' }}>€</button>
        <button onClick={() => active} style={{width:'99px', height: '24px', cursor: 'pointer' }}>¥</button>
      </div>
      <Container />
    </div>
    );
}

const Container = () => {
  return ( <div><ReactECharts style={{width:'100vw', height: '100vh'}} option={option}/></div> )
}

export default App;
