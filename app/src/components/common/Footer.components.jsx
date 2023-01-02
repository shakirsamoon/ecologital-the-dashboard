import { Layout, Typography } from 'antd';

function Footer() {
  return (
    <Layout.Footer style={{ textAlign: 'center', marginTop: '20px' }}>
      The Dashboard ©{new Date().getFullYear()} Created by{' '}
      <Typography.Link href="https://github.com/shakirsamoon" target="_blank">
        Shakir Samoon
      </Typography.Link>
    </Layout.Footer>
  );
}

export default Footer;
