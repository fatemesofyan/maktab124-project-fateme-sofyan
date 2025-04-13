import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";

export default function CustomDropdown() {
  return (
    <div className="!text-white text-lg">
      <Dropdown label="دسته بندی" inline>
        <DropdownItem className="!text-primaryDark">Dashboard</DropdownItem>
        <DropdownItem className="!text-primaryDark">Settings</DropdownItem>
        <DropdownItem className="!text-primaryDark">Earnings</DropdownItem>
        <DropdownItem className="!text-primaryDark">Sign out</DropdownItem>
      </Dropdown>
    </div>
  );
}