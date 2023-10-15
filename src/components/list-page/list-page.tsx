import styles from "./list.module.css";
import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import useInput from "../../hooks/useInput";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./LinkedList";
import { ElementStates } from "../../types/element-states";
import { delay } from "../utils/utils";

enum Position {
  HEAD = "head",
  TAIL = "tail",
}

interface IModifyLinkedList<T> {
  prepend(element: T): void;
  append(element: T): void;
  shift(): void;
  pop(): void;
  insertElement(element: T, position: number): void;
  removeElement(position: number): void;
}

const linkedList = new LinkedList<string>();

export const ListPage: React.FC = () => {
  const [list, setList] = useState<string[]>([]);
  const [inputValue, setInputValue, handleInputChange] = useInput<string>("");
  const [inputIndex, setInputIndex, handleIndexChange] = useInput<number>(0);

  const [circleState, setCircleState] = useState<ElementStates[]>([]);
  const [events, setEvents] = useState({
    addEvent: false,
    removeEvent: false,
    addElementAtHeadEvent: false,
    addElementAtTailEvent: false,
    addElementByIndexEvent: false,
    removeElementAtHeadEvent: false,
    removeElementAtTailEvent: false,
    removeElementByIndexEvent: false,
  });
  const [startEndBtnDisabled, setStartEndBtnDisabled] = useState<boolean>(
    false
  );
  const countRef = useRef<number>(0);

  const performLinkedListOperation = async (
    positionOrIndex: number,
    operation: (list: IModifyLinkedList<string>) => void
  ) => {
    countRef.current = positionOrIndex;
    updateCircleColor(ElementStates.Changing, positionOrIndex);
    await delay(500);
    updateCircleColor(ElementStates.Default, positionOrIndex);

    operation(linkedList);

    setList([...linkedList.ToArray()]);
  };

  const addElementByIndex = async () => {
    setEvents((prev) => ({
      ...prev,
      addElementByIndexEvent: true,
    }));

    try {
      const count = Number(inputIndex);
      setEvents((prev) => ({
        ...prev,
        addEvent: true,
      }));

      for (let i = 0; i < count; i++) {
        countRef.current = i;
        updateCircleColor(ElementStates.Changing, i);
        await delay(500);
      }
      //
      await performLinkedListOperation(count, (list) => {
        list.insertElement(inputValue, count);
      });
      setInputIndex(0);
      setInputValue("");

      updateCircleColor(ElementStates.Modified, count);
      await delay(500);
      setCircleState([]);
    } catch (err) {
      console.error(err);
    } finally {
      setEvents((prev) => ({
        ...prev,
        addEvent: false,
        addElementByIndexEvent: false,
      }));
    }
  };

  const removeElementByIndex = async () => {
    setEvents((prev) => ({
      ...prev,
      removeElementByIndexEvent: true,
    }));
    try {
      const count = Number(inputIndex);
      for (let i = 0; i <= count; i++) {
        updateCircleColor(ElementStates.Changing, i);
        await delay(500);
      }
      setEvents((prev) => ({
        ...prev,
        removeEvent: true,
      }));
      await performLinkedListOperation(count, (list) => {
        list.removeElement(count);
      });
      setInputIndex(0);
      setCircleState([]);
    } catch (err) {
      console.error(err);
    } finally {
      setEvents((prev) => ({
        ...prev,
        removeEvent: false,
        removeElementByIndexEvent: false,
      }));
    }
  };

  const addElementAtHead = async (byIndex: boolean = false) => {
    !byIndex &&
      setEvents((prev) => ({
        ...prev,
        addEvent: true,
        addElementAtHeadEvent: true,
      }));
    try {
      await performLinkedListOperation(0, (list) => {
        list.prepend(inputValue);
      });
      setInputValue("");

      updateCircleColor(ElementStates.Modified, 0);
      await delay(500);
      updateCircleColor(ElementStates.Default, 0);
    } finally {
      !byIndex &&
        setEvents((prev) => ({
          ...prev,
          addEvent: false,
          addElementAtHeadEvent: false,
        }));
    }
  };

  const addElementAtTail = async (byIndex: boolean = false) => {
    !byIndex &&
      setEvents((prev) => ({
        ...prev,
        addEvent: true,
        addElementAtTailEvent: true,
      }));
    try {
      const size = linkedList.getSize() - 1;
      await performLinkedListOperation(size, (list) => {
        list.append(inputValue);
        setInputValue("");
      });
      updateCircleColor(ElementStates.Modified, size + 1);
      await delay(500);
      updateCircleColor(ElementStates.Default, size + 1);
    } finally {
      !byIndex &&
        setEvents((prev) => ({
          ...prev,
          addEvent: false,
          addElementAtTailEvent: false,
        }));
    }
  };

  const removeElementAtHead = async (byIndex: boolean = false) => {
    !byIndex &&
      setEvents((prev) => ({
        ...prev,
        removeEvent: true,
        removeElementAtHeadEvent: true,
      }));
    try {
      await performLinkedListOperation(0, (list) => {
        list.shift();
      });
    } finally {
      !byIndex &&
        setEvents((prev) => ({
          ...prev,
          removeEvent: false,
          removeElementAtHeadEvent: false,
        }));
    }
  };

  const removeElementAtTail = async (byIndex: boolean = false) => {
    !byIndex &&
      setEvents((prev) => ({
        ...prev,
        removeEvent: true,
        removeElementAtTailEvent: true,
      }));
    try {
      const size = linkedList.getSize() - 1;
      await performLinkedListOperation(size, (list) => {
        list.pop();
      });
    } finally {
      !byIndex &&
        setEvents((prev) => ({
          ...prev,
          removeEvent: false,
          removeElementAtTailEvent: false,
        }));
    }
  };

  /**
   *Функция  обновляющая цвет у элемента
   *
   * @param {ElementStates} elementStates цвет элемента (выбирается из коллекции)
   */
  const updateCircleColor = (elementStates: ElementStates, index: number) => {
    setCircleState((prev) => {
      let newArr = [...prev];
      newArr[index] = elementStates;
      return newArr;
    });
  };

  const smileCircleState = (
    indexValue: number,
    index: number
  ): false | JSX.Element => {
    const letter = events.removeEvent ? list[index] : inputValue;

    return (
      indexValue === index &&
      circleState[indexValue] === ElementStates.Changing && (
        <Circle isSmall={true} letter={letter} state={ElementStates.Changing} />
      )
    );
  };

  const isPosition = (index: number, position: Position): Position | null => {
    switch (true) {
      case index === 0 && position === Position.HEAD:
        return Position.HEAD;
      case index === list.length - 1 && position === Position.TAIL:
        return Position.TAIL;
      default:
        return null;
    }
  };

  useEffect(() => {
    linkedList.fromArray(["0", "1", "2", "3"]);
    setList(linkedList.ToArray());

    return () => {
      linkedList.clear();
    };
  }, []);

  useEffect(() => {
    if (list.length < 6) {
      setStartEndBtnDisabled(false);
    } else {
      setStartEndBtnDisabled(true);
    }
  }, [list]);

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.form} pb-6`}>
        <Input
          extraClass={styles.input_linkedList}
          isLimitText={true}
          maxLength={4}
          onChange={handleInputChange}
          value={inputValue}
        />
        <Button
          extraClass={styles.button_size_s}
          text="Добавить в head"
          onClick={() => {
            addElementAtHead();
          }}
          disabled={startEndBtnDisabled || !inputValue}
          isLoader={events.addElementAtHeadEvent}
        />
        <Button
          extraClass={styles.button_size_s}
          text="Добавить в tail"
          onClick={() => {
            addElementAtTail();
          }}
          disabled={startEndBtnDisabled || !inputValue}
          isLoader={events.addElementAtTailEvent}
        />
        <Button
          extraClass={styles.button_size_s}
          text="Удалить из head"
          onClick={() => {
            removeElementAtHead();
          }}
          disabled={list.length === 0}
          isLoader={events.removeElementAtHeadEvent}
        />
        <Button
          extraClass={styles.button_size_s}
          text="Удалить из tail"
          onClick={() => {
            removeElementAtTail();
          }}
          disabled={list.length === 0}
          isLoader={events.removeElementAtTailEvent}
        />
      </div>
      <div className={styles.form}>
        <Input
          extraClass={styles.input_linkedList}
          type="number"
          min={0}
          max={list.length - 1}
          step={1}
          maxLength={4}
          onChange={handleIndexChange}
          placeholder="Введите индекс"
          value={inputIndex}
        />
        <Button
          extraClass={styles.button_size_l}
          text="Добавить по индексу"
          onClick={addElementByIndex}
          disabled={
            startEndBtnDisabled ||
            !inputValue ||
            inputIndex < 0 ||
            inputIndex > list.length - 1
          }
          isLoader={events.addElementByIndexEvent}
        />
        <Button
          extraClass={styles.button_size_l}
          text="Удалить по индексу"
          onClick={removeElementByIndex}
          disabled={
            !inputIndex.toString() ||
            inputIndex < 0 ||
            inputIndex > list.length - 1
          }
          isLoader={events.removeElementByIndexEvent}
        />
      </div>
      <ul className={styles.container}>
        {list.map((item, index, arr) => {
          return (
            <li className={styles.list} key={index}>
              <Circle
                letter={item}
                state={circleState[index]}
                index={index}
                head={
                  (events.addEvent &&
                    smileCircleState(Number(countRef.current), index)) ||
                  isPosition(index, Position.HEAD)
                }
                tail={
                  (events.removeEvent &&
                    smileCircleState(Number(countRef.current), index)) ||
                  isPosition(index, Position.TAIL)
                }
              />
              {index < arr.length - 1 && <ArrowIcon />}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
