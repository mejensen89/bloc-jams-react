import React, { Component } from 'react';

class PlayerBar extends Component {


	render(){
		return (
			<section className="player-bar tenPad">
				<section id="buttons" className="blkOut WhiteBack tenPad">
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
				<section id="time-control" className="blkOut WhiteBack tenPad">
					<div className="current-time">Current Time: {this.props.formatTime(this.props.currentTime)}</div>
					<input
						type="range"
						className="seek-bar"
						value={(this.props.currentTime / this.props.duration) || 0}
						max="1"
						min="0"
						step="0.01"
						onChange={this.props.handleTimeChange}
					/>
					<div className="total-time tenPad">Song Duration {this.props.formatTime(this.props.duration)}</div>
				</section>
				<section id="volume-control" className="blkOut WhiteBack">
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
           			<i className="icon ion-md-volume-high"></i>
         		</section>
			</section>
		);
	}
}

export default PlayerBar;