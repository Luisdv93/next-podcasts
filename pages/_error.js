import Link from "next/link";

import Layout from "../components/Layout";

const Error = ({ statusCode }) => {
  return (
    <Layout title="An error ocurred">
      {statusCode === 404 ? (
        <div className="message">
          <h1>This page doesn't exist</h1>
          <p>
            <Link href="/">
              <a>Go Home</a>
            </Link>
          </p>
        </div>
      ) : (
        <div className="message">
          <h1>A problem occurred</h1>
          <p>Try again in a few minutes</p>
        </div>
      )}
    </Layout>
  );
};

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;

  return { statusCode };
};

export default Error;
