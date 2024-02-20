import { useState } from "react";
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";

type Item = string;

const items: Item[] = ['$', '€', '¥'];

export const ChoiceGroupExample = () => {
  const [value, setValue] = useState<Item>(items[0]);
  return (
    <Theme className="App" preset={presetGpnDefault}>
      <ChoiceGroup
        value={value}
        onChange={() => setValue(value)}
        items={items}
        getItemLabel={(item: any) => item}
        multiple={false}
        name="ChoiceGroupExample"
      />
    </Theme>

  );
};