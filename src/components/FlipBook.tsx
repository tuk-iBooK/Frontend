// import React, { useRef, useEffect, useState } from "react";
// import HTMLFlipBook from "react-pageflip";
// import axios from "axios";

// interface FlipBookProps {
//     story_id: number | undefined;
// }

// const PageCover : React.FC<{ children: React.ReactNode; }> = (props) =>{
//     return (
//         <div
//             className="h-full p-3 text-left text-black bg-[#ECECEC]"
//             style={{
//                 boxShadow:
//                 "inset -7px 0 30px -7px rgba(0, 0, 0, 0.4), 10px 10px 4px rgba(0, 0, 0, 0.20)",
//             }}
//         >
//             <div className="w-full h-full p-1 color-[#F5F5F5] border-spacing-1">
//                 <div className="w-full h-full flex flex-col justify-center">
//                     <div>{props.children}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Page: React.FC<{ children: React.ReactNode; number: number; left:boolean }> = React.forwardRef(
//     (props, ref: React.Ref<HTMLInputElement>) => {

//         return (
//             <div className="w-full h-full p-1 color-[#785e3a] border-spacing-1" ref={ref}>
//                 <div className="w-full h-full flex flex-col justify-between">
//                     <div className="overflow-y-scroll h-11/12 flex-grow-1 text-size-[18px] text-justify mt-6 p-10 lg:text-18 text-15">{props.children}</div>
//                     {!props.left && <h2 className="h-auto font-[20px] text-right mr-5 mb-2 ml-5 text-black">{props.number}</h2>}
//                     {props.left && <h2 className="h-auto font-[20px] text-left mr-5 mb-2 ml-5 text-black">{props.number}</h2>}
//                 </div>
//             </div>
//         );
//     }
// );

// interface Story {
//     "id": number;
//     "page": number;
//     "image": string;
//     "content": string;
// }

// interface Response {
//     "novel_name": string;
//     "coverImage": string;
//     "Story": Story[];
// }

// function PageList(Story: Story[]) {
//     const pageList: any = [];
//     Story.map((data, index) => {
//         for (let i = 0; i < 2; i++){
//             pageList.push(
//                 (i === 1) ? ( // 위에는 책 오른쪽 페이지 구성 아래는 책 왼쪽 페이지 구성 같네요 (나중에 바꿔야 겠네요)
//                     <div
//                     className="h-full p-3 text-left bg-[#fdfaf7] text-black"
//                     style={{
//                         boxShadow:
//                         "inset -7px 0 30px -7px rgba(0, 0, 0, 0.4), 10px 10px 4px rgba(0, 0, 0, 0.20)",
//                     }}
//                     >
//                         <Page key={data.id} number={2*index+2} left={false}>
//                             <div className="h-full">
//                             {(Story != null) && data.content.split("\n").map((line, index) => (
//                                 <span key={index}>{line}<br/></span>
//                             ))}
//                             </div>
//                         </Page>
//                     </div> ) : (
//                     <div
//                         className="h-full p-3 text-left bg-[#fdfaf7] text-black"
//                         style={{
//                             boxShadow:
//                                 "inset 7px 0 36px -7px rgba(0, 0, 0, 0.4), 10px 10px 4px rgba(0, 0, 0, 0.20)",
//                             borderLeft:
//                                 "0",
//                         }}
//                     >
//                         <Page key={data.id} number={2*index+1} left={true}>
//                             <div className="flex flex-col items-center">
//                                 <span className="mb-8 text-center text-5xl text-[#744624] font-['Inria']">Chapter {index+1}</span>
//                                 <img src={data.image} className="w-4/5 h-3/4 flex flex-col items-center object-cover" />
//                             </div>
//                         </Page>
//                     </div>
//                     )
//                 )
//             }
//         }
//     )
//     console.log(pageList)
//     return pageList;
// }

// const FlipBook: React.FC<FlipBookProps> = (props)  => {
//     const [Story, setStory] = useState<Story[]>();
//     const [pageList, setpageList] = useState<[]>();
//     const url = 'http://localhost:8000/api/story-content?story_id=2&page=5'+ props.story_id; // 앞 형식으로 url 바꿔야 함
//     const GetData = async () => {
//         try {
//             const response = await axios.get<Response>(url, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                     }
//                 }
//             );
//             setStory(response.data.Story);
//             setpageList(PageList(response.data.Story))
//             console.log(pageList)
//         } catch(err) {
//             console.log(err);
//         }
//     }

//     useEffect(() => {
//         GetData();
//     }, []);

//     const book = useRef(null);
//     return (
//         Story && pageList &&
//         <div className="w-screen h-screen">
//             <div className="h-11/12 flex flex-col justify-center items-center">
//                 <div className="xl:w-9/12 md:w-10/12 sm:w-9/12 w-11/12 h-4/6 absolute md:top-24 top-24">
//                     <div className="flex flex-col animate-fade-up animate-once animate-duration-1000 animate-ease-linear">
//                         <HTMLFlipBook
//                             width={580}
//                             height={680}
//                             size="stretch"
//                             minWidth={400}
//                             maxWidth={650}
//                             minHeight={600}
//                             maxHeight={680}
//                             drawShadow={true}
//                             flippingTime={1000}
//                             className="book-theme"
//                             startPage={1}
//                             usePortrait={true}
//                             startZIndex={30}
//                             autoSize={true}
//                             maxShadowOpacity={0.5}
//                             showCover={false}
//                             mobileScrollSupport={true}
//                             clickEventForward={true}
//                             useMouseEvents={true}
//                             swipeDistance={3}
//                             showPageCorners={true}
//                             disableFlipByClick={false}
//                             style={{ }}
//                             ref={book}
//                         >
//                             <div className="w-full h-full">
//                                 <div
//                                     className="w-full h-full bg-cover"
//                                     style={{backgroundImage: `url(/images/book.png)`,
//                                     boxShadow:
//                                         "inset -7px 0 30px -7px rgba(0, 0, 0, 0.4), 10px 10px 4px rgba(0, 0, 0, 0.20)",}}
//                                 >
//                                     <div className="w-full h-full text-center text-4xl text-white font-['Inria'] pt-32">
//                                         <span className="border-solid border-2 border-white mt-24 p-3">My World</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div>
//                                 <PageCover>
//                                     <div className="text-center pb-1/2 text-4xl text-[#785e3a] border-solid font-['Inria']">
//                                         <span></span>
//                                     </div>
//                                 </PageCover>
//                             </div>
//                             {
//                             pageList.map((data, index) => <div key={index}>{data}</div>)
//                             }
//                             <div>
//                                 <PageCover>
//                                     <div className="text-center pt-1/2 text-4xl text-[#785e3a] border-solid font-['Inria']">- The End -</div>
//                                 </PageCover>
//                             </div>
//                         </HTMLFlipBook>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FlipBook;
