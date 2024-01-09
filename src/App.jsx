import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import AccountForm from "./pages/AccountForm";
import LoginForm from "./pages/LoginForm";
import Post, { loader as postLoader } from "./pages/Post";

import ColorSelect from "./formComponents/ColorSelect";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":pid",
        element: <Post />,
        loader: postLoader,
        errorElement: <div>Not found</div>,
      },
      {
        path: "new",
        element: <PostForm />,
      },
      {
        path: "edit",
        element: <div>Edit Post</div>,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "create",
        element: <AccountForm />,
      },
      //TODO: Add element on not existing path * and error
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
