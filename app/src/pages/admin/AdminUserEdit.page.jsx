import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdminEditUserDataForm from '../../components/admin/AdminEditUserDataForm.component';
import AdminEditUserStatus from '../../components/admin/AdminEditUserStatus.component';
import Header from '../../components/common/Header.component';
import API_PATHS from '../../lib/constants/apiPaths.const';
import useFetchData from '../../lib/hooks/useFetchData.hook';
import LoadingBlock from '../../components/LoadingBlock.component';

function AdminUserEditPage() {
  const { token } = useSelector((state) => state.auth);
  let { id } = useParams();

  const { data, error, loading } = useFetchData(
    API_PATHS.ADMIN_GET_SINGLE_USER(id),
    token
  );

  if (loading) {
    return <LoadingBlock />;
  }

  return (
    <main>
      <Header title="Edit User" />
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <>
          <AdminEditUserStatus userData={data.user} />
          <AdminEditUserDataForm userData={data.user} />
        </>
      )}
    </main>
  );
}

export default AdminUserEditPage;
