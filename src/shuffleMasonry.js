import React, { Component } from  'react'

class App extends Component{
	render(){
		return (
			<div>
						{this.props.images.map((image, id) => {
							return (
								<Tile src={image.src} text={image.title} group={image.group} id={id}/>
							)
						})}
			</div>
		)
	}
}

export default App

const Tile = ({src, text, group, id}) => {
  return (
    <div key={id} className="grid__brick mt-3 col-6 col-md-4 col-xl-3 shuffle-item shuffle-item--visible"
		data-groups={group}>
			<div className="card-body">
  			<a href={text + ".html"}><img src={src} />
        <div className=""> {text} </div>
        </a>
			</div>
		</div>
  );
};
