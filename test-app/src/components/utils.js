export const getDays = (daysToRender) => {
  const data = new Array(daysToRender).fill(0).map((_, index) => {
    const dt = new Date();
    dt.setDate(dt.getDate() - index);
    const year = ('' + dt.getFullYear()).padStart(2, '0');
    const month = (dt.getMonth() + 1 + '').padStart(2, '0');
    const day = ('' + dt.getDate()).padStart(2, '0');
    return {
      date: year + '-' + month + '-' + day,
      activities: new Array(Math.floor(Math.random() * 8)).fill(0),
    };
  });
  console.log({ data });
  return data;
};
