import React from 'react'
import test from 'ava'
import { OpListPage } from '../../pages/op/oplistpage'
import { shallowWithIntl } from '../../lib/react-intl-test-helper'
import ops from '../../server/api/opportunity/__tests__/opportunity.fixture'
import objectid from 'objectid'

test.before('Setup fixtures', (t) => {
  // not using mongo or server here so faking ids
  ops.map(p => { p._id = objectid().toString() })
  t.context.props = {
    opportunities: {
      sync: true,
      syncing: false,
      loading: false,
      data: ops,
      request: null
    }
  }
})

test('render OpList', async t => {
  // first test GetInitialProps
  const store = {
    dispatch: (ACTION) => {
      return Promise.resolve(t.context.props)
    }
  }
  const props = await OpListPage.getInitialProps({ store })
  const wrapper = shallowWithIntl(<OpListPage {...props} />)
  t.is(wrapper.find('h1 FormattedMessage').first().props().id, 'oplistpage.title')
  t.truthy(wrapper.find('Button'))
  t.truthy(wrapper.find('OpList'))
})

test('render OpList with dispatch error', async t => {
  t.plan(1)
  // first test GetInitialProps
  const store = {
    dispatch: (ACTION) => {
      throw Error('Catch This!')
    }
  }
  await t.throwsAsync(async () => {
    await OpListPage.getInitialProps({ store })
  }, { message: 'Catch This!' })
})
