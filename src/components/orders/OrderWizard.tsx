import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import OrderBasicInfo from './steps/OrderBasicInfo';
import RiserSelection from './steps/RiserSelection';
import TreadSelection from './steps/TreadSelection';
import DimensionsStep from './steps/DimensionsStep';
import StringerSelection from './steps/StringerSelection';
import ReviewStep from './steps/ReviewStep';

const steps = [
  { id: 'basic', title: 'Basic Information' },
  { id: 'risers', title: 'Riser Selection' },
  { id: 'treads', title: 'Tread Selection' },
  { id: 'dimensions', title: 'Dimensions' },
  { id: 'stringers', title: 'Stringer Selection' },
  { id: 'review', title: 'Review & Submit' }
];

const OrderWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderData, setOrderData] = useState({
    basicInfo: {
      customer_id: '',
      shop_date: '',
      job_address: '',
      delivery_date: '',
      order_status: 'pending'
    },
    calculations: {
      riserQuantity: 0,
      stepWidth: 0,
      riserCutSize: 0,
      stringerLength: 0
    },
    materials: {
      riser: { material_id: 0, quantity: 0, cut_size: 0 },
      tread: { material_id: 0, quantity: 0, cut_size: 0 },
      stringer: { material_id: 0, quantity: 0, cut_size: 0 }
    }
  });

  const updateOrderData = (key: string, value: any) => {
    setOrderData(prev => ({
      ...prev,
      [key]: { ...prev[key], ...value }
    }));
  };

  const calculateDimensions = (width: number) => {
    const riserCutSize = width - 1.25;
    const stringerLength = orderData.calculations.riserQuantity * 12; // 1 foot per riser

    updateOrderData('calculations', {
      stepWidth: width,
      riserCutSize,
      stringerLength
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OrderBasicInfo 
          data={orderData.basicInfo} 
          onUpdate={(data) => updateOrderData('basicInfo', data)} 
        />;
      case 1:
        return <RiserSelection 
          data={orderData.materials.riser}
          riserQuantity={orderData.calculations.riserQuantity}
          onUpdate={(data) => {
            updateOrderData('materials', { riser: data });
            updateOrderData('calculations', { riserQuantity: data.quantity });
          }}
        />;
      case 2:
        return <TreadSelection 
          data={orderData.materials.tread}
          quantity={orderData.calculations.riserQuantity}
          onUpdate={(data) => updateOrderData('materials', { tread: data })}
        />;
      case 3:
        return <DimensionsStep 
          onUpdate={calculateDimensions}
        />;
      case 4:
        return <StringerSelection 
          data={orderData.materials.stringer}
          stringerLength={orderData.calculations.stringerLength}
          onUpdate={(data) => updateOrderData('materials', { stringer: data })}
        />;
      case 5:
        return <ReviewStep 
          orderData={orderData}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Progress Steps */}
      <div className="px-10 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {index + 1}
              </div>
              <div className="ml-3 hidden md:block">
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 mx-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="px-10 py-8">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="px-10 py-6 bg-gray-50 border-t border-gray-200 rounded-b-xl">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg 
              hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                // Submit order
              } else {
                setCurrentStep(prev => prev + 1);
              }
            }}
            className="px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent 
              rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 flex items-center gap-2"
          >
            {currentStep === steps.length - 1 ? 'Submit Order' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderWizard;
