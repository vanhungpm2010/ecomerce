import { ConnectProps, ConnectState } from '@/models/connect';
import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/icon.png';
import styles from './UserLayout.less';
import Footer from '../components/Footer/Footer';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

const UserLayout: React.SFC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes, props);

  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        {/* <div className={styles.lang}>
          <SelectLang />
        </div> */}
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>eCommerce</span>
              </Link>
            </div>
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(UserLayout);
