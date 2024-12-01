'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut } from 'lucide-react'

const connectWallet = async () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('0x1234...5678')
    }, 1000)
  })
}

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const walletAddress = await connectWallet()
      setAddress(walletAddress)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    setAddress(null)
  }

  if (address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white/10 text-[var(--text-color)] border-[var(--first-color)]">
            <Wallet className="mr-2 h-4 w-4" />
            {address.slice(0, 6)}...{address.slice(-4)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[var(--body-color)] border-[var(--first-color)]">
          <DropdownMenuLabel className="text-[var(--text-color)]">Wallet</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(address)} className="text-[var(--text-color-light)] hover:text-[var(--text-color)] hover:bg-white/10">
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[var(--first-color)]" />
          <DropdownMenuItem onClick={handleDisconnect} className="text-[var(--text-color-light)] hover:text-[var(--text-color)] hover:bg-white/10">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button onClick={handleConnect} disabled={isConnecting} className="bg-gradient-to-r from-[var(--second-color)] to-[var(--first-color)] text-[var(--text-color)] hover:shadow-lg hover:shadow-[var(--first-color)]/50 transition duration-300">
      {isConnecting ? (
        'Connecting...'
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}

