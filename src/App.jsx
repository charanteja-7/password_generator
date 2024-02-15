import { useState,useCallback,useEffect,useRef} from "react"


function App() {

  const [length,setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed,setCharacterAllowed] = useState(false)
  const [password,setPassword] = useState("")
  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllowed) str += "0123456789"
      if(characterAllowed) str += ":<>?{}|)(*&^%$#@!~,.;'[]"

      for(let i = 1; i <= length;i++){
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char)
      }
      setPassword(pass)

  },[length,numberAllowed,characterAllowed]) 

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])
   //copy password
   const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3) only three are selected
    window.navigator.clipboard.writeText(password)
   },[password] )

  return (
    <div className="h-screen flex align-middle ">
    <div className="max-w-md mx-auto  shodow-md rounded-lg px-5 py-4 my-8 text-orange-500 bg-gray-800">
    <h1 className="text-4xl text-center text-white my-3">Password Generator</h1>
      <div className="flex shadow rounded overflow-hidden mb-4">
        <input 
        type="text" 
        value={password} 
        className="outline-none w-full py-1 px-300" placeholder="Password" 
        readOnly 
        ref = {passwordRef}
        />
        <button className="outline-none bg-blue-700 text-white px-3 py-0 shrink-0" onClick={copyPassword}>Copy</button>
      </div>
       <div className="flex text-sm gap-s-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}}/>
          <label htmlFor="">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1 mx-4">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={ () => {setNumberAllowed((prev) => !prev)}} />
          <label>Number</label>
        </div>
        <div className="flex items-center gap-x-1 mx-4">
          <input type="checkbox" defaultChecked={characterAllowed} id="characterInput" onChange={ () => {setCharacterAllowed((prev) => !prev)}} />
          <label>Character</label>
        </div>
       </div>  
    </div>
    </div>
  )
}

export default App
