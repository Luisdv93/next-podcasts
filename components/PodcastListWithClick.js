import slug from "../helpers/slug";
import "./PodcastListWithClick.scss";

const PodcastListWithClick = ({ podcasts, onClickPodcast }) => {
  return (
    <div>
      {podcasts.map((podcast, index) => (
        <a
          key={index}
          className="podcast"
          onClick={event => onClickPodcast(event, podcast)}
        >
          <h3>{podcast.title}</h3>
          <div className="meta">{Math.ceil(podcast.duration / 60)} minutes</div>
        </a>
      ))}
    </div>
  );
};

export default PodcastListWithClick;
