import axios from 'axios';
import { useState } from 'react'; 

const App = () => {
  const [query, setQuery] = useState("");
  const [slides,set_slides]=useState(0)
  const sendQuery = async (e) => {
    e.preventDefault();
    if(query.trim()==="" || slides==0){
      return alert("change query or slides")
    }
    if(slides>30){
      return alert("maximum number of slides - 30")
    }
    try {
      const response = await axios.post("http://localhost:5000/api/generate", { "query": query,"slides":slides });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending query:', error);
    }
  }

  return (
    <div className="h-screen w-full bg-blue-500 bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center">
      <h2 className="font-ubuntu font-bold text-white drop-shadow-xl text-6xl text-center pt-16 tracking-widest">
        <span className="bg-white text-[#35aada] rounded-xl p-4">Slide</span>
        <span className="text-white ml-4">Genie</span>
      </h2>
      <div className="bg-white bg-opacity-30 w-10/12 h-[65vh] mt-20 drop-shadow-2xl flex flex-col w-full rounded-t-2xl">
        <select className="bg-transparent text-white rounded-t-xl text-center outline-none text-4xl font-ubuntu font-bold drop-shadow-xl items-start border-2 border-white">
          <option className="bg-[#35aada] hover:bg-white text-white font-ubuntu font-bold drop-shadow-xl" value="query" default>Query</option>
          <option className="bg-[#35aada] text-white font-ubuntu font-bold drop-shadow-xl" value="custom-data">Custom Data</option>
        </select>
      </div>
      <div className="flex flex-row w-10/12">
      <textarea required className="w-10/12 rounded-bl-2xl bg-white bg-opacity-30 text-white text-xl font-bold outline-none border-t-2 border-white p-2" onChange={(e) => setQuery(e.target.value)} value={query}></textarea>
      <input type="number" required value={slides} onChange={(e)=>{set_slides(e.target.value)}} className="w-1/12 bg-white bg-opacity-30 text-white text-3xl text-center font-bold outline-none border-t-2 border-white p-2"></input>
      <button onClick={sendQuery} className="w-2/12 bg-white bg-opacity-30 border-white border-2 text-white text-3xl font-bold rounded-br-2xl">Generate</button>
      </div>
      
    </div>
  );
};

export default App;
