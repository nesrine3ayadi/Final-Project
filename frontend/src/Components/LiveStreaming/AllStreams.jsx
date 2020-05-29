import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { listStreams,fetchStreams } from '../../Actions/action';
import StreamVideoCard from './StreamVideoCard'
class AllStreams extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

  

    renderList() {
       
        return this.props.streams.slice(0, 9).map(stream => {
            return (
               
                <div className="five wide column " key={stream.id}>
                   
                  
                    {/* <i className="large middle aligned icon video" /> */}
                    <div className="content">
                        <Link to={'/streams/' + stream.id} className="header">
                           <StreamVideoCard title={stream.title} description={stream.description} />
                        </Link>
                    </div>
                        
                    </div>
                
            );
        });
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    {/* <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link> */}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Last Streams</h2>
                <div className="ui grid">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams})(AllStreams);