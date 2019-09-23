import { useState } from "react";
import Error from "./_error";
import "isomorphic-fetch";

import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
import PodcastListWithClick from "../components/PodcastListWithClick";
import PodcastPlayer from "../components/PodcastPlayer";

import "./channel.scss";

const Channel = ({ channel, audioClips, series, statusCode }) => {
  const [openPodcast, setOpenPodcast] = useState(null);

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  const openPodcastHandler = (event, podcast) => {
    setOpenPodcast(podcast);
  };

  const closePodcast = event => {
    event.preventDefault();
    setOpenPodcast(null);
  };

  return (
    <Layout title={channel.title}>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${channel.urls.banner_image.original})`
        }}
      />

      {openPodcast && (
        <PodcastPlayer clip={openPodcast} onClose={closePodcast} />
      )}

      <h1>{channel.title}</h1>

      {series.length > 0 && (
        <div>
          <h2>Series</h2>
          <ChannelGrid channels={series} />
        </div>
      )}

      <h2>Latests Podcasts</h2>
      <PodcastListWithClick
        podcasts={audioClips}
        onClickPodcast={openPodcastHandler}
      />
    </Layout>
  );
};

Channel.getInitialProps = async ({ query, res }) => {
  const id = query.id;

  try {
    const [reqChannel, reqAudios, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${id}`),
      fetch(`https://api.audioboom.com/channels/${id}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${id}/child_channels`)
    ]);

    if (reqChannel.status >= 400) {
      res.statusCode = reqChannel.status;
      return {
        channel: null,
        audioClips: null,
        series: null,
        statusCode: reqChannel.status
      };
    }

    const dataChannel = await reqChannel.json();
    const channel = dataChannel.body.channel;

    const dataAudios = await reqAudios.json();
    const audioClips = dataAudios.body.audio_clips;

    const dataSeries = await reqSeries.json();
    const series = dataSeries.body.channels;

    return { channel, audioClips, series, statusCode: 200 };
  } catch (error) {
    res.statusCode = 503;
    return { channel: null, audioClips: null, series: null, statusCode: 503 };
  }
};

export default Channel;
