import Page from ".";
const route = [
  {
    private: true,
    id: "app.MapTrackingManagement", // page id - static data get from system
    name: "MapTrackingManagement", // name of page
    component: Page, // main page
    path: "/map-tracking", // path to access to page from browser
  },
  {
    private: true,
    id: "app.MapTrackingManagement2", // page id - static data get from system
    name: "MapTrackingManagement", // name of page
    component: Page, // main page
    path: "/map-tracking/list", // path to access to page from browser
  },
];

export default route;
