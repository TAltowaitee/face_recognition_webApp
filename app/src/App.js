import React, { Component }from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Singin/Singin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai'


const apiKey = '308e39bcd4274a11a1cc65165f0e14fc'
const app = new Clarifai.App({
  apiKey: apiKey
})

const partcilesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        password: '',
        email: 'email',
        entries: 0,
        joined: ''
      }
    }
  }

  loaduser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      password: data.password,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

}

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});

  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      'a403429f2ddf4b49b307e318f00e528b', 
      this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3003/image',{
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    };
    this.setState({route: route});
  }
  
  render() {
    const {isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className = 'particles'
          params={partcilesOptions}
        />
        <div className='spaceBetween pa3'>
          <Logo />
          <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
        </div>
  
        { route === 'home' 
        ? <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl = {imageUrl} />
          </div>
        : (
            this.state.route === 'signin'
            ? <Signin onRouteChange = {this.onRouteChange} loaduser={this.loaduser}/>
            : <Register onRouteChange={this.onRouteChange} loaduser={this.loaduser}/>
        )
        }
      </div>
    );
  }
  
}

export default App;
