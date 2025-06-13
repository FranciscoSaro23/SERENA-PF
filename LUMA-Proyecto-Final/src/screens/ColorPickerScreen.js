import React from 'react'
import { Button } from '../shared/Button'
export function ColorPickerScreen() {
  return (
    <div className="h-full bg-[#FFFEF5] flex flex-col items-center px-6 pt-10 relative">
      <div className="w-full flex justify-between items-center mb-6">
        <button className="text-sm text-gray-500">Cancelar</button>
        <h1 className="text-lg font-medium">Color</h1>
        <button className="text-sm text-blue-500">Guardar</button>
      </div>
      <div className="w-full h-64 bg-gradient-to-b from-white to-black rounded-lg mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-500"></div>
        <div className="absolute w-6 h-6 border-2 border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">OPACIDAD</span>
          <span className="text-xs font-medium">100%</span>
        </div>
        <div className="h-4 bg-gradient-to-r from-white to-purple-500 rounded-full"></div>
      </div>
      <div className="w-full">
        <div className="flex flex-col mb-3">
          <span className="text-xs text-gray-500 mb-1">HEXADECIMAL</span>
          <div className="flex">
            <div className="w-10 h-10 bg-purple-500 rounded-lg mr-2"></div>
            <div className="flex-1 bg-gray-100 rounded-lg flex items-center px-3">
              <span className="text-sm">#8A2BE2</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-16 w-full">
        <Button primary className="w-full">
          APLICAR COLOR
        </Button>
      </div>
    </div>
  )
}
