import { ReactNode } from 'react';
import Button from './Button';

type NavbarProps = {
  action: () => void;
};

const Navbar = ({ action }: NavbarProps) => {
  return (
    <header>
      <nav className="bg-purple h-20">
        <div className="flex justify-between h-full px-[4vw] mx-auto">
          <div className="flex items-center w-[125px] justify-start">
            <div className="flex items-center gap-1.5">
              <div className="w-[26px] h-[26px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <path
                    d="M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317C6.616 94.036.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.317 5.986 13.317 13.317v33.335c0 7.33-5.986 13.317-13.317 13.317-7.33 0-13.317-5.987-13.317-13.317zm0 0"
                    fill="#de1c59"
                  />
                  <path
                    d="M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309C33.964 6.616 39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.317-13.317 13.317H13.946C6.616 60.598.63 54.612.63 47.281c0-7.33 5.987-13.317 13.317-13.317zm0 0"
                    fill="#35c5f0"
                  />
                  <path
                    d="M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317 7.33 0 13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.986-13.317-13.317V13.946C67.402 6.616 73.388.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317zm0 0"
                    fill="#2eb57d"
                  />
                  <path
                    d="M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309 0 7.33-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.317 13.317-13.317h33.335c7.33 0 13.317 5.986 13.317 13.317 0 7.33-5.987 13.317-13.317 13.317zm0 0"
                    fill="#ebb02e"
                  />
                </svg>
              </div>
              <span className="text-[29px] font-outfit font-bold">slack</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center text-sm flex-1">
            <ul className="flex flex-1 leading-[1.555] -tracking-[.0012em]">
              <NavLink dropdown>Features</NavLink>
              <NavLink dropdown>Solutions</NavLink>
              <NavLink>Enterprise</NavLink>
              <NavLink dropdown>Resources</NavLink>
              <NavLink>Pricing</NavLink>
            </ul>
            <button className="mt-1 mr-6">
              <svg
                width="20"
                height="20"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m18.78 17.72c.1467.1467.22.3233.22.53 0 .2133-.0733.39-.22.53-.16.1467-.3367.22-.53.22-.2067 0-.3833-.0733-.53-.22l-4.47-4.47c-.6667.54-1.4067.9567-2.22 1.25-.8067.2933-1.65.44-2.53.44-1.36 0-2.61333-.3367-3.76-1.01s-2.05667-1.5833-2.73-2.73-1.01-2.4-1.01-3.76.33667-2.61333 1.01-3.76 1.58333-2.05667 2.73-2.73 2.4-1.01 3.76-1.01 2.6133.33667 3.76 1.01 2.0567 1.58333 2.73 2.73 1.01 2.4 1.01 3.76c0 .88-.1467 1.7267-.44 2.54-.2933.8067-.71 1.5433-1.25 2.21zm-10.28-3.22c1.08667 0 2.0867-.27 3-.81.92-.54 1.65-1.2667 2.19-2.18.54-.92.81-1.92333.81-3.01s-.27-2.08667-.81-3c-.54-.92-1.27-1.65-2.19-2.19-.9133-.54-1.91333-.81-3-.81s-2.09.27-3.01.81c-.91333.54-1.64 1.27-2.18 2.19-.54.91333-.81 1.91333-.81 3s.27 2.09.81 3.01c.54.9133 1.26667 1.64 2.18 2.18.92.54 1.92333.81 3.01.81z"
                  stroke="#fff"
                  strokeWidth=".5"
                ></path>
              </svg>
            </button>
            <form action={action}>
              <Button
                type="submit"
                variant="secondary"
                className="ml-2 py-0 w-[240px] h-[45px]"
              >
                <span>Create a new workspace</span>
              </Button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

type NavLinkProps = {
  dropdown?: boolean;
  children: ReactNode;
};

const NavLink = ({ dropdown = false, children }: NavLinkProps) => {
  return (
    <li className="p-[.25rem_.88rem]">
      <button className="text-[15.5px] font-semibold flex items-center gap-1">
        <span>{children}</span>
        {dropdown && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
          >
            <path
              d="M7 1L4 4L1 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </li>
  );
};

export default Navbar;
