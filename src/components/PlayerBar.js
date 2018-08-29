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
					<div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
					<input
						type="range"
						className="seek-bar"
						value={(this.props.currentTime / this.props.duration) || 0}
						max="1"
						min="0"
						step="0.01"
						onChange={this.props.handleTimeChange}
					/>
					<div className="total-time">Song Duration {this.props.formatTime(this.props.duration)}</div>
				</section>
				<section id="volume-control">
           			<i className="icon ion-md-volume-low"></i>
           			<input 
           			type="range" 
           			className="seek-bar" 
           			value={this.props.currentVolume}
           			max="1"
           			min="0"
           			step="0.01"
           			onChange={this.props.handleVolumeChange} 
           			/>
           			<div className="icon ion-volume-high"></div>
         		</section>
			</section>
		);
	}
}

export default PlayerBar;