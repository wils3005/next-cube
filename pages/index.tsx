import { FC, useState } from "react";
import Head from "next/head";
import faker from "faker";

import { ChartRenderer } from "../components/chart-renderer";

const TITLE = "next-cube";

const Main: FC = () => {
  const [foo, setFoo] = useState(0);

  return (
    <main className="border border-dashed flex flex-col max-w-screen-lg mx-auto my-1 p-1">
      <Head>
        <title>{TITLE}</title>
        <link href="favicon.ico" rel="icon" />

        <link
          href="//fonts.googleapis.com/css?family=Source+Serif+Pro:400,600,700|Roboto:300,400,400i,500,700"
          rel="stylesheet"
        />
      </Head>

      <header className="border border-dashed m-1 p-1">{`HEADER ${faker.lorem.paragraph()}`}</header>
      <section className="border border-dashed flex flex-col m-1 p-1">
        {`SECTION ${faker.lorem.paragraphs()}`}
      </section>
      <section className="border border-dashed flex flex-col m-1 p-1">
        <ChartRenderer />
      </section>
      <section className="border border-dashed flex flex-col m-1 p-1">
        {`SECTION ${faker.lorem.paragraphs()}`}
      </section>
      <footer className="border border-dashed m-1 p-1">{`FOOTER ${faker.lorem.paragraph()}`}</footer>
    </main>
  );
};

export default Main;
