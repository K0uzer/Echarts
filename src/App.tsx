// Импортируем используемые хуки
import { useEffect, useState } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
// Импортируем компонент из из библиотеки
import { ChoiceGroupExample } from './Components/ChoiceGroup';
// Импортируем библиотеку axios для реализации запросов к серверу для получения наших данных по api
import axios from 'axios';
import './App.css'

// Создаем типы
// Основной тип соятояний интерфейса
export type StateInterface = {
  currencySymbol:string,
  title:string,
};

// Тип объекта из массива данных для графика
type ChartDataObject = {
  date: string,
  month: string,
  indicator: string,
  value: number,
}

const styleChart = {width:'50vw', height: '50vh'}

// Объект испльзуемый при инициализации
const initialState = {currencySymbol:'$', title:'Курс доллара'}

function App() {
  // Хуки
  // Хук позволяющий изменять состояние интерфейса
  const [stateInterface, setStateInterface] = useState<StateInterface>(initialState);
  // Хук состояния загрузчика
  const [isLoading, setIsLoading] = useState(true);
  // Хук для контроля над ошибками при получении данных с сервера
  const [isError, setIsError] = useState(false);
  // Хук для котроля над состояниями Грацика, содержащий массив с данными
  const [chartData, setChartData] = useState<ChartDataObject[]>([])

  // Фильтруем chartData для получения фильтрованного массива с объектами, совпадающими по title с item.indicator
  const filteredData = chartData.filter((item) => item.indicator === stateInterface.title)
  // Вычисляем среднее значение. Проходимся с помощью метода map по массиву, достаем значения после чего через reduce складываем все элементы и делим на длену массива. Тем самым мы получаем среднее значение, после чего через toFixed(1) округляем до десятичных дробей. 
  // Тернаный оператор. При инициализации у нас имеется только единичный объект, в следствии чего нам не требуется использовать метод массива reduce и мы просто проходимся через метод map, получая нуэное нам значение.
  const averageValue = filteredData.length > 1 ? (filteredData.map((e) => e.value).reduce((accumulator:any, currentValue:any) => accumulator + currentValue) / filteredData.length ).toFixed(1) : filteredData.map((e) => e.value)

  // Хук useEffect. Реализуем запрос к api, что позволяет нам получить данные в формате json.
  // Полученный массив мы помещаем в функцию setChartData, изменяя состояние chartData. Теперь у нас имеется полный массив не фильтрованных данных.
  useEffect(() => {
    // Создаем асинхронную функцию
    const fetchData = async () => {
      // Через try/catch обрабатываем получаемые ошибки
      try {
        // Ожидаем получение данных с api
        const response = await axios.get('https://65d4f6c33f1ab8c634365b66.mockapi.io/api/moki/currency/dataOfCurrency')
        // Загружаем нам массив, изменяя состояние chartData
        setChartData(response.data)
        // При отсутствии ошибок изменяем состояние хука на false, что убирает наш <h2>Loading...</h2> и позволяет увидеть наш контент
        setIsLoading(false)
      } catch (error) {
        // При получении ошибки изменяем состояние на isError true, что выводит нам <h2>Что-то пошло не так...</h2>
        setIsError(true)
      }
    }
    fetchData()
  }, [])

  // Через метод map получаем фильтрованные массивы с данными для графика
  const value = filteredData.map((e) => e.value)
  const data = filteredData.map((e) => e.month)

  // Помещаем данные фильтрованные выше и состояние хука stateInterface для реализации графика
  const option = {
    title: {
      text: `${stateInterface.title}, ${stateInterface.currencySymbol}/₽`,
    },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: true,
    },
    xAxis: {
      type: 'category',
      data: data,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: stateInterface.title,
        type: 'line',
        data: value,
        color: '#F38B00',
      },
    ],
  };

  return (
    <div className='container' style={{display: 'flex', justifyContent: 'center'}}>
      { isError ? <h2 className='error'>Что-то пошло не так...</h2> : null }
      { isError === false && isLoading ? <h2 className='load'>Loading...</h2>
        : <>
            <ReactECharts style={styleChart} option={option}/>
            <div className='average'>
              <p className='average_text'>Среднее за период</p>
              <p className='average_value'>{averageValue}<p className='average_symbol'>{stateInterface.currencySymbol}</p></p>
            </div>
            <ChoiceGroupExample setStateInterface={setStateInterface} />
          </>
      }
    </div>
    );
}

export default App;