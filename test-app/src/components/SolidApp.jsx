import { createEffect, createSignal } from 'solid-js';

import { getDays } from './utils';

import ActivityCalendarWidget from '../output/solid/src/ActivityCalendarWidget';

function SolidApp() {
  const [data, setData] = createSignal([]);
  const [daysToRender, setDaysToRender] = createSignal(150);

  createEffect(() => {
    generateData();
  }, 0);

  const generateData = () => {
    const data = getDays(daysToRender());
    setData(data);
  };

  const generateDaysToRender = () => {
    const daysToRender = Math.floor(Math.random() * 50) + 125;
    console.log({ daysToRender });
    setDaysToRender(daysToRender);
  };

  return (
    <div>
      <button onClick={generateData}>Re-generate `data`</button>
      <button onClick={generateDaysToRender}>Re-generate `daysToRender`</button>
      <ActivityCalendarWidget
        data={data()}
        daysToRender={daysToRender()}
        weekdayLabel={{
          1: '月曜日',
          3: '水曜日',
          5: '金曜日',
        }}
        weekStart={2}
        clickHandler={(dt) => console.log(dt)}
        showTooltip={false}
      />
    </div>
  );
}

export default SolidApp;
