import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js'
import Rank from './Components/Rank/Rank.js'
import Particles from 'react-particles-js';
import './App.css';
import particlesProperty from './particles.js'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js'
import Signin from './Components/Signin/Signin.js'
import Register from './Components/Register/Register.js'

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (object) => {
    this.setState({user : {
      id: object.id,
      name: object.name,
      email: object.email,
      entries: object.entries,
      joined: object.joined
    }});
  };

  calculateFaceLocation = (data) => {
    const Face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: Face.left_col * width,
      topRow: Face.top_row * height,
      rightCol: width - (Face.right_col * width),
      bottomRow: height - (Face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    
    this.setState({imageUrl: this.state.input});
    
    fetch('https://obscure-fortress-66765.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then( response => response.json() )
    .then( response => {
        if(response) {
          fetch('https://obscure-fortress-66765.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then( response => response.json() )
          .then( updatedEntries => {
            this.setState(Object.assign(this.state.user, {entries: updatedEntries}))
          })
          .catch(console.log)
        }
      this.displayFaceBox(this.calculateFaceLocation(response)) 
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    else {
      this.setState(initialState);
    }

    this.setState({route: route})
  }

  render() {
    return (
      <div className="App" >
        
        <Particles className='particles' params={particlesProperty} />
        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

        { this.state.route === 'home' 
          ? <div>     
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} />
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
            </div>
          : (
              this.state.route === 'signIn'
              ? <div> 
                  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                </div>
              : <div> 
                  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                </div>
            )

        }

      </div>
    );
  }
}

export default App;
