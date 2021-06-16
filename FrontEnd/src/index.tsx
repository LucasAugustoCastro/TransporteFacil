import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// import React, { useState, useCallback, ChangeEvent } from 'react';
// import ReactDOM from 'react-dom';

// const MyForm: React.FC = () => {
//   const [username, setUsername] = useState<string>('');
//   function myChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
//     setUsername(event.target.value);
//   }

//   return (
//     <form>
//       <h1>Hello {username}</h1>
//       <p>Enter your name:</p>
//       <input type="text" onChange={myChangeHandler} />
//     </form>
//   );
// };

// ReactDOM.render(<MyForm />, document.getElementById('root'));
