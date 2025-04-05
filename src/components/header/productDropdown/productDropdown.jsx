"use client"
import React, { useState } from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";

export default function ProductDropdown() {
    return (
        <Dropdown label="Dropdown" inline>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
      );
    }

