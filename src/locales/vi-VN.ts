import component from './vi-VN/component';
import globalHeader from './vi-VN/globalHeader';
import menu from './vi-VN/menu';
import pwa from './vi-VN/pwa';
import settingDrawer from './vi-VN/settingDrawer';
import settings from './vi-VN/settings';

export default {
  'navBar.lang': 'Vietnamese',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
