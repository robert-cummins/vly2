import { Tabs } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import MemberSection from '../Member/MemberSection'
import { ProfilePanel } from '../VTheme/Profile'
import { OrgAboutPanel } from './OrgAboutPanel'
import Html from '../VTheme/Html'
import VTabs from '../VTheme/VTabs'
import { OrgHistoryPanel } from './OrgHistoryPanel'
import { OrgOffersPanel } from './OrgOffersPanel'
import { orgTab, orgMemberTab, orgInstructionTab, orgOffersTab, orgEditTab, orgHistoryTab } from './OrgTabs.messages'
import { OrganisationRole } from '../../server/api/organisation/organisation.constants'

const { TabPane } = Tabs

// Warning do not try to group tabs under an isFlag TabPanes must be direct Children of Tabs.
export const OrgTabs = ({
  org,
  onChange,
  canManage,
  defaultTab,
  isAuthenticated
}) => (
  <VTabs defaultActiveKey={defaultTab} onChange={onChange}>
    <TabPane tab={orgTab} key='about' orgTab='about'>
      <OrgAboutPanel org={org} />
    </TabPane>
    <TabPane tab={orgOffersTab} key='offers' orgTab='offers'>
      {/* // TODO: [VP-554] move the OpList for this org from the parent page to a tab  */}
      <OrgOffersPanel organisationId={org._id} />
    </TabPane>
    {org.role.includes(OrganisationRole.OPPORTUNITY_PROVIDER) && (
      <TabPane tab={orgHistoryTab} key='history' orgTab='history'>
        <OrgHistoryPanel organisationId={org._id} />
      </TabPane>
    )}
    {isAuthenticated && (
      <TabPane tab={orgInstructionTab} key='instructions' orgTab='instructions'>
        <ProfilePanel>
          <Html>
            {(org.info && org.info.instructions) || ''}
          </Html>
        </ProfilePanel>
      </TabPane>)}
    {isAuthenticated && (
      <TabPane tab={orgMemberTab} key='members' orgTab='members'>
        <MemberSection org={org} />
      </TabPane>)}

    {canManage && (
      <TabPane tab={orgEditTab} key='edit' orgTab='edit' />
    )}

  </VTabs>
)

OrgTabs.propTypes = {
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
    info: PropTypes.shape({
      about: PropTypes.string,
      followers: PropTypes.string,
      joiners: PropTypes.string,
      members: PropTypes.string,
      outsiders: PropTypes.string
    }),
    role: PropTypes.arrayOf(
      PropTypes.oneOf([OrganisationRole.ADMIN, OrganisationRole.OPPORTUNITY_PROVIDER, OrganisationRole.VOLUNTEER_PROVIDER, OrganisationRole.ACTIVITY_PROVIDER, 'other'])
    ).isRequired,
    imgUrl: PropTypes.string,
    website: PropTypes.string,
    contactEmail: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string
  }).isRequired
}

export default OrgTabs
