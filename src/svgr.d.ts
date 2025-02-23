// 기본 SVG 파일 선언 (문자열로 처리)
declare module "*.svg" {
  const content: string;
  export default content;
}

// SVG를 React 컴포넌트로 처리하는 선언
declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
