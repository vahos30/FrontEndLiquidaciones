import React from 'react'
import { TabsData } from '@/core/domain/Entities'
import { TabNavigation } from '@/core/components/molecules'
import {Tab, TabPane, TabContainer as BootstrapTabContainer} from 'react-bootstrap'
import { TABS_CONTAINER_ROYALITIES_ANH, TABS_ROYALTIES_ANH } from '@/core/utils'

const RoyaltiesANH: React.FC = () => {
  return (
    <BootstrapTabContainer defaultActiveKey='1'>
      <TabNavigation tabs={TABS_ROYALTIES_ANH} justify='center' />
      <Tab.Content className='p-3 border border-top-0'>
        {TABS_ROYALTIES_ANH.map((tab: TabsData) => (
          <TabPane key={tab.id} eventKey={tab.id}>
            {TABS_CONTAINER_ROYALITIES_ANH.find((item) => item.key === tab.id.toString())?.content}
          </TabPane>
        ))}
      </Tab.Content>
    </BootstrapTabContainer>
  )
}

export default RoyaltiesANH