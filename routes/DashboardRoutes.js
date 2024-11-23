import { v4 as uuid } from 'uuid';
import { useUser } from 'src/context/userContext';

export const DashboardMenu = () => {
  const { user } = useUser();

  const menuItems = [
    {
      id: uuid(),
      title: 'Dashboard',
      icon: 'home',
      link: '/'
    },
    {
      id: uuid(),
      title: 'Tables',
      grouptitle: true
    },
    ...(user.role==="vendor"? [{
      id: uuid(), 
      icon: 'layout', 
      link: '/vendorTable', 
      title: 'Vendor Product List'
    }] : []),
    ...(user.role==="vendor"? [{
      id: uuid(),
      title: 'Vendor Order Table',
      icon: 'layout',
      link: '/vendorOrderTable'
    }] : []),
    ...(user.role==="employee" ||  user.role==="admin"? [{
      id: uuid(), 
      icon: 'layers', 
      link: '/empTable', 
      title: 'Employee Product Table' 
    }] : []),
    ...(user.role==="employee" ||  user.role==="admin"? [{
      id: uuid(), 
      icon: 'layers', 
      link: '/empOrderTable', 
      title: 'Employee Order Table' 
    }] : []),
    ...(user.perm1 ? [{
      id: uuid(),
      title: 'Users',
      icon: 'git-pull-request',
      link: '/changelog'
    }] : []),
    ...(user.perm3 ? [{
      id: uuid(),
      title: 'Orders Master Table',
      icon: 'git-pull-request',
      link: '/orderMasterTable'
    }] : [])
  ];

  return menuItems;
};

export default DashboardMenu;