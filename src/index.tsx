import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Top from './components/pages/Top'

import './assets/index.css'

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Top />} />
      </Routes>
    </BrowserRouter>
  </>
)

ReactDOM.render(<App />, document.querySelector('#root'))