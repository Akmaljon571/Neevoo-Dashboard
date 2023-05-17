import './App.scss';
import Prive from './prive.app';
import Public from './public.app';

function App() {
    const token = JSON.parse(localStorage.getItem('adminToken')) || false

    return (
      <>
        {token ? <Prive /> : <Public />}
      </>
    )
}

export default App;
