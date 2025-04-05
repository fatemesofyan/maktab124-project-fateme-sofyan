import React from "react";
import { Dropdown, DropdownItem } from "flowbite-react";

export default function ProductDropdown() {
  return (
    <div className="!text-primaryDark text-lg">
      <Dropdown label="محصولات" inline>
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>
    </div>
  );
}
