// https://rapidapi.com/vaibhavchandra2007/api/ai-content-detector-ai-gpt --> 500 req/month
// https://rapidapi.com/developersofchd/api/ai-content-detector2 --> 10 req/day

// Example GPT text: The small, fluffy dog ran across the park, chasing after a bright red ball thrown by its owner. The ball bounced and rolled on the grass, but the dog was determined to catch it. As the dog got closer to the ball, it leaped into the air, its tongue lolling out of its mouth, and caught the ball in mid-air. The owner cheered and clapped as the dog trotted back, tail wagging, and dropped the ball at their feet, ready for another round of play. Nearby, a group of children giggled and played on the swings, enjoying the warm sunshine and the simple pleasures of a lazy afternoon in the park.
// Example human text: I would end the speculations by making it clear that we are not racists and we are taking Enrico seriously. We would make sure to the Company that we respect everyone in the team and point out that the reason for not taking his path is a matter of time, but his ideas have seat on the Company and can be implemented in the future, however if Enrico is able to demonstrate that he can build the interface within the time constraints, his idea can be implemented.

import axios from 'axios';
import { useEffect, useState } from 'react';
import logo from './Pictures/logo.png';

function App() {
  const [textToValidate, setTextToValidate] = useState('');
  const [numCharacters, setNumCharacters] = useState('');
  const [numWords, setNumWords] = useState('');
  const [resultText, setResultText] = useState(false);

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
      setNumWords(` ${response.data.textWords} words`)
      setResultText(`Your text is ${response.data.fakePercentage}% fake and ${100 - response.data.fakePercentage}% likely to be created by a human.`);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div><img class="w-96 h-48 max-h-full" src={logo} alt="Logo"  />'
    <div class=" m-24">
      
      <form   onSubmit={handleSubmit}>
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Text Detect</label>
    
        <textarea class="block p-2.5 w-3/4 h-48 max-h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="message" onChange={(e) => setTextToValidate(e.target.value)} placeholder="Include your text here (min 250 characters)"></textarea>
        <br />
        <button class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" type="submit">Submit</button>
      </form>
      <div>
        <div id='numCharacters' className='results'>{numCharacters} characters</div>
     
          {resultText && <div className='results'>{numWords} </div>}
          {resultText && <div className='results'>{resultText}</div>}
      </div>
    </div>
    
    </div>

  );
}

export default App;
