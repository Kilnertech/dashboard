/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Tables from "layouts/tables";
import PromptsManager from "layouts/admin";
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import GradeSheets from "layouts/gradeSheets";
import Feed from "layouts/feed";
import Chat from "layouts/chatbot";

// @mui icons
import Icon from "@mui/material/Icon";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
const routes = [

  {
    type: "collapse",
    name: "MEPs Identikit",
    key: "tables",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Admin",
    key: "admin",
    icon: <AdminPanelSettingsTwoToneIcon fontSize="small" />,
    route: "/admin",
    component: <PromptsManager />,
  },
  {
    type: "collapse",
    name: "Feed",
    key: "feed",
    icon: <ViewListOutlinedIcon/>,
    route: "/feed",
    component: <Feed />,
  },
  {
    type: "collapse",
    name: "MEPs Grade Sheets",
    key: "gradeSheets",
    icon: <SummarizeIcon/>,
    route: "/gradeSheets",
    component: <GradeSheets />,
  },
  {
    type: "collapse",
    name: "ChatBot",
    key: "chat",
    icon: <SmartToyIcon/>,
    route: "/chat",
    component: <Chat />,
  },
];

export default routes;
