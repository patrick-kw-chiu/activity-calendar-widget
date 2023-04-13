# Activity Calendar Widget

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

`activity-calendar-widget` is a **"Github Activity" like** calendar widget, that can be used in [React](https://stackblitz.com/edit/react-ts-pjkx7k), [Vue](https://stackblitz.com/edit/vue-at6pyy), [Svelte](https://stackblitz.com/edit/vitejs-vite-r7rxjt?terminal=dev), [Solid](https://stackblitz.com/edit/solidjs-templates-mjote1) and [Qwik](https://stackblitz.com/edit/qwik-starter-due4dq). You can used it with the [Github activity API](https://docs.github.com/en/rest/activity/events?apiVersion=2022-11-28#list-public-events-for-a-user) or to display any activity data.

It is built with [Mitosis](https://github.com/BuilderIO/mitosis) (with a little modifications), which aims to "Write components once, compile to every framework". Interested to learn more? Here is a [walkthrough of building a "simplied" Activity Calendar Widget](https://medium.com/@patrick-kw-chiu/write-components-once-compile-to-every-framework-with-mitosis-9330411d21e4).

_Credits: The API of **Activity Calendar Widget** is highly influenced by [React Activity Calendar](https://github.com/grubersjoe/react-activity-calendar). React Activity Calendar is a great component library, which provides more granular options in certain areas._

## Installation

`npm install activity-calendar-widget`

It can then be imported in various frameworks like...

```javascript
// React
import ActivityCalendarWidget from 'activity-calendar-widget/react';

// Vue
import ActivityCalendarWidget from 'activity-calendar-widget/vue';

// Svelte
import ActivityCalendarWidget from 'activity-calendar-widget/svelte';

// Solid
import ActivityCalendarWidget from 'activity-calendar-widget/solid';

// Qwik
import ActivityCalendarWidget from 'activity-calendar-widget/qwik';
```

## API

### Props

| Props name       | Type                                                                                                    | Default                                 | Description                                                                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data             | array of [`Data`](https://github.com/patrick-kw-chiu/activity-calendar-widget/edit/main/README.md#data) | []                                      | The activity `data` array. It accepts the `date` and `activities` fields.                                                                                                                                                                                    |
| mode             | string                                                                                                  | `'day'`                                 | Options: `'day'` / `'week'` / `'month'`.</br></br>**Note: Only `day` is supported currently.** See roadmap for more info.                                                                                                                                    |
| showSummary      | boolean                                                                                                 | true                                    | If set to `true`, a summary of "26 activities in this period" will be displayed in the bottom left of the component.                                                                                                                                         |
| summaryText      | string                                                                                                  | `'{{count}} activities in this period'` | The customized summary text with placeholder `{{count}}`                                                                                                                                                                                                     |
| showLevels       | boolean                                                                                                 | true                                    | If set to `true`, a level legend will be displayed in the bottom right of the component.                                                                                                                                                                     |
| levelColorMode   | string                                                                                                  | `'light'`                               | Options: `'light'` / `'dark'`. It changes the color palette of the level legend, like the screenshots at the top.</br></br>If `levelColorMode` is used together with `levelColors`, `levelColorMode` will be ignored and **ONLY** `levelColor` will be used. |
| levelColors      | array of string                                                                                         | `undefined`                             | If `levelColors` is used together with `levelColorMode`, `levelColorMode` will be ignored and **ONLY** `levelColor` will be used. E.g. `['white', 'rgba(0, 0, 0, 0.2'), '#a6a6a6']`                                                                          |
| levelLabelLess   | string                                                                                                  | `'Less'`                                | The "Less" label of the level legend                                                                                                                                                                                                                         |
| levelLabelMore   | string                                                                                                  | `'More'`                                | The "More" label of the level legend                                                                                                                                                                                                                         |
| showTooltip      | boolean                                                                                                 | true                                    | If set to `true`, when users hover the date box, a tooltip of "2 activities on Apr 11, 2023" will be displayed.                                                                                                                                              |
| tooltipBgColor   | string                                                                                                  | `'rgba(0, 0, 0, 0.8)'`                  | The tooltip background color                                                                                                                                                                                                                                 |
| tooltipTextColor | string                                                                                                  | `'#e4e8ec'`                             | The tooltip text color                                                                                                                                                                                                                                       |

### Data

| Field      | Type       | Format       | Description                                                                                                                                                                                                                                                                                                 |
| ---------- | ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| date       | string     | `yyyy-MM-dd` | The date which contains 0 or more activities.</br>E.g. `'2023-04-05'`                                                                                                                                                                                                                                       |
| activities | array<any> | n/a          | Each item inside the `activities` array will count as 1 activity. The format is arbitary here. You can pass `{ "type": "PushEvent" }` or just `'PullRequestEvent'`.</br></br>If you pass a `clickHandler` and you clicked the date box, the `clickHandler` callback will be executed with the `activities`. |

Example:

```
[
  { date: '2023-04-05', activities: [{}, {}, {}, {}] },
  { date: '2023-04-07', activities: [{}] },
  { date: '2023-04-08', activities: [{}, {}, {}] }
]
```

## Roadmap

- Support `mode={'month'}`

![Screenshot 2023-04-13 at 1 13 47 AM](https://user-images.githubusercontent.com/42149082/231660042-cd7f43cf-8d20-4b53-9d5e-d54d60e22c30.png)

- Support `mode={'week'}`

<img width="420" alt="Screenshot 2023-04-13 at 1 12 12 AM" src="https://user-images.githubusercontent.com/42149082/231660200-3b92e315-44b5-4568-b6f8-87150e9d1ff6.png">
