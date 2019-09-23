import "isomorphic-fetch";
import Error from "./_error";

import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";

const Home = ({ channels, statusCode }) => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout title="Next Podcasts">
      <ChannelGrid channels={channels} />
    </Layout>
  );
};

Home.getInitialProps = async ({ res }) => {
  try {
    const res = await fetch("https://api.audioboom.com/channels/recommended");

    const { body: channels } = await res.json();

    return { channels, statusCode: 200 };
  } catch (error) {
    res.statusCode = 503;
    return { channels: null, statusCode: 503 };
  }
};

export default Home;
