import React from 'react';
//import ReactDOM from 'react-dom/client'; react v18 버전용
import ReactDOM from 'react-dom';  // react v17 버전용
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // Material v3 까지...
import { ThemeProvider, createTheme } from '@material-ui/core/styles'; // Material v4.12 부터는 이렇게!

// React v18.0.0
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
  }
});


// React v 17 버전용
ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();