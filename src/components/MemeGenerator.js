import React, { useState } from "react";



const MemeGenerator = () => { // this is a functional component - state and this cannot be used; Hooks are available

  const [inputText, setInputText] = useState({
    topText: "",
    bottomText: "",
  }); 

  const [randomImage, setRandomImage] = useState(
    "https://i.imgflip.com/26am.jpg"
  );

  const [allMemeImgs, setAllMemeImgs] = useState([]);

  const handleChange = e => {
    setInputText({
      // Here we are using ES6 spread operator to keep everything from overriding each other
      ...inputText,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submitted")
  };

  return(
    <div className="meme-container">
      {/* A form that contains the inputs and button */}
     <form onSubmit={handleSubmit}>  
     {/* we make a reference to the handleSubmit method */}
     {/* Here we have two inputs - one for the top text, the other for the bottom */}
     {/* Again since this is a functional component - cannot use this */}
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

export default MemeGenerator;
