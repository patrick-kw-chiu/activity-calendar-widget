import { Show, useDefaultProps } from '@builder.io/mitosis';

// types
import { Data } from './types/Data';
import { WeekdayLabel } from './types/WeekdayLabel';
import { MonthLabel } from './types/MonthLabel';

// components
import Days from './Days/Days.lite';

type ActivityCalendarWidgetProps = {
  // General props
  data: Data[];
  daysToRender?: number;
  mode?: 'day' | 'week' | 'month';
  // Event Handler
  clickHandler?: Function;
  // General props - summary
  showSummary?: boolean;
  summaryText?: string;
  // General props - levels
  showLevels?: boolean;
  levelColorMode?: 'light' | 'dark';
  levelColors?: string[];
  levelLabelLess?: string;
  levelLabelMore?: string;
  // General props - tooltip
  showTooltip?: boolean;
  tooltipBgColor?: string;
  tooltipTextColor?: string;
  tooltipText?: string;
  // 'day' specific props
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showWeekdayLabels?: boolean;
  weekdayLabel?: WeekdayLabel;
  showMonthLabels?: boolean;
  monthLabel?: MonthLabel;
};

export default function ActivityCalendarWidget(
  props: ActivityCalendarWidgetProps
) {
  useDefaultProps({
    clickHandler: () => {
      return () => {};
    },
  });

  return (
    <div>
      <Show when={!props.mode || props.mode === 'day'}>
        <Days
          data={props.data}
          daysToRender={props.daysToRender}
          showSummary={props.showSummary}
          summaryText={props.summaryText}
          showLevels={props.showLevels}
          levelColorMode={props.levelColorMode}
          levelColors={props.levelColors}
          levelLabelLess={props.levelLabelLess}
          levelLabelMore={props.levelLabelMore}
          showTooltip={props.showTooltip}
          tooltipBgColor={props.tooltipBgColor}
          tooltipTextColor={props.tooltipTextColor}
          tooltipText={props.tooltipText}
          weekStart={props.weekStart}
          showWeekdayLabels={props.showWeekdayLabels}
          weekdayLabel={props.weekdayLabel}
          showMonthLabels={props.showMonthLabels}
          monthLabel={props.monthLabel}
          clickHandler={props.clickHandler}
        />
      </Show>
    </div>
  );
}
