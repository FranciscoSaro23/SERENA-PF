import React from 'react'
import { HelpCircleIcon, HomeIcon, SettingsIcon, UserIcon } from 'lucide-react'
// npm i lucide-react
export function NavBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-200 flex justify-around items-center">
      <button className="p-2">
        <HomeIcon className="w-5 h-5 text-[#0F1170]" />
      </button>
      <button className="p-2">
        <HelpCircleIcon className="w-5 h-5 text-gray-400" />
      </button>
      <div className="w-10 h-10 rounded-full bg-[#0F1170] flex items-center justify-center -mt-5 border-4 border-white">
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
      <button className="p-2">
        <SettingsIcon className="w-5 h-5 text-gray-400" />
      </button>
      <button className="p-2">
        <UserIcon className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  )
}
