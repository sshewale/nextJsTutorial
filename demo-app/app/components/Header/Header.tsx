'use client';
import { useState } from "react";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import { Button } from "../../client/Button/button";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="w-full border-b-2 border-gray-200 py-4 items-center  justify-center flex">
      <h1 className="text-2xl font-bold">Demo App</h1>
      <div className="ml-4 text-sm text-gray-500 fixed top-0 left-0 w-full h-full z-50 flex" style={{maxHeight:'100px'}}>
        {showMenu ? (
          <div className="">
            <LeftMenu closeMenu={setShowMenu} />
          </div>
        ) : (
          <div className="">
          <Button label="Open Menu" onClick={() => setShowMenu(true)} variant="primary" className="m-4 self-start" />
        </div>
        )}
        
      </div>

    </header>
  );
}