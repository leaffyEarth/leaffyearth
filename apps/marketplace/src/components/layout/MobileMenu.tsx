'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { X, MapPin } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  navigation: Array<{ name: string; href: string; }>;
}

const MobileMenu = ({ isOpen, setIsOpen, navigation }: MobileMenuProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.map((item) => (
                  <div key={item.name} className="flow-root">
                    <Link
                      href={item.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Locations */}
              <div className="border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link
                    href="/locations"
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Find a Store
                    </div>
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMenu; 