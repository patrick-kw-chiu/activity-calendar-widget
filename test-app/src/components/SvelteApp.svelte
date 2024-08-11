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

  export let mode;
  export let data = _generateData(150);
  export let showLevels;
  export let summaryText;
  export let levelColorMode;
  export let levelColors;
  export let levelLabelLess;
  export let levelLabelMore;
  export let showTooltip;
  export let tooltipBgColor;
  export let tooltipTextColor;
  export let tooltipText;
  export let tooltipFunction = ActivityCalendarWidget;
  export let weekStart;
  export let daysToRender = 150;
  export let showWeekdayLabels;
  export let showMonthLabels;
  export let weekdayLabel;
  export let monthLabel = { 4: '444', 6: '六月', 12: '十二月' };
  export let clickHandler;
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
