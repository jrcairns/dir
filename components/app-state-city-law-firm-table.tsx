'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Star, MapPin, Phone } from 'lucide-react'

interface LawFirmData {
  name: string;
  address: string;
  phone: string;
  rating: string;
  placeId: string;
}

interface AppStateCityLawFirmTableProps {
  data: LawFirmData[];
  state: string;
  city: string;
}

export function AppStateCityLawFirmTable({ data, state, city }: AppStateCityLawFirmTableProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top 20 Law Firms in {city}, {state}</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((firm, index) => (
              <TableRow key={firm.placeId || index}>
                <TableCell className="font-medium">
                  <div className="w-64 truncate">
                    <span className="flex-1">{firm.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="flex-1">{firm.address}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    <span className="flex-1">{firm.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-yellow-400" />
                    <span className="flex-1">{firm.rating}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}