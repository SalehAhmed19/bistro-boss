import SectionCover from "../../../components/SectionCover/SectionCover";
import orderCover from "../../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import { useMenu } from "../../../Hooks/useMenu";

export default function Order() {
  const [tabIndex, setTabIndex] = useState(0);
  const [menus] = useMenu();
  const deserts = menus.filter((menu) => menu.category === "dessert");
  const pizza = menus.filter((menu) => menu.category === "pizza");
  const soup = menus.filter((menu) => menu.category === "soup");
  const salad = menus.filter((menu) => menu.category === "salad");
  const offered = menus.filter((menu) => menu.category === "offered");

  return (
    <div>
      <SectionCover title={"Order Now!"} img={orderCover} />

      <div className="my-10">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soup</Tab>
            <Tab>Desserts</Tab>
            <Tab>Drinks</Tab>
          </TabList>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
