import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RoleDetails from '../RoleDetails.vue'

//test if all the required props appear
describe('RoleDetails', () => {
  it('renders properly', () => {
    const roleDetails = {
      role_name: 'Head, Talent Attraction',
      role_listing_desc:
        "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.",
      role_listing_open: '10/11/2023',
      role_listing_close: '24/11/2023',
      role_skills: [
        'Pascal Programming',
        'Python Programming',
        'Certified Scrum Master',
        'Product Owner'
      ],
      role_listing_creator: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg'],
      role_listing_updater: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg']
    }

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    expect(wrapper.text()).toContain(roleDetails.role_name)
    expect(wrapper.text()).toContain(roleDetails.role_listing_desc)
    expect(wrapper.text()).toContain(roleDetails.role_listing_open)
    expect(wrapper.text()).toContain(roleDetails.role_listing_close)
    expect(wrapper.text()).toContain(roleDetails.role_listing_creator[0])
  })

  //test if more skills appear when "show more" button is clicked
  it('displays more skills when "Show More" is clicked', async () => {
    const roleDetails = {
      role_name: 'Head, Talent Attraction',
      role_listing_desc:
        "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.",
      role_listing_open: '10/11/2023',
      role_listing_close: '24/11/2023',
      role_skills: [
        'Pascal Programming',
        'Python Programming',
        'Certified Scrum Master',
        'Product Owner'
      ],
      role_listing_creator: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg'],
      role_listing_updater: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg']
    }

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    // Click "Show More" link
    await wrapper.find('.showMore').trigger('click')

    // Check if additional skills are displayed
    expect(wrapper.text()).toContain(roleDetails.role_skills[2])
    expect(wrapper.text()).toContain(roleDetails.role_skills[3])
  })

  //test if show more button appears if number of skills is too long for all to be shown
  it('displays "Show More" link when skills overflow', async () => {
    const roleDetails = {
      role_name: 'Head, Talent Attraction',
      role_listing_desc:
        "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.",
      role_listing_open: '10/11/2023',
      role_listing_close: '24/11/2023',
      role_skills: [
        'Pascal Programming',
        'Python Programming',
        'Certified Scrum Master',
        'Product Owner'
      ],
      role_listing_creator: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg'],
      role_listing_updater: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg']
    }

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    // Ensure "Show More" link is initially present
    expect(wrapper.text()).toContain('+ 2 more')

    // Click "Show More" link
    await wrapper.find('.showMore').trigger('click')

    // Ensure "Show More" link disappears
    expect(wrapper.text()).not.toContain('+ 2 more')
  })

  //test if default value appear if fields are missing
  it('handles empty/missing roleDetails properties gracefully', () => {
    const wrapper = mount(RoleDetails, {
      props: {
        role_name: '',
        role_listing_desc: '',
        role_listing_open: '',
        role_listing_close: '',
        role_skills: [
          'Pascal Programming',
          'Python Programming',
          'Certified Scrum Master',
          'Product Owner'
        ],
        role_listing_creator: ['', ''],
        role_listing_updater: ['', '']
      }
    })

    // Check if default values are displayed
    expect(wrapper.find('.check').text()).toBe('TBC')
    expect(wrapper.find('.description').text()).toBe('No description available')
  })

  //test if posted by is replace by updated by if updater is not empty
  it('displays "Updated By" when updater information is provided', () => {
    const roleDetails = {
      role_name: 'Head, Talent Attraction',
      role_listing_desc:
        "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.",
      role_listing_open: '10/11/2023',
      role_listing_close: '24/11/2023',
      role_skills: [
        'Pascal Programming',
        'Python Programming',
        'Certified Scrum Master',
        'Product Owner'
      ],
      role_listing_creator: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg'],
      role_listing_updater: ['Updated Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg']
    }

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    // Check if "Updated By" is displayed
    expect(wrapper.find('.isPosted').text()).toContain('Updated By:')
    expect(wrapper.find('.isCreated').text()).toBe('Updated Vincent Rex')
  })
})
