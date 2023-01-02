import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import DashboardPage from './pages/Dashboard.page';
import LoginPage from './pages/auth/Login.page';
import NotFoundPage from './pages/NotFound.page';
import SignupPage from './pages/auth/Signup.page';
import AllUsersPage from './pages/admin/AdminAllUsers.page';
import UserProfilePage from './pages/user/UserProfile.page';
import UserProfileEditPage from './pages/user/UserProfileEdit.page';
import UserProtectedLayout from './components/layouts/UserProtectedLayout.components';
import AdminProtectedLayout from './components/layouts/AdminProtectedLayout.component';
import AdminUserPreviewPage from './pages/admin/AdminUserPreview.page';
import AdminNewUserPage from './pages/admin/AdminNewUser.page';
import AdminUserEditPage from './pages/admin/AdminUserEdit.page';
import AuthLayout from './components/layouts/AuthLayout.component';
import DashboardLayout from './components/layouts/DashboardLayout.component';
import AccountSetupPage from './pages/user/AccountSetup.page';
import RootLayout from './components/layouts/RootLayout.component';

// Setting the App routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      <Route element={<UserProtectedLayout />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="profile">
            <Route index element={<UserProfilePage />} />
            <Route path="edit" element={<UserProfileEditPage />} />
          </Route>

          <Route path="users" element={<AdminProtectedLayout />}>
            <Route index element={<AllUsersPage />} />
            <Route path="new" element={<AdminNewUserPage />} />

            <Route path=":id">
              <Route index element={<AdminUserPreviewPage />} />
              <Route path="edit" element={<AdminUserEditPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="setup" element={<AccountSetupPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
