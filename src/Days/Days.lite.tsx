import { For, Show } from '@builder.io/mitosis';

// constants
import CONSTANTS from '../constants/constants';

// types
// import { Data } from "../types/Data";
// import { MonthLabel } from "../types/MonthLabel";
// import { WeekdayLabel } from "../types/WeekdayLabel";
type Data = {
  date: string;
  activities: any[];
};
type MonthKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type MonthLabel = Record<MonthKey, string>;
type WeekdayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type WeekdayLabel = Record<WeekdayKey, string>;

// components
import Day from './Day.lite';
import Month from './Month.lite';
import Week from './Week.lite';

type DaysProps = {
  // General props
  data: Data[];
  daysToRender?: number;
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
  weekStart?: WeekdayKey;
  showWeekdayLabels?: boolean;
  weekdayLabel?: WeekdayLabel;
  showMonthLabels?: boolean;
  monthLabel?: MonthLabel;
};

// Util
const getSafeWeekStart = (weekStart) =>
  Math.max(Math.min(weekStart ?? 0, 6), 0);

// Day Block
const getDayDiffToStartOfCalendar = (weekStart) => {
  const todayDt = new Date();
  const oneYearAgoDt = new Date();
  oneYearAgoDt.setDate(todayDt.getDate() - 364);
  const oneYearAgoDayOfWeek = oneYearAgoDt.getDay();
  const dayDiffToStartOfCalendar = oneYearAgoDayOfWeek - weekStart;
  return dayDiffToStartOfCalendar;
};

const getContainerWidth = (weekStart, daysToRender, showWeekdayLabels) => {
  const daysContainerWidth = getDaysContainerWidth(
    getSafeWeekStart(weekStart),
    daysToRender
  );
  return daysContainerWidth + (showWeekdayLabels ?? true ? 42 : 0) + 'px';
};

const getDaysContainerWidth = (weekStart, daysToRender) => {
  const _weekStart = getSafeWeekStart(weekStart);
  const todayDayOfWeek = new Date().getDay();
  let numOfDaysInLastColumn = 0;
  if (!_weekStart) {
    numOfDaysInLastColumn = todayDayOfWeek + 1;
  } else {
    numOfDaysInLastColumn =
      _weekStart > todayDayOfWeek
        ? todayDayOfWeek + 7 + 1 - _weekStart
        : todayDayOfWeek + 1 - _weekStart;
  }

  let numOfDaysInRemainingColumns = 0;
  if (!daysToRender && daysToRender !== 0) {
    const dayDiffToStartOfCalendar = getDayDiffToStartOfCalendar(_weekStart);
    numOfDaysInRemainingColumns =
      365 + dayDiffToStartOfCalendar - numOfDaysInLastColumn;
  } else {
    numOfDaysInRemainingColumns = daysToRender - numOfDaysInLastColumn;
  }

  return Math.ceil(numOfDaysInRemainingColumns / 7 + 1) * 14;
};

const getDayLevel = ({ numOfLevels, activitiesPerc }) => {
  for (let i = 1; i <= numOfLevels; i++) {
    if (activitiesPerc <= i / numOfLevels) {
      return i;
    }
  }
};

const getDays = ({ levelColors, data, weekStart, daysToRender }) => {
  const _weekStart = getSafeWeekStart(weekStart);

  // 1. Init helper variables
  const numOfLevels = levelColors?.length ? levelColors.length - 1 : 4;
  let maxNumOfContributions = 0;
  const dataMap = new Map();
  (data || []).forEach((day) => {
    maxNumOfContributions = Math.max(
      maxNumOfContributions,
      day?.activities?.length || 0
    );
    dataMap.set(day.date, day.activities);
  });

  // 3. Merge the activities to days array
  return new Array(
    daysToRender ? daysToRender : 365 + getDayDiffToStartOfCalendar(_weekStart)
  )
    .fill(0)
    .map((_, index) => {
      const dt = new Date();
      dt.setDate(dt.getDate() - index);
      const year = dt.getFullYear();
      const month = dt.getMonth() + 1;
      const day = dt.getDate();
      const id =
        year +
        '-' +
        (month + '').padStart(2, '0') +
        '-' +
        (day + '').padStart(2, '0');
      const activities = dataMap.get(id) || [];
      const activitiesPerc = activities.length / maxNumOfContributions;
      const level =
        activities.length === 0
          ? 0
          : getDayLevel({ numOfLevels, activitiesPerc });

      return {
        id,
        year,
        month,
        day,
        dayOfWeek: dt.getDay(),
        dayDiffFromToday: index,
        activities,
        level,
      };
    });
};

const getDayColor = ({ level, levelColors, levelColorMode }) => {
  const _levelColors = getLevelColors({ levelColors, levelColorMode });
  return _levelColors[level];
};

const getDayTop = (arg) => {
  const { dayOfWeek = 0, weekStart = 0 } = arg;
  const _weekStart = getSafeWeekStart(weekStart);
  if (dayOfWeek - _weekStart < 0) {
    return (dayOfWeek - _weekStart + 7) * 14;
  }
  return (dayOfWeek - _weekStart) * 14;
};

const getDayRight = (arg) => {
  const { dayDiffFromToday = 0, dayOfWeek = 0, weekStart = 0 } = arg;
  const todayDayOfWeek = new Date().getDay();

  return (
    (Math.floor(dayDiffFromToday / 7) +
      (dayOfWeek > todayDayOfWeek ? 1 : 0) +
      (dayOfWeek < getSafeWeekStart(weekStart) ? 1 : 0) +
      (weekStart > todayDayOfWeek ? -1 : 0)) *
    14
  );
};

