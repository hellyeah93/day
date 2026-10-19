import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = { appId: 'com.dayzero.planner', appName: 'DayZero', webDir: 'dist', bundledWebRuntime: false, plugins: { LocalNotifications: { smallIcon: 'ic_stat_icon_config_sample', iconColor: '#42d9ff' }, StatusBar: { backgroundColor: '#0a0c0f', style: 'DARK' } } };
export default config;