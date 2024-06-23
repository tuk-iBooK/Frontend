import HTMLFlipBook from "react-pageflip";
import React, { useState, ForwardRefRenderFunction } from "react";
import "src/App.css";

type PageProps = {
  children: React.ReactNode;
  number?: string;
};

const PageCover: ForwardRefRenderFunction<
  HTMLDivElement,
  { children: React.ReactNode }
> = (props, ref) => {
  return (
    <div className="cover bg-white" ref={ref} data-density="hard">
      <div>
        <h2>{props.children}</h2>
      </div>
    </div>
  );
};

const Page: ForwardRefRenderFunction<HTMLDivElement, PageProps> = (
  props,
  ref
) => {
  return (
    <div className="page bg-white" ref={ref}>
      <h1 className="text-xl font-bold">Page Header</h1>
      <p>{props.children}</p>
      <p>{props.number}</p>
    </div>
  );
};

const PageCoverWithRef = React.forwardRef(PageCover);
const PageWithRef = React.forwardRef(Page);

const Flipbook: React.FC = () => {
  const [inputText, setInputElement] = useState<string>("");
  const [text, setText] = useState<string>("이게머냐구");
  // const printText = () => {
  //   setText(inputText);
  //   setInputElement("");
  // };

  return (
    <div
      style={{ backgroundColor: "lightgray", height: "100vh", padding: "20px" }}
    >
      <HTMLFlipBook
        width={550}
        height={650}
        flippingTime={1000}
        style={{ margin: "0 auto" }}
        maxShadowOpacity={0.5}
        className="flipbook"
        showCover={true} // 표지 표시
      >
        <PageCoverWithRef>try</PageCoverWithRef>
        <PageCoverWithRef> </PageCoverWithRef>
        <PageWithRef number="1">
          <hr></hr>
          <p contentEditable="true">이게뭐양</p>
        </PageWithRef>
        <PageWithRef number="2">
          <hr></hr>
          <p>{text}</p>
        </PageWithRef>
        <PageWithRef number="3">
          <hr></hr>
        </PageWithRef>
        <PageWithRef number="4">
          <hr></hr>
        </PageWithRef>
        <PageCoverWithRef> </PageCoverWithRef>
        <PageCoverWithRef>담에 봐유</PageCoverWithRef>
      </HTMLFlipBook>
      <br></br>
      <br></br>
    </div>
  );
};

export default Flipbook;
