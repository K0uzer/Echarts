import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";

export type Item = string;

export const items: Item[] = ['$', '€', '¥'];

export const ChoiceGroupExample = ({buttonValue, setButtonValue}:{buttonValue:string, setButtonValue:any}) => {

  return (
    <Theme className="App" preset={presetGpnDefault}>
      <ChoiceGroup
        value={buttonValue}
        onChange={(e) => setButtonValue(e.value)}
        items={items}
        getItemLabel={(item: any) => item}
        multiple={false}
        name="ChoiceGroupExample"
      />
    </Theme>

  );
};