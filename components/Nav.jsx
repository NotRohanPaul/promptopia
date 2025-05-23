"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    setUpProviders()
  }, [])

  return (
    <nav className="flex-between mb-16 w-full h-[70px] pt-3">
      <Link href='/' className="flex-center flex gap-2">
        <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width="30" height="30" className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation*/}
      <div className="sm:flex hidden">
        {
          session?.user ?
            (<div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Prompt
              </Link>
              <button type="button"
                onClick={() => {
                  signOut({ callbackUrl: '/' })
                }
                }
                className="outline_btn">Sign Out</button>

              <Link href="/profile">
                <Image src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="Profile" />
              </Link>
            </div>
            ) : (
              <>
                {providers && Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn text"
                  >
                    Sign In
                  </button>
                ))}
              </>
            )
        }
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex">
        {session?.user ?
          (
            <div className="flex">
              <Image src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="Profile"
                onClick={() => {
                  setToggleDropdown((prev) => (!prev)
                  )
                }} />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false)
                      signOut({ callbackUrl: '/' })
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>

                </div>
              )}
            </div>
          )
          :
          (
            <>
              {providers && Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn text"
                >
                  Sign In
                </button>
              ))}
            </>
          )}
      </div>
    </nav>
  )
}

export default Nav