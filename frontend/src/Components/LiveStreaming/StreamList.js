import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../Actions/action";
import StreamVideoCard from "./StreamVideoCard";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content d-none">
          <Link to={"/streams/edit/" + stream.id} className="ui button primary">
            Edit
          </Link>
          <Link
            to={"/streams/delete/" + stream.id}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return(  this.props.streams.map((stream) => (
      (stream.Id == this.props.idUser) && (
        <div className="five wide column " key={stream.Id}>
          <i className="large middle aligned icon video" />
          <div className="content">
            <Link
              to={"/profile/" + this.props.idUser + "/" + stream.id}
              className="header"
            >
              <StreamVideoCard
                title={stream.title}
                description={stream.description}
              />
            </Link>
          </div>
        </div>
      )))
    )
    }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          { <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link> }
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Streams</h2>
        <div className="ui grid">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(
  StreamList
);
