import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
