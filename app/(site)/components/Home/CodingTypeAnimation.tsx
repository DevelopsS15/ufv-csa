"use client";
import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { CSACodeSegments } from "./CSACodeSegments";
import { cn } from "../../utils";

export const CodingTypeAnimation = () => {
  const [currentCsaCodeSegmentsIndex, setCurrentCsaCodeSegmentsIndex] =
    React.useState<number>(0);
  const [codeInElement, setCodeInElement] = React.useState<string>(``);
  const [displayMobileView, setDisplayMobileView] =
    React.useState<boolean>(false);

  const CSACodeSegmentsForView = React.useMemo(
    () =>
      CSACodeSegments.filter(
        (codeSegment) => !codeSegment.disableForMobile || !displayMobileView
      ),
    [displayMobileView]
  );

  React.useEffect(() => {
    let _codeInElement = "";
    const targetText = CSACodeSegmentsForView[currentCsaCodeSegmentsIndex].code;
    const textRatio = 40 / targetText.length;
    const newInterval = setInterval(() => {
      _codeInElement = targetText.substring(0, _codeInElement.length + 1);
      setCodeInElement(_codeInElement);
      if (_codeInElement.length === targetText.length) {
        clearInterval(newInterval);
        setTimeout(() => {
          setCurrentCsaCodeSegmentsIndex(
            currentCsaCodeSegmentsIndex + 1 === CSACodeSegmentsForView.length
              ? 0
              : currentCsaCodeSegmentsIndex + 1
          );
        }, 2_000);
      }
    }, 40 * (textRatio > 1 ? 1 : textRatio));

    return () => {
      clearInterval(newInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCsaCodeSegmentsIndex]);

  const currentCodeSegmentData =
    CSACodeSegmentsForView[currentCsaCodeSegmentsIndex];

  React.useEffect(() => {
    const handleResize = () => {
      const _displayMobileView = document.documentElement.clientWidth <= 1024;
      setDisplayMobileView(_displayMobileView);
      if (_displayMobileView !== displayMobileView) {
        setCodeInElement("");
        setCurrentCsaCodeSegmentsIndex(0);
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
