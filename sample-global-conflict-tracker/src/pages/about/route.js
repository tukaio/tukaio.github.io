import Page from ".";
const route = {
  private: true,
  id: "app.about", // page id - static data get from system
  name: "AboutPage", // name of page
  component: Page, // main page
  path: "/about", // path to access to page from browser
};

export default route;
