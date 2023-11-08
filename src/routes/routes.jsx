import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
import PrivateRoute from "./PrivateRoute";
import MyAssignments from "../pages/MyAssignments/MyAssignments";
import SubmittedAssignments from "../pages/SubmittedAssignments/SubmittedAssignments";
import Assignments from "../pages/Assignments/Assignments";
import ViewAssignment from "../Components/ViewAssignment/ViewAssignment";
import UpdateAssignment from "../Components/UpdateAssignments/UpdateAssignment";
import AssignmentSubmission from "../Components/ViewAssignment/AssignmentSubmission";
import GiveAssignmentMarks from "../pages/SubmittedAssignments/GiveAssignmentMarks";
import ErrorPage from "../ErrorPage/ErrorPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                errorElement: <ErrorPage />
            },
            {
                path: "signIn",
                element: <SignIn></SignIn>,
                errorElement: <ErrorPage />
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>,
                errorElement: <ErrorPage />
            },
            {
                path: "assignments",
                element: <Assignments></Assignments>,
                errorElement: <ErrorPage />
            },
            {
                path: 'create-assignment',
                element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>,
                errorElement: <ErrorPage />
            },
            {
                path: "my-assignments",
                element: <PrivateRoute><MyAssignments></MyAssignments></PrivateRoute>,
                errorElement: <ErrorPage />
            },
            {
                path: "view-assignment/:id",
                element: <PrivateRoute> <ViewAssignment></ViewAssignment> </PrivateRoute>,
                errorElement: <ErrorPage />
            },
            {
                path: "assignmentSubmission/:id",
                element: <PrivateRoute> <AssignmentSubmission></AssignmentSubmission> </PrivateRoute>,
                errorElement: <ErrorPage />
            },

            {
                path: "update-assignment/:id",

                element: <PrivateRoute> <UpdateAssignment></UpdateAssignment> </PrivateRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "submitted-assignments",

                element: <PrivateRoute> <SubmittedAssignments></SubmittedAssignments> </PrivateRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "give-assignment-marks/:id",
                element: <PrivateRoute> <GiveAssignmentMarks></GiveAssignmentMarks> </PrivateRoute>,
                errorElement: <ErrorPage />
            }
        ]
    }
])

export default routes;