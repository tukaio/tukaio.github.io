import AdminPage from ".";
const route = [
  {
    private: true,
    id: "app.admin", // page id - static data get from system
    name: "AdminPage", // name of page
    component: AdminPage, // main page
    path: "/admin", // path to access to page from browser
  },
];

export default route;
