// https://rapidapi.com/vaibhavchandra2007/api/ai-content-detector-ai-gpt --> 500 req/month
// https://rapidapi.com/developersofchd/api/ai-content-detector2 --> 10 req/day

// Example GPT text: The small, fluffy dog ran across the park, chasing after a bright red ball thrown by its owner. The ball bounced and rolled on the grass, but the dog was determined to catch it. As the dog got closer to the ball, it leaped into the air, its tongue lolling out of its mouth, and caught the ball in mid-air. The owner cheered and clapped as the dog trotted back, tail wagging, and dropped the ball at their feet, ready for another round of play. Nearby, a group of children giggled and played on the swings, enjoying the warm sunshine and the simple pleasures of a lazy afternoon in the park.
// Example human text: I would end the speculations by making it clear that we are not racists and we are taking Enrico seriously. We would make sure to the Company that we respect everyone in the team and point out that the reason for not taking his path is a matter of time, but his ideas have seat on the Company and can be implemented in the future, however if Enrico is able to demonstrate that he can build the interface within the time constraints, his idea can be implemented.

import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [textToValidate, setTextToValidate] = useState('');
  const [fakePercentage, setFakePercentage] = useState('');
  const [numCharacters, setNumCharacters] = useState('');
  const [numWords, setNumWords] = useState('');

  useEffect(() => {
    setNumCharacters(textToValidate.length);
  }, [textToValidate]);
  
  async function postData() {
    const options = {
      method: 'POST',
      url: 'https://ai-content-detector-ai-gpt.p.rapidapi.com/api/detectText/',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '540994a3afmsh9e24ef1420fe5acp1e1140jsn322572162616',
        'X-RapidAPI-Host': 'ai-content-detector-ai-gpt.p.rapidapi.com'
      },
      data: {
        text: textToValidate
      }
    };


    try {
      const response = await axios.request(options);
      console.log(response.data);
      setFakePercentage(response.data.fakePercentage)
      setNumWords(response.data.textWords)
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Include your text here (min 250 characters)</label>
        <br />
        <textarea style={{width: '400px', height: '200px'}} id="yourText" onChange={(e) => setTextToValidate(e.target.value)}></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <div id='numCharacters' className='results'>{numCharacters} characters</div>
        <div id='fakePercentage' className='results'>Your text is {fakePercentage}% fake and {100- fakePercentage}% likely to be created by a human.</div>
        <div id='numWords' className='results'>{numWords} words</div>
      </div>
    </div>
  );
}

export default App;
