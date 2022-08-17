import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import TodayIcon from '@mui/icons-material/Today';
import DonutLarge from '@mui/icons-material/DonutLarge';
import InventoryIcon from '@mui/icons-material/Inventory';

export const SidebarData = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/equipmentUtilisationSnapshot',
  },
  {
    title: 'Equipment Utilisation',
    icon: <WaterfallChartIcon />,
    link: '/equipmentUtilisationDashboard',
  },
  {
    title: "Today's Production",
    icon: <TodayIcon />,
    link: '/todaysProduction',
  },
  {
    title: 'Single Product Flow',
    icon: <InventoryIcon />,
<<<<<<< HEAD
    link: '/SingleProductFlow',
=======
    link: '/singleProductFlow',
>>>>>>> ac2a8846 (fix merge conflic)
  },
  {
    title: 'Production Overview',
    icon: <DonutLarge />,
    link: '/productionOverview/63',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/settings',
  },
  {
    title: 'Profile',
    icon: <PersonIcon />,
    link: '/profile',
  },
];
