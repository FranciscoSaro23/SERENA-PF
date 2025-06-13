import React from 'react'
import { Button } from '../shared/Button'
import { NavBar } from '../shared/NavBar'
export function PersonalizeScreen() {
  return (
    <div className="h-full bg-[#FFFEF5] flex flex-col items-center px-6 pt-10 relative">
      <h1 className="text-lg font-medium text-center mb-6">
        Personalizar un modo
      </h1>
      <div className="w-full mb-4">
        <p className="text-xs text-gray-500 mb-1">NOMBRE DEL MODO</p>
        <div className="bg-white border border-gray-200 rounded-lg p-2 text-sm">
          Modo personalizado
        </div>
      </div>
      <div className="w-full mb-4">
        <p className="text-xs text-gray-500 mb-1">SELECCIÓN DE COLORES</p>
        <div className="flex space-x-2 mb-2">
          <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
          <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-xs">+</span>
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <p className="text-xs text-gray-500 mb-1">BRILLO</p>
        <div className="h-4 bg-gradient-to-r from-[#0F1170] to-blue-300 rounded-full"></div>
      </div>
      <div className="w-full mb-4">
        <p className="text-xs text-gray-500 mb-1">VELOCIDAD</p>
        <div className="h-4 bg-gray-200 rounded-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[#0F1170] rounded-full"></div>
        </div>
      </div>
      <div className="absolute bottom-16 w-full">
        <Button primary className="w-full">
          GUARDAR MODO
        </Button>
      </div>
      <NavBar />
    </div>
  )
}