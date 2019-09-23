import { Link } from "../routes";
import slug from "../helpers/slug";
import "./PodcastPlayer.scss";

const PodcastPlayer = ({ clip, onClose }) => {
  return (
    <div className="modal">
      <div className="clip">
        <nav>
          {onClose ? (
            <a onClick={onClose}>&lt; Go Back</a>
          ) : (
            <Link
              route="channel"
              params={{ slug: slug(clip.channel.title), id: clip.channel.id }}
              prefetch
            >
              <a className="close">&lt; Go Back</a>
            </Link>
          )}
        </nav>

        <picture>
          <div
            style={{
              backgroundImage: `url(${clip.urls.image ||
                clip.channel.urls.logo_image.original})`
            }}
          />
        </picture>

        <div className="player">
          <h3>{clip.title}</h3>
          <h6>{clip.channel.title}</h6>
          <audio controls autoPlay={true}>
            <source src={clip.urls.high_mp3} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
