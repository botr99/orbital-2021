import "./App.css";
import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";
import Jobs from "./components/Jobs/Jobs";
import { Redirect, Route, Switch } from "react-router-dom";
import AddJob from "./components/AddJob";
import JobEdit from "./components/Jobs/Job/JobEdit";
import JobDetail from "./components/Jobs/Job/JobDetail";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Auth/Admin";
import Submissions from "./components/Submissions/Submissions";
import SubmissionDetail from "./components/Submissions/SubmissionDetail";
import RegisteredJobs from "./components/RegisteredJobs";
import Error from "./components/Error";
import ROLES from "./utils/roles";
import Profile from "./components/Profile/Profile";
import JobsOrganized from "./components/JobsOrganized";
import { useSelector } from "react-redux";
import LoadingContainer from "./components/LoadingContainer";

function App() {
  const user = JSON.parse(localStorage.getItem("profile")); // get logged in user
  const isLoggingIn = useSelector((state) => state.isLoggingIn);

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <main className="container mt-5 mb-5">
        {isLoggingIn && LoadingContainer}
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/jobs" />} />
          <Route path="/jobs" exact component={Jobs} />
          <Route
            path="/jobs/new"
            exact
            component={() =>
              [ROLES.Admin, ROLES.StudentGroup, ROLES.Organization].includes(
                user?.result?.role
              ) ? (
                <AddJob />
              ) : (
                <Error />
              )
            }
          />
          <Route path="/jobs/:id/edit" exact component={JobEdit} />
          <Route path="/jobs/:id" exact component={JobDetail} />
          <Route
            path="/registrations/:id"
            exact
            component={() =>
              user?.result?.role === ROLES.Student ? (
                <RegisteredJobs />
              ) : (
                <Error />
              )
            }
          />
          <Route path="/organizers/:name" exact component={JobsOrganized} />
          <Route path="/admin" exact component={Admin} />
          <Route
            path="/submissions"
            exact
            component={() =>
              user?.result?.role === ROLES.Admin ? <Submissions /> : <Error />
            }
          />
          <Route
            path="/submissions/:id"
            exact
            component={() =>
              user?.result?.role === ROLES.Admin ? (
                <SubmissionDetail />
              ) : (
                <Error />
              )
            }
          />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/jobs" />)}
          />
          <Route path="/profile/:id" exact component={() => <Profile />} />
          <Route path="*" component={Error} />;
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
