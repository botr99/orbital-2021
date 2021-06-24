import "./App.css";
import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import Jobs from "./components/Jobs/Jobs";
import { JobsContextProvider } from "./context/JobsContext";
import { JobsCategoryContextProvider } from "./context/JobsCategoryContext";
import { Redirect, Route, Switch } from "react-router-dom";
import AddJob from "./components/AddJob";
import JobEdit from "./components/Jobs/Job/JobEdit";
import JobDetail from "./components/Jobs/Job/JobDetail";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Auth/Admin";
import Submissions from "./components/Submissions/Submissions";
import SubmissionDetail from "./components/Submissions/SubmissionDetail";
import NotFound from "./components/NotFound";
import ROLES from "./utils/roles";

function App() {
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <JobsContextProvider>
        <JobsCategoryContextProvider>
          <main className="container mt-5 mb-5">
            <Switch>
              <Route path="/" exact component={() => <Redirect to="/jobs" />} />
              <Route path="/jobs" exact component={Jobs} />
              <Route path="/jobs/new" exact>
                <AddJob />
              </Route>
              <Route path="/jobs/:id/edit" exact>
                <JobEdit />
              </Route>
              <Route path="/jobs/:id" exact>
                <JobDetail />
              </Route>
              <Route path="/admin" exact component={Admin} />
              <Route
                path="/submissions"
                exact
                component={() =>
                  user?.result?.role === ROLES.Admin ? (
                    <Submissions />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/submissions/:id"
                exact
                component={() =>
                  user?.result?.role === ROLES.Admin ? (
                    <SubmissionDetail />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/auth"
                exact
                component={() => (!user ? <Auth /> : <Redirect to="/jobs" />)}
              />
              <Route path="*" component={NotFound} />;
            </Switch>
          </main>
        </JobsCategoryContextProvider>
      </JobsContextProvider>
      <Footer />
    </div>
  );
}

export default App;
