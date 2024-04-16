"use client";
import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { CSACodeSnippets } from "./CSACodeSnippets";
import { cn } from "../../utils";

export const CodingTypeAnimation = () => {
  const [currentCSACodeSnippetsIndex, setCurrentCSACodeSnippetsIndex] =
    React.useState<number>(0);
  const [codeInElement, setCodeInElement] = React.useState<string>(``);
  const [displayMobileView, setDisplayMobileView] =
    React.useState<boolean>(false);

  const CSACodeSnippetsForView = React.useMemo(
    () =>
      CSACodeSnippets.filter(
        (codeSegment) => !codeSegment.disableForMobile || !displayMobileView
      ),
    [displayMobileView]
  );

  React.useEffect(() => {
    let _codeInElement = "";
    const targetText = CSACodeSnippetsForView[currentCSACodeSnippetsIndex].code;
    const textRatio = 40 / targetText.length;
    const newInterval = setInterval(() => {
      _codeInElement = targetText.substring(0, _codeInElement.length + 1);
      setCodeInElement(_codeInElement);
      if (_codeInElement.length === targetText.length) {
        clearInterval(newInterval);
        setTimeout(() => {
          setCurrentCSACodeSnippetsIndex(
            currentCSACodeSnippetsIndex + 1 === CSACodeSnippetsForView.length
              ? 0
              : currentCSACodeSnippetsIndex + 1
          );
        }, 2_000);
      }
    }, 40 * (textRatio > 1 ? 1 : textRatio));

    return () => {
      clearInterval(newInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCSACodeSnippetsIndex]);

  const currentCodeSegmentData =
    CSACodeSnippetsForView[currentCSACodeSnippetsIndex];

  React.useEffect(() => {
    const handleResize = () => {
      const _displayMobileView = document.documentElement.clientWidth <= 1024;
      setDisplayMobileView(_displayMobileView);
      if (_displayMobileView !== displayMobileView) {
        setCodeInElement("");
        setCurrentCSACodeSnippetsIndex(0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [displayMobileView]);

  return (
    <>
      {currentCodeSegmentData.languageFullName.length > 0 && (
        <h1
          className={cn(
            currentCodeSegmentData.useLightBackground
              ? "bg-slate-200"
              : "bg-slate-900",
            `px-3 py-1 max-w-max rounded-full font-bold flex items-center gap-2`
          )}
          style={{ color: currentCodeSegmentData.languageThemeColor }}
        >
          {typeof currentCodeSegmentData.icon === `object` &&
            currentCodeSegmentData.icon}
          {currentCodeSegmentData.languageFullName}
        </h1>
      )}
      <CodeEditor
        value={codeInElement}
        language={currentCodeSegmentData.language}
        contentEditable={false}
        padding={0}
        readOnly
        data-color-mode="dark"
        style={{
          padding: 0,
          backgroundColor: "rgba(0, 0, 0, 0)",
          fontSize: displayMobileView ? 16 : 24,
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </>
  );
};
