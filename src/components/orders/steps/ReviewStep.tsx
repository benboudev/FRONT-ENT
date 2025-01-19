import { Package, User, Calendar, MapPin, Calculator } from 'lucide-react';

interface Props {
  orderData: {
    basicInfo: {
      customer_id: string;
      shop_date: string;
      job_address: string;
      delivery_date: string;
      order_status: string;
    };
    calculations: {
      riserQuantity: number;
      stepWidth: number;
      riserCutSize: number;
      stringerLength: number;
    };
    materials: {
      riser: { material_id: number; quantity: number; cut_size: number };
      tread: { material_id: number; quantity: number; cut_size: number };
      stringer: { material_id: number; quantity: number; cut_size: number };
    };
  };
}

const ReviewStep = ({ orderData }: Props) => {
  return (
    <div className="space-y-8">
      <div className="text-xl font-semibold text-gray-900">Review Order Details</div>

      <div className="grid grid-cols-1 gap-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              Order Information
            </h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Shop Date</p>
              <p className="text-base font-medium">{orderData.basicInfo.shop_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Date</p>
              <p className="text-base font-medium">{orderData.basicInfo.delivery_date}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Job Address</p>
              <p className="text-base font-medium">{orderData.basicInfo.job_address}</p>
            </div>
          </div>
        </div>

        {/* Calculations */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-gray-500" />
              Measurements
            </h3>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500">Number of Risers</p>
              <p className="text-base font-medium">{orderData.calculations.riserQuantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Step Width</p>
              <p className="text-base font-medium">{orderData.calculations.stepWidth}"</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Riser Cut Size</p>
              <p className="text-base font-medium">{orderData.calculations.riserCutSize}"</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stringer Length</p>
              <p className="text-base font-medium">{orderData.calculations.stringerLength}"</p>
            </div>
          </div>
        </div>

        {/* Materials Summary */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-500" />
              Materials Summary
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Risers */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Risers</p>
                <p className="text-base font-medium">
                  {orderData.materials.riser.quantity} pieces
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cut Size</p>
                <p className="text-base font-medium">
                  {orderData.materials.riser.cut_size}"
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Material ID</p>
                <p className="text-base font-medium">
                  #{orderData.materials.riser.material_id}
                </p>
              </div>
            </div>

            {/* Treads */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Treads</p>
                <p className="text-base font-medium">
                  {orderData.materials.tread.quantity} pieces
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cut Size</p>
                <p className="text-base font-medium">
                  {orderData.materials.tread.cut_size}"
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Material ID</p>
                <p className="text-base font-medium">
                  #{orderData.materials.tread.material_id}
                </p>
              </div>
            </div>

            {/* Stringers */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Stringers</p>
                <p className="text-base font-medium">
                  {orderData.materials.stringer.quantity} pieces
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Length</p>
                <p className="text-base font-medium">
                  {orderData.materials.stringer.cut_size}"
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Material ID</p>
                <p className="text-base font-medium">
                  #{orderData.materials.stringer.material_id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
