import SectionCover from "@/components/SectionCover/SectionCover";
import orderCover from "@/assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import { useMenu } from "@/Hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";

export default function Order() {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();

  const initialIdx = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIdx);
  const [menus] = useMenu();

  console.log(category);

  const deserts = menus.filter((menu) => menu.category === "dessert");
  const pizza = menus.filter((menu) => menu.category === "pizza");
  const soup = menus.filter((menu) => menu.category === "soup");
  const salad = menus.filter((menu) => menu.category === "salad");
  const drinks = menus.filter((menu) => menu.category === "drinks");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
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
          <TabPanel>
            <OrderTab items={salad} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={pizza} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={soup} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={deserts} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={drinks} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
