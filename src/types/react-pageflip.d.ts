declare module "react-pageflip" {
  interface HTMLFlipBookProps {
    width: number;
    height: number;
    flippingTime?: number;
    style?: React.CSSProperties;
    maxShadowOpacity?: number;
    className?: string;
    showCover?: boolean; // 이 부분을 추가
    children?: React.ReactNode; // children 속성 추가
  }

  export default class HTMLFlipBook extends React.Component<HTMLFlipBookProps> {}
}
