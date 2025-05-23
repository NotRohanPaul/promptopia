import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover and Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/assets/images/logo.svg" type="image/x-icon" />
      </head>
      <body>
        <Provider>
          <div className='main'>
            <div className="gradient" />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
