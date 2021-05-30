import "./App.css";
import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import JobList from "./components/routes/JobList";
import { JobListContextProvider } from "./context/JobListContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddJob from "./components/AddJob";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Navbar />
        <JobListContextProvider>
          <main className="container mt-5">
            <Route path="/" exact component={JobList} />
            <Route path="/jobs/new" exact component={AddJob} />
          </main>
        </JobListContextProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
