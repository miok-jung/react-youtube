# props

# state

- useState로 변화를 주어졌을 때 해당하는 컴포넌트 전체자 변화를 준다.

# useEffect

- argument를 가지는 함수
- 한번만 실행하고 싶은 코드를 사용할때 이용
- 예를 들면 API는 한번만 호출해도 되는 상황(get 등 )이 될 수도 있다.
- 변화를 할때만 랜더링을 하기 위해서는 마지막 대문자에 해당하는 값을 넣어준다.

```js
const [keyword, setKeyword] = useState("");
// ...
useEffect(() => {
  console.log("Search: ", keyword);
  return () => console.log("destoryed");
}, [keyword]);
```

- 여기서 keyword는 input에 입력을 할때마다 변화를 주고자 대괄호 안에 keyword를 넣었다. 만약 넣지 않는다면 한번만 랜더링 되어 콘솔에 찍히지 않는다.
- useEffect에서의 return은 clean이 되었을 때(component가 사라지거나 할때) destory가 될 때 이벤트를 줄 수 있다.
