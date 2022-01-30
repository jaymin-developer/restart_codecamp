const classmates = ["철수", "영희", "훈이"];
// undefined
classmates.map((el) => el + "어린이");
// (3) ['철수어린이', '영희어린이', '훈이어린이']
const classmates2 = [{ name: "철수" }, { name: "영희" }, { name: "훈이" }];
// undefined
classmates2.map((el) => ({ name: `${el.name} + 어린이` }));
// (3) [{…}, {…}, {…}]
// 0: {name: '철수 + 어린이'}1: {name: '영희 + 어린이'}2: {name: '훈이 + 어린이'}length: 3[[Prototype]]: Array(0)
classmates2.map((el) => 0);
// (3) [0, 0, 0]
const classmates = [
  { name: "철수", age: 13 },
  { name: "영희", age: 10 },
  { name: "훈이", age: 11 },
];

classmates.map((el) => ({
  name: el.name,
  age: el.age,
  school: "토끼초등학교",
}));
