import "./App.css";
import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import Jobs from "./components/Jobs/Jobs";
import { JobsContextProvider } from "./context/JobsContext";
import { Route, Switch } from "react-router-dom";
import AddJob from "./components/AddJob";
import JobEdit from "./components/Jobs/Job/JobEdit";
import JobDetail from "./components/Jobs/Job/JobDetail";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <JobsContextProvider>
        <main className="container mt-5">
          <Switch>
            <Route path="/jobs/new" exact>
              <AddJob />
            </Route>
            <Route path="/jobs/:id/edit" exact>
              <JobEdit />
            </Route>
            <Route path="/jobs/:id" exact>
              <JobDetail />
            </Route>
            <Route path="/" exact>
              <Jobs />
            </Route>
          </Switch>
        </main>
      </JobsContextProvider>
      <Footer />
    </div>
  );
}

export default App;
