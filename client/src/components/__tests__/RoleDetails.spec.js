import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RoleDetails from '../RoleDetails.vue'

//test if all the required props appear
describe('RoleDetails', () => {
  it("Visualize the workflow for viewing the alignment between open roles and the staff member's skill set.", async () => {
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
    wrapper.vm.staffSkills = ['Pascal Programming']
    wrapper.vm.user = ''
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#CalculateRoleMatch').exists()).toBe(true)
    expect(wrapper.text()).toContain('Posted On')
    expect(wrapper.text()).toContain('Deadline')
    expect(wrapper.text()).toContain('Skills')
    expect(wrapper.text()).toContain('Responsibilities')
    expect(wrapper.text()).toContain('About the job')
    expect(wrapper.text()).toContain(roleDetails.role_name)
    expect(wrapper.text()).toContain(roleDetails.role_listing_desc)
    expect(wrapper.text()).toContain(roleDetails.role_listing_open)
    expect(wrapper.text()).toContain(roleDetails.role_listing_close)
    expect(wrapper.text()).toContain(roleDetails.role_listing_creator[0])
    expect(wrapper.text()).toContain('Apply')
  })

  it("Verify the successful display of compatibility for the role based on the staff member's skills and the required skills for each role.", async () => {
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
    wrapper.vm.user = 'HR'
    wrapper.vm.staffSkills = ['Pascal Programming']
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#update_btn').exists()).toBe(true)
    expect(wrapper.find('.bg-success').text()).toContain('Pascal Programming')
    expect(wrapper.find('.bg-secondary').text()).toContain('Python Programming')
    expect(wrapper.text()).toContain(roleDetails.role_name)
    expect(wrapper.text()).toContain(roleDetails.role_listing_desc)
    expect(wrapper.text()).toContain(roleDetails.role_listing_open)
    expect(wrapper.text()).toContain(roleDetails.role_listing_close)
    expect(wrapper.text()).toContain(roleDetails.role_listing_creator[0])
  })

  it('Check the standard items in the compatibility display.', async () => {
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
    wrapper.vm.staffSkills = ['Pascal Programming']
    wrapper.vm.user = 'HR'
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#update_btn').exists()).toBe(true)
    expect(wrapper.find('#CalculateRoleMatch').exists()).toBe(true)
    expect(wrapper.text()).toContain('Posted On')
    expect(wrapper.text()).toContain('Deadline')
    expect(wrapper.text()).toContain('Skills')
    expect(wrapper.text()).toContain('Responsibilities')
    expect(wrapper.text()).toContain('About the job')
    expect(wrapper.text()).toContain('Apply')
    const submit = wrapper.find('#apply_btn')
    await submit.trigger('click')
    const toggle = submit.attributes('data-bs-target')
    expect(toggle).toBe('#applicationModal')
  })

  it("Verify the system's behavior when the number of skills required ", async () => {
    const roleDetails = {
      role_name: 'Head, Talent Attraction',
      role_listing_desc:
        "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.",
      role_listing_open: '10/11/2023',
      role_listing_close: '24/11/2023',
      role_skills: [],
      role_listing_creator: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg'],
      role_listing_updater: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg']
    }

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    wrapper.vm.staffSkills = ['Pascal Programming']
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.text()).toContain('No skills required')
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
  it('Verify how the system handles a negative scenario when the staff member is on the "Role Details" page when the details are passed in incorrectly', async () => {
    const roleDetails = {
      role_name: '',
      role_listing_desc: '',
      role_listing_open: '',
      role_listing_close: '',
      role_skills: [],
      role_listing_creator: ['', ''],
      role_listing_updater: ['', ''],
      role_listing_id: '',
      role_id: ''
    }
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 1))
    // Check if default values are displayed
    expect(wrapper.find('#error_prop').exists()).toBe(true)
  })
})
