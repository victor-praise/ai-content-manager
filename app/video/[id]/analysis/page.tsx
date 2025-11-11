import Usage from '@/components/Usage'
import { FeatureFlag } from '@/features/flags'
import React from 'react'

function AnalysisPage() {
  return (
    <div className='xl:container mx-auto px-4 md:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r border-gray-200 p-6'>
            <div className='flex flex-col gap-4 border border-gray-200 rounded-xl'>
                <Usage featureFlag={FeatureFlag.ANALYSE_VIDEO} title='Analyse Video' />
            </div>
        </div>


        <div className='order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]'></div>
        </div>
    </div>
  )
}

export default AnalysisPage