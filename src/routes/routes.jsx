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

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
               path: "/",
               element: <Home></Home>
            },
            {
                path: "signIn",
                element: <SignIn></SignIn>
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>
            },
            {
                path: "assignments",
                element: <Assignments></Assignments>
            },
            {
                path: 'create-assignment',
                element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
            },
            {
                path: "my-assignments",
                element: <PrivateRoute><MyAssignments></MyAssignments></PrivateRoute>
            },
            {
                path: "view-assignment/:id",
                element: <PrivateRoute> <ViewAssignment></ViewAssignment> </PrivateRoute>,
            },
            {
                path: "assignmentSubmission/:id",
                element: <PrivateRoute> <AssignmentSubmission></AssignmentSubmission> </PrivateRoute>,
            },

            {
                path: "update-assignment/:id",
                element: <PrivateRoute> <UpdateAssignment></UpdateAssignment> </PrivateRoute>,
            },
            {
                path: "submitted-assignments",
                element: <PrivateRoute> <SubmittedAssignments></SubmittedAssignments> </PrivateRoute>
            },
            {
                path: "give-assignment-marks/:id",
                element: <PrivateRoute> <GiveAssignmentMarks></GiveAssignmentMarks> </PrivateRoute>
            }
        ]
    }
])

export default routes;