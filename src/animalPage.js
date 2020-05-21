import React, { Component } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaVimeo } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import Masonry from 'react-masonry-component'
import App from './shuffleMasonry.js'
// import { CSVLink, CSVDownoad } from 'react-csv';
// import profiles from './StudentProfiles.csv'

import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory'

const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL});

var slot = 43;
var fullName = "";
var projectName = "";
var projLinks = [];
let brakePoints = [350, 500, 1000];
var len;
// var len = 0;
var dataTypes = ["Print", "Installation", "VR/AR/MR", "InteractiveDesign", "UX/UI/App", "Performance"];

class Animalpage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      home: true,
      hamburgerClick: false,
      aboutProject: "",
      aboutPerson: "",
      imgOfFace: "",
      coverImg: "",
      firstName: "",
      lastName: "",
      fullName: "",
      Github: "",
      Insta: "",
      Linkedin: "",
      Medium: "",
      Tags: "",
      Portfolio: "",
      projectLink: "",
      researchLink: "",
      projectEmbed: "",
      projectImage: "",
      projectImage2: "",
      projectImage3: "",
      projectTitle: "",
      SecondAdvisor: "",
      ThesisAdvisor: "",
      ClassAdvisor: "",
      Twitter: "",
      links: [{}],
      coverImgs: [],
      imgTitle: [{}],
      allProjectLinks: [{}],
      prev: "",
      prevTitle: "",
      next: "",
      nextTitle: ""
    }
    this.updateData = this.updateData.bind(this);
    this.categoryList = this.categoryList.bind(this);
    this.aboutSplit = this.aboutSplit.bind(this);
    this.listLink = this.listLink.bind(this);
    this.homePage = this.homePage.bind(this);
    this.toggleHamburger = this.toggleHamburger.bind(this);
    this.masonryImages = this.masonryImages.bind(this);
    this.projectTopNav = this.projectTopNav.bind(this);
  }

  homePage() {
    this.setState ({
      home : !this.state.home
    })
  }

  toggleHamburger() {
    this.setState ({
      hamburgerClick: !this.state.hamburgerClick
    })
    console.log(this.state.humburgerClick);
  }

  componentWillMount () {
    var csvFilePath = require("./StudentProfilesReal.csv")
    var Papa = require("papaparse/papaparse.min.js")
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;
    len = data.length;
    console.log(data)
    const objArray = [];
    const imgs = [];
    const titles = [];
    for (var i = 0; i < len; i++) {

      var group = '[\"' + data[i]["Medium"].split(",")[0] + '\"';
      for (var j = 1; j < data[i]["Medium"].split(",").length; j++) {
        group += ',\"' + data[i]["Medium"].split(",")[j].substring(1) + '\"';
      }

      for(var z = 0; z < data[i]["Medium"].split(",").length; z++) {
        if(!dataTypes.includes(data[i]["Medium"].split(",")[z].replace(/\s+/g, ''))) {
          group += ',\"Other\"';
          break;
        }
      }

      group += ']';
      imgs.push(data[i]["Cover Image"])
      titles.push(data[i]["Project Title"])
      var name = data[i]["First Name"] + " " + data[i]["Last Name"]
      var obj = {key:i, src:data[i]["Cover Image"], title:data[i]["Project Title"], group:group, name:name, proType:data[i]["Medium"]}
      objArray.push(obj)
    }
    for (var i = 0; i < len; i++) {

    }
    for (var i = 0; i < len; i++) {
      var name;
      var name2;
      var obj;
      if(i == 0) {
        name = data[len-1]["First Name"] + " " + data[len-1]["Last Name"]
        name2 = data[i+1]["First Name"] + " " + data[i+1]["Last Name"]
        obj = {key:i, prev: name, prevTitle: data[len-1]["Project Title"].substring(0,30), next: name2, nextTitle: data[i+1]["Project Title"].substring(0,30)}
      }
      else if(i + 1 == len) {
        name = data[i-1]["First Name"] + " " + data[i-1]["Last Name"]
        name2 = data[0]["First Name"] + " " + data[0]["Last Name"]
        // obj = [{key:i, prev: name, prevTitle: data[i]["Project Title"].substring(0,18), next: name2, nextTitle: data[0]["Project Title"].substring(0,18)}]
        obj = {key:i, prev: name, prevTitle: data[i-1]["Project Title"].substring(0,30), next: name2, nextTitle: data[0]["Project Title"].substring(0,30)}
      }
      else {
        name = data[i-1]["First Name"] + " " + data[i-1]["Last Name"]
        name2 = data[i+1]["First Name"] + " " + data[i+1]["Last Name"]
        // obj = [{key:i, prev: name, prevTitle: data[i]["Project Title"].substring(0,18), next: name2, nextTitle: data[i+1]["Project Title"].substring(0,18)}]
        obj = {key:i, prev: name, prevTitle: data[i-1]["Project Title"].substring(0,30), next: name2, nextTitle: data[i+1]["Project Title"].substring(0,30)}
      }
      projLinks.push(obj);
      fullName = data[slot]["First Name"] + " " + data[slot]["Last Name"];
      projectName = data[slot]["Project Title"];
    }

    // data.length;
    this.setState({
      aboutProject: data[slot]["About Project"],
      aboutPerson: data[slot]["About You (In Third Person)"],
      firstName: data[slot]["First Name"],
      lastName: data[slot]["Last Name"],
      imgOfFace: data[slot]["Img of Your Face (Link form)"],
      Medium: data[slot]["Medium"],
      Tags: data[slot]["Tags (separate by commas)"],
      projectLink: data[slot]["Project Documentation Link"],
      researchLink: data[slot]["Link to Research Paper"],
      projectEmbed: data[slot]["Project Video (link)"],
      coverImg: data[slot]["Cover Image"],
      projectImage: data[slot]["Project Images & or gif (Links separated by commas)"],
      projectTitle: data[slot]["Project Title"],
      secondAdvisor: data[slot]["Sceondary Advisor"],
      thesisAdvisor: data[slot]["Thesis Advisor"],
      classAdvisor: data[slot]["Class Advisor"],
      links: [
        {link: data[slot]["Portfolio link"], text: "Portfolio"},
        {link: data[slot]["Github"], text: "Github"},
        {link: data[slot]["Instagram"], text: "Instagram"},
        {link: data[slot]["Twitter"], text: "Twitter"},
        {link: data[slot]["Linkedin"], text: "Linkedin"},
        {link: data[slot]["Behance"], text: "Behance"}
      ],
      coverImgs: imgs,
      projectTitles: titles,
      imgTitle: objArray,
      prev: projLinks[slot]["prev"],
      prevTitle: projLinks[slot]["prevTitle"],
      next: projLinks[slot]["next"],
      nextTitle: projLinks[slot]["nextTitle"],
    })
    // const links = [data[0]["Github"], data[0]["Linkedin"]]

    // console.log(imgs);
    // console.log(objArray);
    console.log(projLinks)

  }

  imgs(src, i) {
    return (
      <li key={i}
        >
        <img src={src} alt={"Photo documentation of \"" + projectName + "\" by " + fullName}/>
        <div className="show-more"><i className="fa fa-code" aria-hidden="true"></i></div>
      </li>
    )
  }

  categoryList(words, i) {
    return (
			<div key={i}>
				  {words}
		    </div>
		)
  }

  aboutSplit(words, i) {
    return (
      <div key={i}>
          {words}
          <br/>
        </div>
    )
  }

  listLink(links, i) {
    return (
      links.link == "" ?
      <a key={i}> </a> :
      <span key={i}>
        <a href={links.link}>{links.text}</a>
        <span> | </span>
      </span>
    )
  }

  masonryImages(imgTitle, i) {
    return (
      <div key={imgTitle.key} className="grid__brick col-xl-4 shuffle-item shuffle-item--visible sub-menu-parent" data-groups={imgTitle.group}>
        <a href={imgTitle.name + ".html"}><img src={imgTitle.src} alt={"Photo documentation of \"" + imgTitle.title + "\" by " + imgTitle.name} /> </a> <div className="dataGp"> {imgTitle.proType}
        </div>
        <div className="card-body sub-menu">
          <div> {imgTitle.title} by </div>
          <div> {imgTitle.name} </div>
        </div>
      </div>
    )
  }

  projectTopNav(array, i) {
    return (
      <div key={array.key} className="header" id="projectNav">

        <div id="prev"> <a href={array.prev}> <FaArrowLeft className="icons" />
          array.prevTitle </a>
        </div>
        <div id="allProjects"> <a href="project.html"> All Projects </a> </div>
        <div id="next"> <a href={array.next}> array.nextTitle <FaArrowRight className="icons" /> </a> </div>

      </div>
    )
  }

  componentDidMount() {
    // console.log(result);
  }

  renderProjectMap() {
    return (
      <div>

        <div className="container">
          <nav id="main-nav">
            <h1 id="h1Nav">
              IDM Thesis Projects
            </h1>
                  <div id="main-nav-logo-container">
                      <li>
                        <a href="https://alexyixuanxu.github.io/idmshowcase19/">
                          <img id="showcase-logo" src="./idmstickertransparent.png" alt="IDM Showcase 2019 Logo"/>
                        </a>
                      </li>
                  </div>
          </nav>

        <div className="filters-group">

          <label className="filter-label">Search</label>
          <input className="textfield filter__search js-shuffle-search" type="search" id="filters-search-input"/>

        </div>

        <div className="filter-label"> Filter </div>
          <div className="btn-group filter-options">
            <button id='all' className="btn">All</button>
            <button id='btn-print' className="btn">Print</button>
            <button id='btn-installation' className="btn">Installation</button>
            <button id='btn-VRAR' className="btn">VR/AR/MR</button>
            <button id='btn-ID' className="btn">Interactive Design</button>
            <button id='btn-UX' className="btn">UX/UI/App</button>
            <button id='btn-Perf' className="btn">Performance</button>
            <button id='random' className="btn">Random</button>
          </div>
        </div>

        <main id="main">

            <div className="container mb-4 animated fadeInUp">
              <div id="grid" className="my-shuffle-container row shuffle">

                {this.state.imgTitle.map(this.masonryImages)}

                <div className="col-1 my-sizer-element"></div>
              </div>
            </div>
          </main>

          <footer>

          <h1> </h1>
            <a href="https://www.instagram.com/idmnyu/?hl=en"> <FaInstagram className="icons"  /></a>
            <a href="https://twitter.com/idmnyu"><FaTwitter className="icons" /></a>
            <a href="https://vimeo.com/idmnyu"><FaVimeo className="icons" /></a>
            <a href=""><FaYoutube className="icons" /></a>
            <div id="footer-divider"></div>

            <div id="footer-text-links-container">
              <a href="http://idm.engineering.nyu.edu/">IDM at NYU Tandon</a> |
              <a href="">Acknowledgements</a> |
              <a href="">Projects</a>
            </div>
          </footer>

      </div>
    )
  }

  renderProject () {
    return (
      <div className="fullPage">

      <div className="header" id="projectNav">

        <div id="prev"> <a href={this.state.prev + ".html"}> <FaArrowLeft className="icons" />
          {this.state.prevTitle} </a>
        </div>
        <div id="allProjects"> <a href="index.html"> All Projects </a> </div>
        <div id="next"> <a href={this.state.next + ".html"}> {this.state.nextTitle} <FaArrowRight className="icons" /> </a> </div>

      </div>

        <main className="holyGrail-body animated fadeInUp">
          <article className="holyGrail-content">
          <h1>
            {this.state.projectTitle}
          </h1>
          <div>
            <div className="content">

              {this.state.aboutProject.split("<br>").map(this.aboutSplit)}

            </div>

            {this.state.projectLink === "" ? <span> </span> : <div className="content"> <a  href={this.state.projectLink}> Documentation </a> </div>}

            {this.state.researchLink === "" ? <span> </span> : <div className="content"> <a  href={this.state.researchLink}> Research Paper </a> </div>}


          </div>

            <ul id="imageGal">
              <li>
               <img src={this.state.coverImg} alt="" />
               </li>
               <div className="show-more"><i className="fa fa-code" aria-hidden="true"></i></div>

               {this.state.projectImage.split(",").map(this.imgs)}

              {this.state.projectEmbed === "" ? <span> </span> : <li className="videoWrapper">
                <iframe title="video" noautoplay="false" allowFullScreen src={this.state.projectEmbed} controls alt={"Video documentation of \"" + this.state.projectTitle + "\" by " + fullName}></iframe>
              </li>}


            </ul>
          </article>
          <nav className="holyGrail-nav animated fadeInUp">
            <h1> {this.state.firstName} {this.state.lastName} </h1>
            <div id="face">
              <img src={this.state.imgOfFace} alt={"Headshot of " + fullName} />
            </div>
            <ul>
              {this.state.links.map(this.listLink)}

            </ul>
            {this.state.aboutPerson.split("<br>").map(this.aboutSplit)}

          </nav>
          <aside className="holyGrail-ads animated fadeInUp">
            <h2 > Medium </h2>
            <div className="ads">
              {this.state.Medium.split(',').map(this.categoryList)}
            </div>
            <h2> Tags </h2>
            <div className="ads">
              {this.state.Tags.split(',').map(this.categoryList)}
            </div>
          </aside>
        </main>

        <footer>
        <h1> </h1>
          <a href="https://www.instagram.com/idmnyu/?hl=en"> <FaInstagram className="icons"  /></a>
          <a href="https://twitter.com/idmnyu"><FaTwitter className="icons" /></a>
          <a href="https://vimeo.com/idmnyu"><FaVimeo className="icons" /></a>
          <a href=""><FaYoutube className="icons" /></a>
          <div id="footer-divider"></div>

          <div id="footer-text-links-container">
            <a href="http://idm.engineering.nyu.edu/">IDM at NYU Tandon</a> |
            <a href="">Acknowledgements</a> |
            <a href="">Projects</a>
          </div>
        </footer>



      </div>
    )
  }

  render () {
    return (
      // <Router>
      //   <Switch>
      //     <Route exact path="/" component={this.renderProjectMap} />
      //     <Route path="/:imgTitle.name" component={this.renderProject} />
      //   </Switch>
      // </Router>
      this.state.home ? this.renderProjectMap() : this.renderProject()
    )
  }
}

export default Animalpage
