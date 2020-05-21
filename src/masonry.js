import React, { Component } from  'react'

let brakePoints = [350, 500, 750];
let images = [];
const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92,643];
for(let i = 0; i< imgId.length; i++){
	const ih = 200 + Math.floor(Math.random()*10)*15;
	images.push("https://unsplash.it/250/" + ih + "?image=" + imgId[i]);
}

class App extends Component{
	render(){
		return (
			<div className="container">
				<div className="masonry-container">
					<p>IDM Senior and Thesis Projects</p>
					<Masonry brakePoints={this.props.brakePoints}>
						{this.props.images.map((image, id) => {
							return (
								<Tile src={image.src} text={image.title} group={image.group} id={id}/>
							)
						})}
					</Masonry>
				</div>
			</div>
		)
	}
}

export default App

const Tile = ({src, text, group, id}) => {
  return (
    <div key={id} className="tile" data-groups={group}>
  			<a href={text + ".html"}><img src={src} />
        <div className="tileText"> {text} </div>
        </a>
		</div>
  );
};

class Masonry extends Component{
	constructor(props){
		super(props);
		this.state = {columns: 1};
		this.onResize = this.onResize.bind(this);
	}
	componentDidMount(){
		this.onResize();
		window.addEventListener('resize', this.onResize)
	}

	getColumns(w){
		return this.props.brakePoints.reduceRight( (p, c, i) => {
			return c < w ? p : i;
		}, this.props.brakePoints.length) + 1;
	}

	onResize(){
		const columns = this.getColumns(this.refs.Masonry.offsetWidth);
		if(columns !== this.state.columns){
			this.setState({columns: columns});
		}

	}

	mapChildren(){
		let col = [];
		const numC = this.state.columns;
		for(let i = 0; i < numC; i++){
			col.push([]);
		}
		return this.props.children.reduce((p,c,i) => {
			p[i%numC].push(c);
			return p;
		}, col);
	}

	render(){
		return (
			<div className="masonry" ref="Masonry">
				{this.mapChildren().map((col, ci) => {
					return (
						<div className="column" key={ci} >
							{col.map((child, i) => {
								return <div key={i} >{child}</div>
							})}
						</div>
					)
				})}
			</div>
		)
	}
}
