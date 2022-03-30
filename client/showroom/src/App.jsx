import { ProductList, Product } from "./components";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1>STORE.</h1>
      <div className="app__content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          {/* <Route path="/Products/:id" element={<Product />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
