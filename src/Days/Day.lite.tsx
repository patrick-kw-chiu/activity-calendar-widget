import { Show, useStore } from '@builder.io/mitosis';

// constants
import CONSTANTS from '../constants/constants';

// types
// import { DateTime } from '../types/DateTime';
type DateTime = {
  id: string;
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  dayDiffFromToday: number;
  activities: any;
  level: number;
};

type DayProps = {
  clickHandler: Function;
  dt: DateTime;
  color: string;
  top: string;
  right: string;
  // tooltipText style
  showTooltip: boolean;
  tooltipBgColor?: string;
  tooltipTextColor?: string;
  tooltipText?: string;
  // tooltipText content
  activities: any[];
  year: number;
  month: number;
  day: number;
};

const getDayRight = ({ right, tooltipPosition }) => {
  return (
    'calc(' +
    right +
    ' + ' +
    (tooltipPosition === 'left'
      ? '-178px'
      : tooltipPosition === 'center'
      ? '-96px'
      : '-7px') +
    ')'
  );
};

const getTooltipText = ({
  tooltipText,
  activities,
  year,
  month,
  day,
  CONSTANTS,
}) => {
  if (!!tooltipText) {
    return tooltipText
      .replaceAll('{{numOfActivities}}', activities?.length)
      .replaceAll('{{year}}', year)
      .replaceAll('{{month}}', month)
      .replaceAll('{{day}}', day);
  }

  return `${activities?.length} activities on ${CONSTANTS.MONTH_MAP[month]} ${day}, ${year}`;
};

export default function Day(props: DayProps) {
  const state = useStore({
    _showTooltip: false,
    tooltipPosition: 'center',
    updateShowTooltip(action, event) {
      if (event.clientX < 132) {
        state.tooltipPosition = 'left';
      } else if (window.innerWidth - event.clientX < 132) {
        state.tooltipPosition = 'right';
      } else {
        state.tooltipPosition = 'center';
      }
      state._showTooltip = action === 'enter';
    },
  });

  return (
    <>
      <div
        data-dt={JSON.stringify(props.dt)}
        onClick={() => props.clickHandler(props.dt)}
        onMouseEnter={(event) => state.updateShowTooltip('enter', event)}
        onMouseLeave={(event) => state.updateShowTooltip('leave', event)}
        css={{
          zIndex: '10',
          position: 'absolute',
          width: '10px',
          height: '10px',
          outline: '1px solid rgba(27, 31, 35, 0.06)',
          outlineOffset: '-1px',
          borderRadius: '2px',
        }}
        style={{
          backgroundColor: props.color,
          top: props.top,
          right: props.right,
        }}
      ></div>
      <Show when={props.showTooltip && state._showTooltip}>
        <div
          css={{
            zIndex: '15',
            position: 'absolute',
            width: '178px',
            padding: '6px 8px',
            textAlign: 'center',
            borderRadius: '6px',
          }}
          style={{
            backgroundColor: props.tooltipBgColor ?? 'rgba(0, 0, 0, 0.8)',
            color: props.tooltipTextColor ?? '#e4e8ec',
            bottom: 'calc(98px + -' + props.top + ' + 4px)',
            right: getDayRight({
              right: props.right,
              tooltipPosition: state.tooltipPosition,
            }),
          }}
        >
          {getTooltipText({
            tooltipText: props.tooltipText,
            activities: props.activities,
            year: props.year,
            month: props.month,
            day: props.day,
            CONSTANTS,
          })}
        </div>
      </Show>
    </>
  );
}
