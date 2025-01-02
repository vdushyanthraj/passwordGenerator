import {useState,useCallback,useEffect,useRef} from 'react';

function App() {
  const [length,setLength]=useState(8);
  const [number,setNumber]=useState(false);
  const [symbol,setSymbol]=useState(false);
  const [Password,setPassword]=useState('');

  let genpass = useCallback(()=>{
    let pass='';
    let str = 'abcdefghijklmnopqurestuvwxyzABCDEFGHIJKLMNOPQRRESTUVWXYZ';
    if(number) str+='1234567890';
    if(symbol) str+='!@#$%^&*?><-_+'

    for(let i = 0; i < length; i++){
      let num = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(num)
    }
    setPassword(pass);
  },[length,number,symbol])
  
  useEffect(()=>{
    genpass();
  },[length,number,symbol])
  
  let passref = useRef(null);
  let copyclip = ()=>{
    navigator.clipboard.writeText(Password)
    passref.current.select()
  }

  return (
    <>
      <div className='w-screen h-screen bg-black flex flex-col justify-center items-center '>
        <div className='flex flex-col justify-center items-center bg-indigo-500 p-8 rounded-2xl'>
           <div className='text-2xl mb-2'>Password Generator</div>
          <div>
            <input 
              type="text" 
              className='rounded-md mr-1 text-center'
              readOnly
              placeholder='password'
              value={Password}
              ref={passref}
            />
            <button
            className='bg-black text-white h-6 w-12 mr-1 font-bold rounded-md hover:bg-pink-600'
            onClick={copyclip}
            >copy</button>
            <button
            className='bg-black text-white h-6 w-20 pl-1 pr-1 font-bold rounded-md hover:bg-pink-600'
            onClick={genpass}
            >generate</button>

          </div>
          <div className='flex'>
            <div className='mr-2 mt-5'>
              <input 
              name='length'
              type="range"  
              min={6} 
              max={16} 
              value={length} 
              onChange={(e)=>setLength(e.target.value)}  /> 
            </div>

            <div className='mr-2 mt-5'>
              <label htmlFor='length'>Length : {length}</label>
            </div>

            <div className='mr-2 mt-5'>
              <input
               type="checkbox"
               name="number"
               onChange={()=>setNumber((prev)=> !prev)}
              />
            </div>

            <div className='mr-2 mt-5'><label htmlFor="number">Numbers</label></div>

            <div className='mr-2 mt-5'>
              <input 
              type="checkbox" 
              name="symbol"
              onChange={()=>setSymbol((prev)=> !prev)} 
              /> 
            </div>

            <div className='mr-2 mt-5'><label htmlFor="symbol">Symbols</label></div>
            
            
          </div>
        </div>
         
      </div>
      
    </>
  );
}

export default App;
