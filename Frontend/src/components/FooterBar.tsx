import React from 'react'
import { containerMaxW } from '../config'

export default function FooterBar() {
  // const year = new Date().getFullYear()

  return (
    <footer className={`py-2 px-6 ${containerMaxW}`}>
      <div className="block md:flex items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <b>
            {/* &copy;{year} */}
          </b>
        </div>
      </div>
    </footer>
  )
}
