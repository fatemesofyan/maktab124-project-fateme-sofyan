import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";

export default function Orderdropdown() {
  return (
    <div className="!text-white text-lg">
      <Dropdown label="زمان ثبت سفارش" inline>
        <DropdownItem className="!text-primaryDark">Dashboard</DropdownItem>
        <DropdownItem className="!text-primaryDark">Dashboard</DropdownItem>
      </Dropdown>
    </div>
  );
}
