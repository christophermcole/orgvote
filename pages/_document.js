import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow-x: hidden;
          }
          *, *::before, *::after {
            box-sizing: inherit;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
