import {
	Briefcase,
    ListTask,
    People,
    Bullseye
} from 'react-bootstrap-icons';

export const ProjectsStats = [
    {
       id:1,
       title : "Products",
       value : 18,
       link: '/vendorTable',
       icon: <Briefcase size={18}/>,
       statInfo: 'From <span className="text-dark me-2">28</span> Vendors' 
    },
    {
        id:2,
        title : "Active Returns",
        value : 132,
        link: '/returns',
        icon: <ListTask size={18}/>,
        statInfo: '<span className="text-dark me-2">28</span> Completed' 
     },
     {
        id:3,
        title : "Teams",
        value : 12,
        link: '/empTable',
        icon: <People size={18}/>,
        statInfo: '<span className="text-dark me-2">1</span> Completed' 
     },
   //   {
   //      id:4,
   //      title : "Productivity",
   //      value : '76%',
   //      link: '/vendorTable',
   //      icon: <Bullseye size={18}/>,
   //      statInfo: '<span className="text-dark me-2">5%</span> Completed' 
   //   }
];
export default ProjectsStats;
