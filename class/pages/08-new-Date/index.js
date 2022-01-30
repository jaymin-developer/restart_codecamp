const getMyDate = (MyDate) => {
  const aaa = new Date(MyDate);
  // 함수 안에 비어있으면 오늘날짜, 해당 날짜 작성하면 그 날
  const year = aaa.getFullYear();
  // 연
  const month = aaa.getMonth() + 1;
  // 0부터 시작해서 +1 을 해줘야 한다.
  const date = aaa.getDate();
  // 일
  //   aaa.getDay();
  //월화수목금토일을 숫자로
  return `${year}.${month}-${date}`;
};

getMyDate(el.createdAt);
