import { Link } from "../routes";
import slug from "../helpers/slug";
import "./ChannelGrid.scss";

const ChannelGrid = ({ channels }) => (
  <div className="channels">
    {channels.map(channel => (
      <Link
        route="channel"
        params={{ slug: slug(channel.title), id: channel.id }}
        key={channel.id}
      >
        <a className="channel">
          <img src={channel.urls.logo_image.original} alt="Channel Logo" />
          <h2>{channel.title}</h2>
        </a>
      </Link>
    ))}
  </div>
);

export default ChannelGrid;
