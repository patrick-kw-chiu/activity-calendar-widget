# Activity Calendar Widget

A "GitHub Contribution/Activity" like calendar widget, that can be used as native components of [React](https://stackblitz.com/edit/react-ts-pjkx7k), [Vue](https://stackblitz.com/edit/vitejs-vite-zwsqz2?file=src), [Svelte](https://stackblitz.com/edit/vitejs-vite-r7rxjt?terminal=dev), [Solid](https://stackblitz.com/edit/solidjs-templates-mjote1) and [Qwik](https://stackblitz.com/edit/qwik-starter-due4dq). You can used it with the [GitHub activity API](https://docs.github.com/en/rest/activity/events?apiVersion=2022-11-28#list-public-events-for-a-user) or to display any activity data.

<p align="center">
  <img src="https://user-images.githubusercontent.com/42149082/231084223-c334f434-26e1-45b0-b707-9548d29013a1.png">
  <img src="https://user-images.githubusercontent.com/42149082/231084227-6bee6da3-e5c8-4485-8921-399428acfb35.png">
</p>
<!--
<p align="center">
  Quick Start With...
</p>
<p align="center">
  <a href="./react/README.md">React</a> |
  <a href="./vue/README.md">Vue</a> |
  <a href="./svelte/README.md">Svelte</a> |
  <a href="./solid/README.md">Solid</a> |
  <a href="./qwik/README.md">Qwik</a>
</p>
-->

## About

**Activity Calendar Widget** is built with [Mitosis](https://github.com/BuilderIO/mitosis) (with a little modifications), which aims to "Write components once, compile to every framework". Interested to learn more? Here is a [walkthrough of building a "simplied" Activity Calendar Widget](https://medium.com/@patrick-kw-chiu/write-components-once-compile-to-every-framework-with-mitosis-9330411d21e4).

_Credits: The API of **Activity Calendar Widget** is highly influenced by [React Activity Calendar](https://github.com/grubersjoe/react-activity-calendar). React Activity Calendar is a great component library, which provides more granular options in certain areas._

## Installation

`npm i activity-calendar-widget`

It can then be imported in various frameworks like...

```javascript
// React
import ActivityCalendarWidget from "activity-calendar-widget/react";

// Vue
import ActivityCalendarWidget from "activity-calendar-widget/vue";

// Svelte
import ActivityCalendarWidget from "activity-calendar-widget/svelte";

// Solid
import ActivityCalendarWidget from "activity-calendar-widget/solid";

// Qwik
import ActivityCalendarWidget from "activity-calendar-widget/qwik";
```

### Basic Usage

```
<ActivityCalendarWidget
  daysToRender={150}
  data={[
    { date: '2023-04-05', activities: [{}, {}, {}, {}] },
    { date: '2023-04-07', activities: [{}] },
    { date: '2023-04-08', activities: [{}, {}, {}] },
  ]}
/>
```

## API

### Props

| Props name        | Type                                                                                                                                     | Default                                            | Description                                                                                                                                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data              | array of [`Data`](https://github.com/patrick-kw-chiu/activity-calendar-widget/edit/main/README.md#data)                                  | []                                                 | The activity `data` array. It accepts the `date` and `activities` fields.                                                                                                                                                                                                              |
| clickHandler      | Function<br>`(dateInfo: `[`DateInfo`](https://github.com/patrick-kw-chiu/activity-calendar-widget/edit/main/README.md#dateinfo)`) => {}` | undefined                                          | The activity `data` array. It accepts the `date` and `activities` fields.                                                                                                                                                                                                              |
| daysToRender      | number                                                                                                                                   | 365 (+ 0 to 6 days more). See more the description | When `daysToRender` isn't specified, at least 365 days from today will be rendered, while the leftmost (oldest) column will also be filled up entirely.<br><br>When `daysToRender` is specified, `activity-calendar-widget` will render the exact number of `daysToRender` from today. |
| mode              | string                                                                                                                                   | `'day'`                                            | Options: `'day'` / `'week'` / `'month'`.<br><br>**Note: Only `day` is supported currently.** See roadmap for more info.                                                                                                                                                                |
| showSummary       | boolean                                                                                                                                  | true                                               | If set to `true`, a summary of "26 activities in this period" will be displayed in the bottom left of the component.                                                                                                                                                                   |
| summaryText       | string                                                                                                                                   | `'{{count}} activities in this period'`            | The customized summary text with placeholder `{{count}}`                                                                                                                                                                                                                               |
| showLevels        | boolean                                                                                                                                  | true                                               | If set to `true`, a level legend will be displayed in the bottom right of the component.                                                                                                                                                                                               |
| levelColorMode    | string                                                                                                                                   | `'light'`                                          | Options: `'light'` / `'dark'`. It changes the color palette of the level legend, like the screenshots at the top.<br><br>If `levelColorMode` is used together with `levelColors`, `levelColorMode` will be ignored and **ONLY** `levelColor` will be used.                             |
| levelColors       | array of string                                                                                                                          | `undefined`                                        | If `levelColors` is used together with `levelColorMode`, `levelColorMode` will be ignored and **ONLY** `levelColor` will be used. E.g. `['white', 'rgba(0, 0, 0, 0.2'), '#a6a6a6']`                                                                                                    |
| levelLabelLess    | string                                                                                                                                   | `'Less'`                                           | The "Less" label of the level legend                                                                                                                                                                                                                                                   |
| levelLabelMore    | string                                                                                                                                   | `'More'`                                           | The "More" label of the level legend                                                                                                                                                                                                                                                   |
| showTooltip       | boolean                                                                                                                                  | true                                               | If set to `true`, when users hover the date box, a tooltip of "2 activities on Apr 11, 2023" will be displayed.                                                                                                                                                                        |
| tooltipBgColor    | string                                                                                                                                   | `'rgba(0, 0, 0, 0.8)'`                             | The tooltip background color                                                                                                                                                                                                                                                           |
| tooltipTextColor  | string                                                                                                                                   | `'#e4e8ec'`                                        | The tooltip text color                                                                                                                                                                                                                                                                 |
| weekStart         | number                                                                                                                                   | 0                                                  | Options: `0` / `1` / `2` / `3` / `4` / `5` / `6`<br><br>The week start with:<br>`0`: Sun<br>`1`: Mon<br>`2`: Tue<br>`3`: Wed<br>`4`: Thu<br>`5`: Fri<br>`6`: Sat                                                                                                                       |
| showWeekdayLabels | boolean                                                                                                                                  | true                                               | If set to `true`, the left weekday labels will be displayed.                                                                                                                                                                                                                           |
| weekdayLabel      | [`WeekdayLabel`](https://github.com/patrick-kw-chiu/activity-calendar-widget/edit/main/README.md#weekdaylabel)                           | {}                                                 | By default, the widget only displays `Mon`, `Wed` and `Fri`. If the allowed keys in `weekdayLabel` is provided e.g. `{ 0: '日曜日' }`, the week value will be overwritten.<br><br>**Note**: To provide custom value for **Sunday**, provide value to **`0`** e.g. `{ 0: '日曜日' }`.   |
| showMonthLabels   | boolean                                                                                                                                  | true                                               | If set to `true`, the top month labels will be displayed.                                                                                                                                                                                                                              |
| monthLabel        | [`MonthLabel`](https://github.com/patrick-kw-chiu/activity-calendar-widget/edit/main/README.md#monthlabel)                               | {}                                                 | By default, all months will be displayed. If the allowed keys in `monthLabel` is provided e.g. `{ 1: '1월' }`, the month value will be overwritten.                                                                                                                                    |

## Event Handlers

### clickHandler(dateInfo: DateInfo)

#### DateInfo

| Fields           | Type           | Format       | Description                                                                                                                                                                                                                          |
| ---------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id               | string         | `yyyy-MM-dd` | The date being clicked                                                                                                                                                                                                               |
| year             | number         | `yyyy`       | The year of the date box being clicked                                                                                                                                                                                               |
| month            | number         | `MM`         | The month of the date box being clicked                                                                                                                                                                                              |
| day              | number         | `dd`         | The day of the date box being clicked                                                                                                                                                                                                |
| dayOfWeek        | number         | `0-6`        | The day of week of the date box being clicked<br><br>`0`: Sun<br>`1`: Mon<br>`2`: Tue<br>`3`: Wed<br>`4`: Thu<br>`5`: Fri<br>`6`: Sat                                                                                                |
| dayDiffFromToday | number         | `>= 0`       | Numebrs of days from today                                                                                                                                                                                                           |
| activities       | array of `any` | `[]`         | Each item inside the `activities` array will count as 1 activity. The format is arbitary here. You can pass `{ "type": "PushEvent" }` or `'PullRequestEvent'` or **anything**.                                                       |
| level            | number         | `>= 0`       | If no custom `levelColors` is passed, level will be `0-4`. `0` means no activities and `4` means the tier of having the most activities.<br><br>If custom `levelColors` is passed, level will be `0` to `length of levelColors - 1`. |

#### Usage

```JSX
<ActivityCalendarWidget
  clickHandler={(dateInfo) => console.log({ dateInfo })}
/>
```

#### DateInfo Example

```json
{
    "id": "2023-04-16",
    "year": 2023,
    "month": 4,
    "day": 16,
    "dayOfWeek": 0,
    "dayDiffFromToday": 0,
    "activities": [
        ...
    ],
    "level": 2
}
```

## Types

### Data

| Field      | Type           | Format       | Description                                                                                                                                                                                                                                                                                                          |
| ---------- | -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| date       | string         | `yyyy-MM-dd` | The date which contains 0 or more activities.<br>E.g. `'2023-04-05'`                                                                                                                                                                                                                                                 |
| activities | array of `any` | `[]`         | Each item inside the `activities` array will count as 1 activity. The format is arbitary here. You can pass `{ "type": "PushEvent" }` or `'PullRequestEvent'` or **anything**.<br><br>If you pass a `clickHandler` and you clicked the date box, the `clickHandler` callback will be executed with the `activities`. |

#### Example

```
[
  { date: '2023-04-05', activities: [{}, {}, {}, {}] },
  { date: '2023-04-07', activities: [{}] },
  { date: '2023-04-08', activities: [{}, {}, {}] }
]
```

### WeekdayLabel

```typescript
type WeekdayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type WeekdayLabel = Record<WeekdayKey, string>;
```

#### Example:

```
{
  0: '日曜日',
  1: '月曜日',
  2: '火曜日',
  3: '水曜日',
  4: '木曜日',
  5: '金曜日',
  6: '土曜日',
}
```

### MonthLabel

```typescript
type MonthKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type MonthLabel = Record<MonthKey, string>;
```

#### Example:

```
{
  1: '1월',
  2: '2월',
  3: '3월',
  // ...
  10: '10월',
  11: '11월',
  12: '12월',
}
```

## Roadmap

- Support `mode={'month'}`

![Screenshot 2023-04-13 at 1 13 47 AM](https://user-images.githubusercontent.com/42149082/231660042-cd7f43cf-8d20-4b53-9d5e-d54d60e22c30.png)

- Support `mode={'week'}`

<img width="420" alt="Screenshot 2023-04-13 at 1 12 12 AM" src="https://user-images.githubusercontent.com/42149082/231660200-3b92e315-44b5-4568-b6f8-87150e9d1ff6.png">

## Development

0. (One off) Install dependencies of the Mitosis component and the test app

```
npm install

cd test-app
npm install
```

1. In the root directory, watch and re-build changes in `/src`.

```
npm run start
```

2. In another terminal, run the test-app (an Astro app that have `react`, `solid`, `svelte` and `vue` baked in)

```
cd test-app
npm run start
```