// Week Block
const getWeekdayLabels = (weekdayLabel?: WeekdayLabel, weekStart = 0) => {
  const _weekStart = getSafeWeekStart(weekStart);
  let _weekdayLabels: string[] = [];
  for (let i = 0; i < 7; i++) {
    let weekStartId = _weekStart + i >= 7 ? _weekStart + i - 7 : _weekStart + i;
    if (weekdayLabel) {
      // If `weekdayLabel` is available
      // => only render `weekdayLabel` value
      _weekdayLabels.push(weekdayLabel[weekStartId] || '');
    } else if ([1, 3, 5].includes(i)) {
      // Otherwise, render only the 2nd, 4th, 6th value
      _weekdayLabels.push(CONSTANTS.WEEK_MAP[weekStartId]);
    } else {
      _weekdayLabels.push('');
    }
  }

  return _weekdayLabels;
};

// Month Block
const getMonthRight = (arg) => {
  // day's right position - width + day's width
  return getDayRight(arg) - 36 + 12;
};

const getMonthLabel = ({ monthLabel, dt, CONSTANTS }) => {
  return monthLabel?.[dt.month] ?? CONSTANTS.MONTH_MAP[dt.month];
};

// Summary Block
const getSummary = ({
  summaryText,
  levelColors,
  data,
  weekStart,
  daysToRender,
}) => {
  const days = getDays({ levelColors, data, weekStart, daysToRender });
  const count = days.reduce((acc, cur) => {
    return acc + cur.activities.length;
  }, 0);

  if (summaryText) {
    return summaryText.replaceAll('{{count}}', count);
  }

  return `${count} activities in this period`;
};

// Level Block 1000 ->
const getLevelColors = ({ levelColors, levelColorMode }) => {
  return (
    levelColors ??
    (levelColorMode === 'dark'
      ? CONSTANTS.LEVEL_COLOR.dark
      : CONSTANTS.LEVEL_COLOR.light)
  );
};

export default function Days(props: DaysProps) {
  return (
    <div
      style={{
        textAlign: 'left',
        display: 'inline-block',
        position: 'relative',
        width: getContainerWidth(
          props.weekStart,
          props.daysToRender,
          props.showWeekdayLabels
        ),
        fontSize: '12px',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
      }}
    >
      <Show when={props.showMonthLabels ?? true}>
        <div
          style={{
            width: '100%',
            height: 24 + 'px',
          }}
        ></div>
      </Show>
      <div style={{ position: 'relative' }}>
        <Show when={props.showWeekdayLabels ?? true}>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              verticalAlign: 'top',
              width: 36 + 'px',
              height: '100%',
            }}
          >
            <For each={getWeekdayLabels(props.weekdayLabel, props.weekStart)}>
              {(dayOfWeek: string, index) => (
                <Week key={index} week={dayOfWeek} />
              )}
            </For>
          </div>
        </Show>
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            width:
              getDaysContainerWidth(props.weekStart, props.daysToRender) + 'px',
            height: 7 * 14 + 'px',
          }}
        >
          <For
            each={getDays({
              data: props.data ?? [],
              levelColors: props.levelColors,
              weekStart: props.weekStart,
              daysToRender: props.daysToRender,
            })}
          >
            {(dt: any, index) => (
              <div key={index}>
                <Show when={(props.showMonthLabels ?? true) && dt.day === 1}>
                  <Month
                    month={getMonthLabel({
                      monthLabel: props.monthLabel,
                      dt,
                      CONSTANTS,
                    })}
                    right={
                      getMonthRight({
                        dayDiffFromToday: dt.dayDiffFromToday,
                        dayOfWeek: dt.dayOfWeek,
                        weekStart: props.weekStart,
                      }) + 'px'
                    }
                  />
                </Show>
                <Day
                  clickHandler={props.clickHandler ?? (() => {})}
                  dt={dt}
                  color={getDayColor({
                    level: dt.level,
                    levelColors: props.levelColors,
                    levelColorMode: props.levelColorMode,
                  })}
                  top={
                    getDayTop({
                      dayOfWeek: dt.dayOfWeek,
                      weekStart: props.weekStart,
                    }) + 'px'
                  }
                  right={
                    getDayRight({
                      dayDiffFromToday: dt.dayDiffFromToday,
                      dayOfWeek: dt.dayOfWeek,
                      weekStart: props.weekStart,
                    }) + 'px'
                  }
                  showTooltip={props.showTooltip ?? true}
                  tooltipBgColor={props.tooltipBgColor}
                  tooltipTextColor={props.tooltipTextColor}
                  tooltipText={props.tooltipText}
                  activities={dt.activities}
                  year={dt.year}
                  month={dt.month}
                  day={dt.day}
                ></Day>
              </div>
            )}
          </For>
        </div>
      </div>
      <div>
        <Show when={props.showSummary ?? true}>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {getSummary({
              summaryText: props.summaryText,
              levelColors: props.levelColors,
              data: props.data,
              weekStart: props.weekStart,
              daysToRender: props.daysToRender,
            })}
          </div>
        </Show>
        <Show when={props.showLevels ?? true}>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              float: 'right',
            }}
          >
            <div style={{ display: 'inline-block' }}>
              {props.levelLabelLess ?? 'Less'}
            </div>
            <For
              each={getLevelColors({
                levelColors: props.levelColors,
                levelColorMode: props.levelColorMode,
              })}
            >
              {(levelLabel: string, index) => (
                <div
                  key={index}
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    outline: '1px solid rgba(27, 31, 35, 0.06)',
                    outlineOffset: '-1px',
                    borderRadius: '2px',
                    margin: '0 2px',
                    backgroundColor: levelLabel,
                  }}
                />
              )}
            </For>
            <div style={{ display: 'inline-block' }}>
              {props.levelLabelMore ?? 'More'}
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
}
