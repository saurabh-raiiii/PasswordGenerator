import { useState, useCallback, useRef } from 'react'
import './app.css'
import { useEffect } from 'react'

function App() {
   const [size, setSize] = useState(8)
   const [charAllowed, setCharAllowed] = useState(false)
   const [numAllowed, setNumAllowed] = useState(false)
   const [password, setPassword] = useState("")

   // useRef hook
   const passwordRef = useRef(null)

   const passwordGenerator = useCallback( () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      let splChar = "!@#$%^&*_+"
      let nums = "0123456789"

      // if(numAllowed) str += "0123456789"
      // if(charAllowed) str += "!@#$%^&*()_+"

      let passLength = size;
      if(numAllowed) passLength -= 3;
      if(charAllowed) passLength -= 1;

      for(let i=1; i<=passLength; i++){
         let index = Math.floor(Math.random() * str.length)
         pass += str.charAt(index);
      }
      if(charAllowed){
         // pass += splChar.charAt(Math.floor(Math.random() * splChar.length ));
         pass += splChar[Math.floor(Math.random() * splChar.length )];
      }
      if(numAllowed){
         for(let i=0; i<3; i++){
            pass += nums.charAt(Math.floor(Math.random() * nums.length));
         }
      }

      setPassword(pass);

   } , [size, charAllowed, numAllowed, setPassword])

   const copyPasswordToClipboard = useCallback( () => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
      // console.log(window);
   } , [password])

   useEffect(() => {
      passwordGenerator()
   }, [size, charAllowed, numAllowed]) 


   return (
      <>
         <div className=' w-full h-screen bg-img flex justify-center items-center '>
            
            <div className=' flex p-3 justify-center '>
               
               <div className='p-10 my-10 transparent rounded-2xl border-none'>
                  
                  <label className='flex justify-center mb-3 heading drop-shadow-md '>Password Generator</label>
                  
                  <div className=" passwordValue rounded-xl bg-black">
                     
                     <input className=' p-3 w-3/4 font-medium text-xl text-violet-700  bg-white rounded-l-xl '
                     defaultValue={password} 
                     readOnly/>
                     <button className=' p-3 w-1/4 font-medium text-xl text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-700 rounded-r-xl copy-icon ' 
                     onClick={copyPasswordToClipboard}>
                     Copy</button>
                  </div>

                  <div className=" flex flex-wrap inputs mt-3 justify-center gap-3">
                     
                     <input className=" cursor-pointer accent-violet-600" 
                     type="range" 
                     min = "8" 
                     max = "16" 
                     value={size} 
                     step="1"
                     onChange={(e) => {
                        setSize(e.target.value);
                     }}/>
                     <label className=' text-violet-500'>{size < 10 ? "0" + size : size}</label>
                     
                     <input className="h-5 w-5 accent-violet-600" 
                     type="checkbox" 
                     name="specialChar" 
                     defaultChecked={charAllowed} 
                     onChange={() => {
                        setCharAllowed((prev) => !prev);
                     }}/>
                     <label className=' text-violet-500'>Special Character</label>

                     <input className="h-5 w-5 accent-violet-600"
                     type="checkbox"
                     name="numbers" 
                     defaultChecked={numAllowed} 
                     onChange={() => {
                        setNumAllowed((prev) => !prev);
                     }}/>
                     <label className=' text-violet-500'>Numbers</label>

                  </div>

               </div>

            </div>

         </div>

      </>
   )
}

export default App
