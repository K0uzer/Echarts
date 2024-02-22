import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { FC } from 'react';
import { StateInterface } from '../App';

// Типизация для пропсов нашего компонента
type ChoiceGroupExampleProps = {
  setStateInterface: any
}

// Тип для объекта из массива items
type Item = {
  currencySymbol:string,
  title:string,
};

// Массив объектов содержащий символ и именование самой валюты
const items: Item[] = [{currencySymbol:'$', title:'Курс доллара'}, {currencySymbol:'€', title:'Курс евро'}, {currencySymbol:'¥', title:'Курс юаня'}];

// Компонет из библиотека
export const ChoiceGroupExample:FC<ChoiceGroupExampleProps> = ({setStateInterface}) => {
  return (
    <Theme className="App" preset={presetGpnDefault}>
      <ChoiceGroup
        onChange={({value}) => setStateInterface((prevState:StateInterface) => ({...prevState, currencySymbol:value.currencySymbol, title:value.title}))}
        items={items}
        getItemLabel={(item) => item.currencySymbol}
        multiple={false}
        name="ChoiceGroupExample"
      />
    </Theme>
  );
};