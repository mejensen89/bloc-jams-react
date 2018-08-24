import React, { Component } from 'react';
import albumData from './../data/albums';

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
			hover: false 
	};

    	this.audioElement = document.createElement('audio');
    	this.audioElement.src = album.songs[0].audoSrc;
	}

	play() {
		this.audioElement.play();
		this.setState({ isPlaying: true });
	}

	pause() {
		this.audioElement.pause();
		this.setState({isPlaying: false});
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
     
    handleHover(index) {
    	
    	if (this.isPlaying && this.hover) {
    		return (<i className='icon ion-md-play'></i>)
    	} else if (this.isPlaying !== true && this.hover ) {
    		return (<i className='icon ion-md-pause'></i>)
    	} else {
    		return(index+1)
    	}
    }

   render() {
     return (
       <section className="album">
        <section id="album-info">
        	<img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
        	<div className="album-details">
        		<h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
        	</div>

        	<table id="song-list">
        		<colgroup>
        			<col id="song-number-column" />
        			<col id="song-title-column" />
        			<col id="song-duration-column"/>
        		</colgroup>
        		<tbody>
        		 {
        		 	this.state.album.songs.map( (songs, index) =>
        		 		<tr className="song" key={index} onClick={() => this.handleSongClick(songs) } onMouseEnter={() => this.setState({isHovered: index+1})} onMouseLeave={() => this.setState({isHovered: false})} >
              <td className="song-actions"> 
                <button id="song-action-btns">
                { (this.state.currentSong.title === songs.title) ?
                  <i className={this.state.isPlaying ? "ion-md-pause" : "ion-md-play"} > </i>
                  :
                  (this.state.isHovered === index+1) ?
                <span className="ion-play"></span>
                :
                 <span className="song-number">{index+1}</span>
               }
                </button>
              </td>
        		 			<td>{songs.title}</td>
        		 			<td>{songs.duration}</td>
        		 		</tr>

        		 	)}
        		</tbody>        		
        	</table>

        </section>
       </section>
     );
   }
 }

export default Album;