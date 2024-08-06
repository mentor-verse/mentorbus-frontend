declare global {
  interface Window {
    Kakao: any;
  }

  // global.d.ts
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

export {};
