import "./App.css";
import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import Home from "./components/routes/Home";
import { JobListContextProvider } from "./context/JobListContext";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <JobListContextProvider>
        <main className="container mt-5">
          <Home />
        </main>
      </JobListContextProvider>
      <Footer />
    </div>
  );
}

export default App;
