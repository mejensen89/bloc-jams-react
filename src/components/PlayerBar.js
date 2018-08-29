import React, { Component } from 'react';

class PlayerBar extends Component {


	render(){
		return (
			<section className="player-bar">
				<section id="buttons">
					<button id="previous" onClick={this.props.handlePrevClick}>
						<i className="icon ion-md-skip-backward"></i>
					</button>
					<button id="play-pause" onClick={this.props.handleSongClick}>
						<i className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}></i>
					</button>
					<button id="next"onClick={this.props.handleNextClick}>
						<i className="icon ion-md-skip-forward"></i>
					</button>
				</section>
				<section id="time-control">
					<div className="current-time">-:--</div>
					<input type="range" className="seek-bar" value="0" />
					<div className="total-time">-:--</div>
				</section>
				<section id="volume-control">
           			<div className="icon ion-volume-low"></div>
           			<input type="range" className="seek-bar" value="80" />
           			<div className="icon ion-volume-high"></div>
         		</section>
			</section>
		);
	}
}

export default PlayerBar;