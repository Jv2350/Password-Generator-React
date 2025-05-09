import React, { useCallback, useEffect, useRef, useState } from "react";
import { generatePassword } from "../utils/passwordUtils";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    const newPassword = generatePassword(length, charAllowed, numberAllowed);
    setPassword(newPassword);
  }, [length, charAllowed, numberAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length);
      navigator.clipboard.writeText(password);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-gray-900 text-white space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-300">
        Password Generator
      </h1>
      <div className="flex shadow-md rounded-lg overflow-hidden">
        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
          className="flex-1 py-2 px-4 text-gray-400  bg-gray-800 rounded-l-lg  outline-none shadow-2xl"
          placeholder="Generated password"
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-600 hover:bg-blue-900 cursor-pointer transition-colors px-4 text-white rounded-r-lg"
        >
          Copy
        </button>
      </div>

      {/* length range */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="8"
            max="100"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="cursor-pointer w-full"
          />
          <span className="whitespace-nowrap text-sm">Length: {length}</span>
        </div>

        {/* number checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="accent-orange-400"
          />
          <label htmlFor="numberInput" className="text-sm">
            Include Numbers
          </label>
        </div>

        {/* char checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="charInput"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="accent-orange-400"
          />
          <label htmlFor="charInput" className="text-sm">
            Include Symbols
          </label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
