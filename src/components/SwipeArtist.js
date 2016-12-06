import React from 'react';
import { findArtistById } from '../actions/SpotifyActions'
import {findRelatedArtist} from '../actions/SpotifyActions'
import { getLikedArtistsAction } from '../actions/RailsActions'
import {storeLikedArtistAction} from '../actions/RailsActions'
import { findTopTracks } from '../actions/SpotifyActions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import ShowArtist from './ShowArtist'
import ShowSongs from './ShowSongs'
import '../App.css';
import $ from 'jquery'


class SwipeArtist extends React.Component {

  handleShowSongs (event){
    event.preventDefault()
    this.props.findTopTracks(this.props.swipeArtist.spotify_id)
  }

  handleShowNewArtist(event){
    //this eventually should be the nah button
    // will set the swipe artist based on a related artist
    // of a random artist from likedartist state
    // will add artist to nahArtist array in state
    // debugger
    event.preventDefault()
    // $('#songNames').empty()
    // $('#songsBar').empty()
    //maybe don't use this here... should get artists based on a ReactActions action that
    // pulls from current state
    this.props.getLikedArtistsAction()
  }

  handleLikeArtist(event){
    event.preventDefault()
    // should create new swipe artist based on likedartist related artist
    // should also save to rails db and update liked artist state
    this.props.storeLikedArtistAction(this.props.swipeArtist)
    this.props.findRelatedArtist(this.props.swipeArtist.spotify_id)
  }
  // <h4>{songs[2].name}</h4>
    render() {
        var songsBar;

        // if(this.props.songs.songs){
        //   songsBar = this.props.songs.songs.map((song)=>{
        //     return< ShowSongs song={song}/>
        //   })
        // }
        let songs = this.props.songs.songs
        //
        if(songs){
          debugger
          let url = 'https://embed.spotify.com/?uri=spotify:track:' + songs[0].id
          songsBar =
          <div>
          <div id='songNames'>
          </div>
          <div id='songsBar'>
            <iframe id='iFrame' src={url} width="300" height="80"></iframe>

          </div>
          </div>
        }

        return (
          <div>
              <ShowArtist handleShowSongs={this.handleShowSongs.bind(this)} artist={this.props.swipeArtist}/>
              <button type="button" onClick={this.handleShowNewArtist.bind(this)}>Next</button>
              <button type="button" onClick={this.handleLikeArtist.bind(this)}>Like</button>
              {songsBar}
          </div>
        );
      }

}



function mapStateToProps(state){
  return {songs: state.songs, swipeArtist: state.swipeArtist, likedArtists:state.likedArtists}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({findTopTracks:findTopTracks, getLikedArtistsAction:getLikedArtistsAction, storeLikedArtistAction:storeLikedArtistAction, findRelatedArtist: findRelatedArtist }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeArtist)
