import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
	constructor(props) {
		super(props);
		this.state = {albums: albumData };
	}

	render(){
		return(
			<section className='library'>
				{
					this.state.albums.map( (album, index) =>
										
								<Link to={`/album/${album.slug}`} key={index}>	
							<div className="row blkOut">
								<div className="threeWide mediumFont fontSerif BlueText flxCol evenSpread">				
									<div className="tenMarg BlueText">{album.title}</div>
									<div className="tenMarg BlueText">{album.artist}</div>
									<div className="tenMarg BlueText">{album.songs.length} songs</div>
								</div>
								<img src={album.albumCover} alt={album.title} className="threeWide imageMedium"/>
							</div>
						</Link>
						)
				}
			</section>
			)
	}
}
	export default Library;

