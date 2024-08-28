import './home.css';

import { Button, Menu } from 'antd';
import { useLayoutEffect, useRef, useState } from 'react';

import BaseView from '../components/BaseView';
import api from '../libs/api';
import useStyles from './style.style';

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

async function getApiData() {
  const { data } = await api.get('/api/data');
  const { message } = data;
  alert(`Message from api: ${message}`);
}

function Home() {
  const { styles } = useStyles();
  const menuMap: Record<string, React.ReactNode> = {
    base: '基本设置',
    binding: '账号绑定',
  };
  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });
  const dom = useRef<HTMLDivElement>();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      if (window.innerWidth < 768) {
        mode = 'horizontal';
      }
      setInitConfig({
        ...initConfig,
        mode: mode as SettingsState['mode'],
      });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => ({ key: item, label: menuMap[item] }));
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return 'security';
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}>
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }: any) => {
              setInitConfig({
                ...initConfig,
                selectKey: key as SettingsStateKeys,
              });
            }}
            items={getMenu()}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </div>
  );
}

export default Home;
