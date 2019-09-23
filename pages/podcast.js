import Link from "next/link";
import "isomorphic-fetch";
import Layout from "../components/Layout";
import PodcastPlayer from "../components/PodcastPlayer";

import "./podcast.scss";

const Podcast = ({ clip }) => {
  return (
    <Layout title={clip.title}>
      <PodcastPlayer clip={clip} />
    </Layout>
  );
};

Podcast.getInitialProps = async ({ query }) => {
  const id = query.id;

  const fetchClip = await fetch(
    `https://api.audioboom.com/audio_clips/${id}.mp3`
  );

  const clip = (await fetchClip.json()).body.audio_clip;

  return { clip };
};

export default Podcast;
