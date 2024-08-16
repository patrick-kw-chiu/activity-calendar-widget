<script>
  import ActivityCalendarWidget from '../output/svelte/src/ActivityCalendarWidget.svelte';

  import { getDays } from './utils';

  const _generateData = (daysToRender) => {
    const data = getDays(daysToRender);
    return data;
  };

  const generateDaysToRender = () => {
    daysToRender = Math.floor(Math.random() * 50) + 125;
    console.log({ daysToRender });
  };

  const generateData = () => {
    data = _generateData(daysToRender);
    console.log({ data });
  };

  let mode;
  let data = _generateData(150);
  let showLevels;
  let summaryText;
  let levelColorMode;
  let levelColors;
  let levelLabelLess;
  let levelLabelMore;
  let showTooltip;
  let tooltipBgColor;
  let tooltipTextColor;
  let tooltipText;
  let tooltipFunction = ActivityCalendarWidget;
  let weekStart;
  let daysToRender = 150;
  let showWeekdayLabels;
  let showMonthLabels;
  let weekdayLabel;
  let monthLabel = { 4: '444', 6: '六月', 12: '十二月' };
  let clickHandler;
</script>

<div>
  <button on:click={generateData}>Re-generate `data`</button>
  <button on:click={generateDaysToRender}>Re-generate `daysToRender`</button>
  <ActivityCalendarWidget
    {data}
    showSummary={showLevels}
    {summaryText}
    {showLevels}
    {levelColorMode}
    {levelColors}
    {levelLabelLess}
    {levelLabelMore}
    {showTooltip}
    {tooltipBgColor}
    {tooltipTextColor}
    {tooltipText}
    {tooltipFunction}
    {weekStart}
    {daysToRender}
    {showWeekdayLabels}
    {showMonthLabels}
    {weekdayLabel}
    {monthLabel}
    {clickHandler}
  />
</div>
