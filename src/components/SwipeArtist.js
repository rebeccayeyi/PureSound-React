import React from 'react';
import { findArtistById } from '../actions/SpotifyActions'
import { findTopTracks }  from '../actions/SpotifyActions'
// import { likedArtist } from '../actions/ReactActions'
// import { unlikeArtist } from '../actions/ReactActions'
import { getLikedArtistsAction } from '../actions/RailsActions'
import {connect} from 'react-redux'
// import { Component } from 'react-redux'
import { bindActionCreators } from 'redux'
import ShowArtist from './ShowArtist'
import ShowSongs from './ShowSongs'

class SwipeArtist extends React.Component {

  constructor(props){
    super(props);
  }


  handleShowSongs (event){
    event.preventDefault()
    this.props.findTopTracks(this.props.swipeArtist.spotify_id)
  }

  handleShowNewArtist (event){
    debugger
    event.preventDefault()
    this.props.getLikedArtistsAction()
  }

    render() {
        var songsBar;

        if(this.props.songs.songs){
          songsBar = this.props.songs.songs.map((song)=>{
            return< ShowSongs song={song}/>
          })
        }

        return (
          <div>
            <section className="artist">
              <ShowArtist handleShowSongs={this.handleShowSongs.bind(this)} artist={this.props.swipeArtist}/>
              <button type="button" onClick={this.handleShowNewArtist.bind(this)}>Next</button>
            </section>
            <aside className="songs">
              {songsBar}
            </aside>
          </div>
        );
      }

}



function mapStateToProps(state){
  return {songs: state.songs, swipeArtist: state.swipeArtist, likedArtists:state.likedArtists}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({findTopTracks:findTopTracks, getLikedArtistsAction:getLikedArtistsAction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeArtist)