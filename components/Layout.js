import React from "react";
import Link from "next/link";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";

import "./Layout.scss";
import "./nprogress.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = ({ title, children }) => (
  <div>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no"
      ></meta>
      <title>{title}</title>
    </Head>

    <header>
      <Link href="/">
        <a>Podcasts</a>
      </Link>
    </header>

    {children}
  </div>
);

export default Layout;
