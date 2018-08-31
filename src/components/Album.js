import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
	constructor(props) {
		super(props);
	

	const album = albumData.find( album => {
		return album.slug === this.props.match.params.slug
	});

		this.state = {
			album: album,
			currentSong: album.songs[0],
			isPlaying: false,
			isHoveredSong: null,
      currentTime: 0,
      duration: album.songs[0].duration
	};

    	this.audioElement = document.createElement('audio');
    	this.audioElement.src = album.songs[0].audioSrc;
	}

	play() {
		this.audioElement.play();
		this.setState({ isPlaying: true });
	}

	pause() {
		this.audioElement.pause();
		this.setState({isPlaying: false});
	}

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }

	setSong (song) {
		this.audioElement.src = song.audioSrc;
		this.setState({ currentSong: song });
	}

	handleSongClick(song) {
		const isSameSong = this.state.currentSong === song;
		 if (this.state.isPlaying && isSameSong) {
       	this.pause();
     	} else {
     	if (!isSameSong) { this.setSong(song); }  
       	this.play();
     	}
 	}

   handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }
 
 	playPauseNumber(index) {
		if (this.state.currentSong.title === this.state.album.songs[index].title && this.state.isPlaying === true){
      		return <span className="icon ion-md-pause"></span>
	     } else {
		    if (this.state.isHovered === index) {
			return <span className="icon ion-md-play"></span>
    } else {
      return <span>{ index + 1 }</span>
      }
	   }
    }

    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({currentVolume: newVolume});
    }

    formatTime(seconds) {
      if (isNaN(seconds)) return "-:--";

      let date = new Date(null);
      date.setSeconds(seconds);
      return date.toISOString().substr(14, 5);
    }
   
   handlePrevClick() {
    const currentIndex =this.state.album.songs.findIndex(songs => this.state.currentSong === songs);
    const newIndex = Math.max(0, currentIndex-1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
   }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }
 

   render() {
     return (
       <section className="album">
        <section  className="row" id="album-info">
        	<div className= "threeWide">
          <div className="album-details">
        		<h1 id="album-title">Album Title: {this.state.album.title}</h1>
             <h2 className="artist"> Artist: {this.state.album.artist}</h2>
             <div id="release-info"> Release Info: {this.state.album.releaseInfo}</div>
        	</div>

        	<table id="song-list" className="blkOut tenMarg">

        		<colgroup>
        			<col id="song-number-column" />
        			<col id="song-title-column" />
        			<col id="song-duration-column"/>
        		</colgroup>
            <thead className="PaleGreenBack">
              <td> # </td>
              <td> Song title </td>
              <td> Play time </td> 
            </thead>
        		<tbody>
        		 {
        		 	this.state.album.songs.map( (songs, index) =>
        		 		<tr className="song" 
        		 		key={index} 
        		 		onClick={() => this.handleSongClick(songs) }
        		 		onMouseEnter={ () => this.setState({ isHovered: index }) }
                		onMouseLeave={ () => this.setState({ isHovered: false }) }
        		 		  >
              		<td>{this.playPauseNumber(index)}</td>
        		 	<td>{songs.title}</td>
        		 	<td>{this.formatTime(songs.duration)}</td>
        		 </tr>
        	 )}
        	</tbody>        		
        </table>
        <PlayerBar 
          isPlaying={this.state.isPlaying}
          curentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(seconds) => this.formatTime(seconds)}

        />
        </div>
        <img id="album-cover-art" className="threeWide imageLarge " src={this.state.album.albumCover} alt={this.state.album.title}/>
        </section>
       </section>
     );
   }
 }

export default Album;