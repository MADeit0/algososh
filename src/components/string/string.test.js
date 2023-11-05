import { reverseString } from "./utils";

describe("reverseString function", () => {
  const setIsSorting = jest.fn();
  const setReversedStr = jest.fn();
  const setCircleStates = jest.fn();
  const intervalRef = { current: null };

  it("корректно разворачивает строку с четным количеством символов", () => {
    const str = "1234";
    const reversedStr = str.split("").reverse();
    jest.useFakeTimers();
    reverseString(
      str,
      setIsSorting,
      setReversedStr,
      setCircleStates,
      intervalRef
    );

    jest.runAllTimers();
    expect(setReversedStr).toHaveBeenCalledWith(reversedStr);
    expect(setReversedStr).toBeCalledTimes(3);
  });

  it("корректно разворачивает строку с нечетным количеством символов", () => {
    const str = "12345";
    const reversedStr = str.split("").reverse();
    jest.useFakeTimers();
    reverseString(
      str,
      setIsSorting,
      setReversedStr,
      setCircleStates,
      intervalRef
    );

    jest.runAllTimers();
    expect(setReversedStr).toHaveBeenCalledWith(reversedStr);
    expect(setReversedStr).toBeCalledTimes(3);
  });

  it("корректно разворачивает строку с одним символом", () => {
    const str = "1";

    jest.useFakeTimers();
    reverseString(
      str,
      setIsSorting,
      setReversedStr,
      setCircleStates,
      intervalRef
    );

    jest.runAllTimers();
    expect(setReversedStr).toHaveBeenCalledWith(["1"]);
  });

  it("корректно обрабатывает пустую строку", () => {
    const str = "";

    jest.useFakeTimers();
    reverseString(
      str,
      setIsSorting,
      setReversedStr,
      setCircleStates,
      intervalRef
    );

    jest.runAllTimers();
    expect(setReversedStr).toHaveBeenCalledWith([]);
  });
});
