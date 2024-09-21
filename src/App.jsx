import { useState, useCallback, useEffect } from 'react'

function App() {
  const [length, setLength] = useState(6);
  const [numbers, setnumbers] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz"

    if(numbers) str += "0123456789" 
    if(character) str += "!@#$%^&*()-+[]{}/?"
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      
    }
    setPassword(pass);

  }, [length, numbers, character, setPassword]);

  const copyClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false)
    }, 1500);

  },[password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, character, passwordGenerator ])


  return (
    <>
    <div className='w-full max-w-xl mx-auto shadow-lg rounded-lg p-6 my-8 text-orange-500 bg-gray-800'><h1 className='text-white text-center text-2xl font-semibold mb-5'>Password Generator</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden mb-5'>
        <input type="text" value={password} className='outline-none w-full px-4 py-2 text-lg font-medium' placeholder='password' readOnly />
        <button className='outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium transition-colors shrink-0' onClick={copyClipboard}>copy</button>
        
      </div>
      <div className='flex text-sm gap-x-4'>
        <div className='flex items-center gap-x-3 '>
          <input type="range" 
            min={6}
            max={15}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
          />
          <label htmlFor="" className='font-medium'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input type="checkbox" 
            defaultChecked={numbers}
            id='numberInput'
            onChange={() => {setnumbers((prev) => !prev)}}
          />
          <label htmlFor="" className='font-medium'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input type="checkbox" 
            defaultChecked={character}
            id='numberInput'
            onChange={() => {setCharacter((prev) => !prev)}}
          />
          <label htmlFor="" className='font-medium'>Characters</label>
        </div>
      </div>
      {isCopied && (
          <div className='mt-2 text-green-500 border border-green-400 py-2 px-4 rounded font-medium' >
            Password copied!
          </div>
        )}
    </div>
   
    </>
  )
}

export default App
