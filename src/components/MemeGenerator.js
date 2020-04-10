import React, { useState, useEffect } from "react"; // useEffect works as componentDidMount, componentDidUpdate, and componentWillUnmount combined


const MemeGenerator = () => { // this is a functional component - state and 'this' cannot be used; Hooks are available

  const [inputText, setInputText] = useState({ //useState will always return an array with 2 items: current state and a function to update the state
    topText: "",
    bottomText: ""
  }); 
  // console.log(inputText) // this console.log returns {topText: "", bottomText: ""}
  const [randomImage, setRandomImage] = useState(
    "https://i.imgflip.com/26am.jpg"
  );
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  const handleChange = e => {
    setInputText({
      // Here we are using ES6 spread operator to keep everything from overriding each other
      ...inputText, // we want the state to remain the same so that when you enter either the top text or bottom text, it doesnt show on just one side
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault()
    const randNum = Math.floor(Math.random() * allMemeImgs.length)
    const randMemeImgUrl = allMemeImgs[randNum].url
    setRandomImage(randMemeImgUrl)
  };

  // We cannot use componentDidMount inside a Functional Component so we use useEffect
  useEffect(() => {
    console.log("test run")
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => setAllMemeImgs(response.data.memes))
  }, [] ) // Without this array here useEffect would keep running infinitely
  // the Hook now depends on the array of dependencies to re-run


  return(
    <div className="meme-container">
      {/* A form that contains the inputs and button */}
     <form onSubmit={handleSubmit}>  
     {/* we make a reference to the handleSubmit method */}
     {/* Here we have two inputs - one for the top text, the other for the bottom */}
     {/* Again since this is a functional component - cannot use 'this' */}
      <input
        type="text"
        name="topText"
        placeholder="Add Top Text"
        value={inputText.topText}
        onChange={handleChange} 
      /> 
      <input
        type="text"
        name="bottomText"
        placeholder="Add Bottom Text"
        value={inputText.bottomText}
        onChange={handleChange}
      />
      <button>Generate</button>
    </form>
    {/* below is the actual meme changing along with whatever you type */}
    <div className="meme">
      <img src={randomImage} alt="" />
      <h2 className="top">{inputText.topText}</h2>
      <h2 className="bottom">{inputText.bottomText}</h2>
    </div>
  </div>
  )
};

export default MemeGenerator;
// <----------------------------------- Same Component in Class Form

// class MemeGenerator extends Component {
//   state = {
//     topText: "",
//     bottomText: "",
//     randomImage: "https://i.imgflip.com/26am.jpg",
//     allMemeImgs: []
//   };

//   handleChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   componentDidMount() {
//     fetch("https://api.imgflip.com/get_memes")
//       .then(response => response.json())
//       .then(response =>
//         this.setState({
//           allMemeImgs: response.data.memes
//         })
//       );
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
//     const randMemeImgUrl = this.state.allMemeImgs[randNum].url;
//     this.setState({ randomImage: randMemeImgUrl });
//   };

//   render() {
//     return (
//       <div className="meme-container">
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             name="topText"
//             placeholder="Add Top Text"
//             value={this.state.topText}
//             onChange={this.handleChange}
//           />
//           <input
//             type="text"
//             name="bottomText"
//             placeholder="Add Bottom Text"
//             value={this.state.bottomText}
//             onChange={this.handleChange}
//           />
//           <button>Generate</button>
//         </form>
//         <div className="meme">
//           <img src={this.state.randomImage} alt="" />
//           <h2 className="top">{this.state.topText}</h2>
//           <h2 className="bottom">{this.state.bottomText}</h2>
//         </div>
//       </div>
//     );
//   }
// }

