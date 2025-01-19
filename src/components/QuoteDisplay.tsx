import { Clock, DollarSign, Wrench } from 'lucide-react';  // Changed icon names
import type { PriceQuote } from '../types';

interface Props {
  quote: PriceQuote | null;
}

export default function QuoteDisplay({ quote }: Props) {
  if (!quote) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Quote</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Price</p>
            <p className="text-xl font-semibold">${quote.totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-full">
            <Wrench className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Material Cost</p>
            <p className="text-xl font-semibold">${quote.materialCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-full">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimated Time</p>
            <p className="text-xl font-semibold">{quote.estimatedTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
