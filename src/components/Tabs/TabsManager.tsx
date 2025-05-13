import React from 'react'
import { TabsData } from '@/core/domain/Entities'
import { TabNavigation } from '@/core/components/molecules'
import {Tab, TabPane, TabContainer as BootstrapTabContainer} from 'react-bootstrap'
import { TABS_CONTAINER, TABS_NAVIGATION } from '@/core/utils'

const TabsManager: React.FC = () => {
  return (
    <BootstrapTabContainer defaultActiveKey='1'>
      <TabNavigation tabs={TABS_NAVIGATION} />
      <Tab.Content className='p-3 border border-top-0'>
        {TABS_NAVIGATION.map((tab: TabsData) => (
          <TabPane key={tab.id} eventKey={tab.id}>
            {TABS_CONTAINER.find((item) => item.key === tab.id.toString())?.content}
          </TabPane>
        ))}
      </Tab.Content>
    </BootstrapTabContainer>
  )
}

export default TabsManager