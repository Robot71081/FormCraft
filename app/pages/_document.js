// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* You can add meta tags, stylesheets, etc. */}
          <meta name="description" content="My awesome Next.js application" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>FormCraft</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
