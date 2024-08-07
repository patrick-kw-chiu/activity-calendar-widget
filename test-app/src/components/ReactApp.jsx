import { useEffect, useState } from 'react';

import './index.css';

import { getDays } from './utils';

import ActivityCalendarWidget from '../output/react/src/ActivityCalendarWidget';

function ReactApp(props) {
  const [data, setData] = useState([]);
  const [daysToRender, setDaysToRender] = useState(150);

  useEffect(() => {
    generateData();
  }, []);

  const generateData = () => {
    const data = getDays(daysToRender);
    setData(data);
  };

  const generateDaysToRender = () => {
    const daysToRender = Math.floor(Math.random() * 50) + 125;
    console.log({ daysToRender });
    setDaysToRender(daysToRender);
  };

  console.log({ data, daysToRender });
  return (
    <div>
      <button onClick={generateData}>Re-generate `data`</button>
      <button onClick={generateDaysToRender}>Re-generate `daysToRender`</button>
      <ActivityCalendarWidget
        data={data}
        daysToRender={daysToRender}
        weekdayLabel={{
          1: '月曜日',
          3: '水曜日',
          5: '金曜日',
        }}
        clickHandler={(dt) => console.log(dt)}
        tooltipFunction={() => <div>sdf</div>}
      />
    </div>
  );
}

export default ReactApp;
