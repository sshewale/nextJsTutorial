import { Button } from "@/app/client/Button/button";
import Link from "next/link";

interface LeftMenuProps {
    className?: string;
    closeMenu: (value: boolean) => void;
};
export function LeftMenu({ closeMenu }: LeftMenuProps) {
  return (
    <div className="w-64 h-screen border-r-2 border-gray-200 p-4 py-2 bg-white">
        <div className="flex justify-end">
            <Button label="Close" onClick={() => closeMenu(false)} variant="secondary" className="mb-4" />
        </div>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="text-gray-700 hover:text-gray-900" >
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
        </li>
        <li>
          <Link href="/services" className="text-gray-700 hover:text-gray-900">
            Services
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}