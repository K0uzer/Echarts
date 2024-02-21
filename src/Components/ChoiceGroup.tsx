import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { FC } from 'react';
import { StateInterface } from '../App';

type ChoiceGroupExampleProps = {
  setStateInterface: any
}

type Item = {
  currencySymbol:string,
  title:string,
};

const items: Item[] = [{currencySymbol:'$', title:'Курс доллара'}, {currencySymbol:'€', title:'Курс евро'}, {currencySymbol:'¥', title:'Курс юаня'}];

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