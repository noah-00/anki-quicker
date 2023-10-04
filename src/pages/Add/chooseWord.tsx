import { UnknowWord } from "@/types";
import { ADD_BACK_STEP, ADD_FRONT_STEP } from "@/utils/Const";
import React, { useState } from "react";
import SubmitButton from "@/components/buttons/submitButton";
import BackButton from "@/components/buttons/backButton";

import { useAddCardStore } from "@/context/addCardStore";

export default function ChooseWord() {
  const { handleSetCurrentStep, unknowWords, handleSetUnknowWords, card } =
    useAddCardStore();

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isNotUnknowWords, setIsNotUnknowWords] = useState(false);

  const handleOnMouseUp = () => {
    setIsDuplicate(false);
    setIsNotUnknowWords(false);

    const selectinon = window.getSelection();
    if (selectinon !== null && String(selectinon)) {
      const unknowWord = {
        word: String(selectinon),
        startPostion: selectinon.anchorOffset,
        endPostion: selectinon.focusOffset,
      };

      AddUknownWord(unknowWord);
    }
  };

  const AddUknownWord = (unknowWord: UnknowWord) => {
    if (!isRangeOverlapWithArray(unknowWord)) {
      handleSetUnknowWords([...unknowWords, unknowWord]);
    } else {
      setIsDuplicate(true);
    }
  };

  const isOverlapping = (range1: UnknowWord, range2: UnknowWord) => {
    return !(
      range1.endPostion <= range2.startPostion ||
      range2.endPostion <= range1.startPostion
    );
  };

  const isRangeOverlapWithArray = (newRange: UnknowWord) => {
    for (let range of unknowWords) {
      if (isOverlapping(newRange, range)) {
        return true;
      }
    }
    return false;
  };

  const handleDelete = (indexToRemove: number) => {
    handleSetUnknowWords(unknowWords.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = () => {
    if (unknowWords.length) {
      handleSetUnknowWords(
        unknowWords.sort((a, b) => a.startPostion - b.startPostion)
      );
      handleSetCurrentStep(ADD_BACK_STEP);
    } else {
      setIsNotUnknowWords(true);
    }
  };

  return (
    <>
      <h2 className="border-l-4 border-blue-500 pl-2 font-medium my-5">
        Choose your unknown a word
      </h2>
      <div
        onMouseUp={handleOnMouseUp}
        className="border-2 p-2 my-3 rounded-md text-sm"
      >
        {card.content}
      </div>
      {isDuplicate ? (
        <p className="text-red-600 text-sm mb-3">
          Selected words are duplicated. Please delete and try again.
        </p>
      ) : null}
      <div>
        <h2 className="border-l-4 border-blue-500 pl-2 my-5 font-medium">
          Selected words
        </h2>
        {unknowWords.map((unknowWord, i) => {
          return (
            <div
              key={i}
              className="bg-default-blue-button flex mb-2 items-center justify-between py-0.5 rounded-md"
            >
              <div className="px-2">{i + 1}.</div>
              <div>{unknowWord.word}</div>
              <div className="px-2">
                <button className="pt-1" onClick={() => handleDelete(i)}>
                  <svg
                    className="w-4 h-4 bg-white text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
        {isNotUnknowWords ? (
          <p className="text-red-600 text-sm mb-3">
            Please select at least one word.
          </p>
        ) : null}
      </div>
      <div className="flex justify-between mt-6">
        <BackButton
          handleClick={() => {
            handleSetCurrentStep(ADD_FRONT_STEP);
            handleSetUnknowWords([]);
          }}
        />
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
    </>
  );
}