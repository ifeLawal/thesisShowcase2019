import React, { Component } from 'react';
import Animalpage from "./animalPage.js"
// import { CSVLink, CSVDownoad } from 'react-csv';
// import profiles from './StudentProfiles.csv'



class ProjectMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      home: false
    }
    this.renderAnimal = this.renderAnimal.bind(this)
    this.renderProjectMap = this.renderProjectMap.bind(this)
    this.homePage = this.homePage.bind(this)
  }

  homePage() {
    this.setState = ({
      home : !this.state.home
    })
  }

  renderAnimal() {
    return (
      <Animalpage> </Animalpage>
    )
  }

  renderProjectMap() {
    return (
      <div>
        <h1>
          List of projects
        </h1>
        <ul id="imageGal">
          <li>
           <img src={this.state.projectImage} alt="" />
           </li>
           <li>
            <img src={this.state.projectImage2} alt="" />
          </li>
          <li>
            <img src={this.state.projectImag3} alt="" />
          </li>
          </ul>
      </div>
    )
  }

  render () {
    return (
      this.state.home ? this.renderProjectMap() : this.renderAnimal()
    )
  }

}

export default ProjectMap
