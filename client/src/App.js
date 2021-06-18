import "./App.css";
import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import Jobs from "./components/Jobs/Jobs";
import { JobsContextProvider } from "./context/JobsContext";
import { JobsCategoryContextProvider } from "./context/JobsCategoryContext";
import { Route, Switch } from "react-router-dom";
import AddJob from "./components/AddJob";
import JobEdit from "./components/Jobs/Job/JobEdit";
import JobDetail from "./components/Jobs/Job/JobDetail";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Auth/Admin";
import Submissions from "./components/Submissions/Submissions";
import { Typography } from "@material-ui/core";

function App() {
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <JobsContextProvider>
        <JobsCategoryContextProvider>
          <main className="container mt-5">
            <Switch>
              <Route path="/admin" exact component={Admin} />
              {user && (
                <Route path="/submissions" exact component={Submissions} />
              )}
              <Route path="/auth" exact component={Auth} />
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
              <Route path="*">
                <Typography>Page not found</Typography>
              </Route>
            </Switch>
          </main>
        </JobsCategoryContextProvider>
      </JobsContextProvider>
      <Footer />
    </div>
  );
}

export default App;
