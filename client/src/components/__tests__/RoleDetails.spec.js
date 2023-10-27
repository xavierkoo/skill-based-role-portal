import { describe, it, expect } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { mount } from '@vue/test-utils'
import RoleDetails from '../RoleDetails.vue'

const staffDetailsForStaff = [
  {
    f_name: 'AH GAO',
    l_email: 'TAN',
    email: 'tan_ah_gao@all-in-one.com.sg',
    biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
    sys_role: 'staff',
    dept: 'FINANCE',
    staff_id: 123456789,
    phone: '65-1234-5678'
  }
]

const staffSkillsForStaff = [
  {
    staff_id: 123456789,
    skill_id: 345678790,
    ss_status: 'active',
    skill_name: 'Certified Scrum Professional'
  },
  {
    staff_id: 123456789,
    skill_id: 345678866,
    ss_status: 'active',
    skill_name: 'Certified Scrum Developer'
  },
  {
    staff_id: 123456789,
    skill_id: 345678890,
    ss_status: 'unverified',
    skill_name: 'Certified Scrum@Scale Practitioner'
  },
  {
    staff_id: 123456789,
    skill_id: 345678913,
    ss_status: 'active',
    skill_name: 'Python Programming'
  },
  {
    staff_id: 123456789,
    skill_id: 345678927,
    ss_status: 'in-progress',
    skill_name: 'Certified Scrum Coach'
  },
  {
    staff_id: 123456789,
    skill_id: 345678935,
    ss_status: 'in-progress',
    skill_name: 'Certified Scrum Trainer'
  }
]

const staffDetailsForHR = [
  {
    f_name: 'VINCENT REX',
    l_name: 'COLINS',
    email: 'colins_vincent_rex@all-in-one.com.sg',
    biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
    sys_role: 'hr',
    dept: 'HUMAN RESOURCE AND ADMIN',
    staff_id: 123456788,
    phone: '65-1234-5679'
  }
]

const staffSkillsForHR = [
  {
    staff_id: 123456788,
    skill_id: 345678935,
    skill_name: 'Certified Scrum Trainer',
    skill_status: 'active'
  },
  {
    staff_id: 123456788,
    skill_id: 345678927,
    skill_name: 'Certified Scrum Coach',
    skill_status: 'active'
  }
]

const roleDetailsProps = {
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
  role_listing_updater: ['Updater Rex', 'colins_vincent_rex@all-in-one.com.sg']
}

//test if all the required props appear
describe('RoleDetails', () => {
  it('Verify the workflow of viewing detailed information for open roles (staff)', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    const roleDetails = roleDetailsProps
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#CalculateRoleMatch').exists()).toBe(true)
    expect(wrapper.find('#posted_on').exists()).toBe(true)
    expect(wrapper.find('#closed_on').exists()).toBe(true)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.find('#responsibilities').exists()).toBe(true)
    expect(wrapper.find('#descLabel').exists()).toBe(true)
    expect(wrapper.find('#apply_btn').exists()).toBe(true)
    expect(wrapper.find('#role_name').text()).toContain(roleDetails.role_name)
    expect(wrapper.find('#desc').text()).toContain(roleDetails.role_listing_desc)
    expect(wrapper.find('#open').text()).toContain(roleDetails.role_listing_open)
    expect(wrapper.find('#close').text()).toContain(roleDetails.role_listing_close)
    expect(wrapper.find('.isPosted').text()).toContain('Posted By')
    expect(wrapper.find('#creatorUpdater').text()).toContain(roleDetails.role_listing_creator[0])
    expect(wrapper.text()).toContain('Pascal Programming')
    expect(wrapper.text()).toContain('Python Programming')
    expect(wrapper.find('.showMore').exists()).toBe(true)
    mock.restore()
  })

  it('Verify the workflow of viewing detailed information for open roles (hr)', async () => {
    localStorage.setItem('id', 123456788)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: staffDetailsForHR
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456788').reply(200, {
      Results: staffSkillsForHR
    })
    const roleDetails = roleDetailsProps
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#CalculateRoleMatch').exists()).toBe(true)
    expect(wrapper.find('#posted_on').exists()).toBe(true)
    expect(wrapper.find('#closed_on').exists()).toBe(true)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.find('#responsibilities').exists()).toBe(true)
    expect(wrapper.find('#descLabel').exists()).toBe(true)
    expect(wrapper.find('#apply_btn').exists()).toBe(true)
    expect(wrapper.find('#update_btn').exists()).toBe(true)
    expect(wrapper.find('#role_name').text()).toContain(roleDetails.role_name)
    expect(wrapper.find('#desc').text()).toContain(roleDetails.role_listing_desc)
    expect(wrapper.find('#open').text()).toContain(roleDetails.role_listing_open)
    expect(wrapper.find('#close').text()).toContain(roleDetails.role_listing_close)
    expect(wrapper.find('.isPosted').text()).toContain('Updated By')
    expect(wrapper.find('#creatorUpdater').text()).toContain(roleDetails.role_listing_updater[0])
    expect(wrapper.text()).toContain('Pascal Programming')
    expect(wrapper.text()).toContain('Python Programming')
    expect(wrapper.find('.showMore').exists()).toBe(true)
    mock.restore()
  })

  it('Verify the successful display of more skills when selected role have more than two skills', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    const roleDetails = roleDetailsProps
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

  it('Checks how the system handles the scenario when role does not have certain information', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    const roleDetails = {
      role_name: '',
      role_listing_desc: '',
      role_listing_open: '',
      role_listing_close: '',
      role_skills: [],
      role_listing_creator: [],
      role_listing_updater: []
    }
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(wrapper.find('#role_name').text()).toContain('TBC')
    expect(wrapper.find('#desc').text()).toContain('TBC')
    expect(wrapper.find('#open').text()).toContain('TBC')
    expect(wrapper.find('#close').text()).toContain('TBC')
    expect(wrapper.find('#creatorUpdater').text()).toContain('TBC')
    expect(wrapper.find('#noSkills').text()).toContain('No skills required')
    mock.restore()
  })

  it('Check how the system handles the scenario when user has already applied for the role', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    const roleDetails = roleDetailsProps
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    wrapper.vm.applied = true
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(wrapper.find('#apply_btn').attributes('disabled')).exist
    expect(wrapper.find('#applyText').text()).toContain('Applied')
    mock.restore()
  })

  it('Check the standard items in Role Details (staff)', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    const roleDetails = roleDetailsProps
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#CalculateRoleMatch').exists()).toBe(true)
    expect(wrapper.find('#posted_on').exists()).toBe(true)
    expect(wrapper.find('#closed_on').exists()).toBe(true)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.find('#responsibilities').exists()).toBe(true)
    expect(wrapper.find('#descLabel').exists()).toBe(true)
    expect(wrapper.find('#apply_btn').exists()).toBe(true)
    mock.restore()
  })

  it('Check the standard items in Role Details (hr)', async () => {
    localStorage.setItem('id', 123456788)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456788').reply(200, {
      Results: staffDetailsForHR
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456788').reply(200, {
      Results: staffSkillsForHR
    })
    const roleDetails = roleDetailsProps
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#CalculateRoleMatch').exists()).toBe(true)
    expect(wrapper.find('#posted_on').exists()).toBe(true)
    expect(wrapper.find('#closed_on').exists()).toBe(true)
    expect(wrapper.find('#skills').exists()).toBe(true)
    expect(wrapper.find('#responsibilities').exists()).toBe(true)
    expect(wrapper.find('#descLabel').exists()).toBe(true)
    expect(wrapper.find('#apply_btn').exists()).toBe(true)
    expect(wrapper.find('#update_btn').exists()).toBe(true)
    mock.restore()
  })

  it('Verifies how the system handles viewing details of a role with exceptionally long descriptions', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    //props for negative testing
    const roleDetails = {
      role_name: 'Head, Talent Attraction',
      role_listing_desc:
        "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team. Extreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONG",
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
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(wrapper.find('#desc').text()).toContain(
      "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team. Extreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONGExtreme LONG"
    )
    mock.restore()
  })

  it('Verifies how the system handles viewing details of a role with more than two skills', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    const roleDetails = roleDetailsProps
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

  it('Verifies how the system handles viewing details of a role with two skills or less', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    const roleDetails = {
      role_name: 'Head, Talent Attraction',
      role_listing_desc:
        "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.",
      role_listing_open: '10/11/2023',
      role_listing_close: '24/11/2023',
      role_skills: ['Pascal Programming', 'Python Programming'],
      role_listing_creator: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg'],
      role_listing_updater: ['Vincent Rex', 'colins_vincent_rex@all-in-one.com.sg']
    }
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    expect(wrapper.text()).contains('Pascal Programming')
    expect(wrapper.text()).contains('Python Programming')
    // Ensure "Show More" link disappears
    expect(wrapper.find('.showMore').exists()).toBe(false)
  })

  it("Visualize the workflow for viewing the alignment between open roles and the staff member's skill set", async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    const roleDetails = roleDetailsProps
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1))

    expect(wrapper.find('#CalculateRoleMatch').exists()).toBe(true)
    expect(wrapper.text()).toContain('% match')
    mock.restore()
  })

  it("Verify the successful display of compatibility for the role based on the staff member's skills and the required skills for each role.", async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    const roleDetails = roleDetailsProps
    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    wrapper.vm.staffSkills = ['Python Programming', 'Pascal Programming']
    await new Promise((resolve) => setTimeout(resolve, 1))

    const bgSuccessElements = wrapper.findAll('.bg-success')
    expect(bgSuccessElements.some((el) => el.text() === 'Python Programming')).toBeTruthy()
    expect(bgSuccessElements.some((el) => el.text() === 'Pascal Programming')).toBeTruthy()
    expect(wrapper.find('#CalculateRoleMatch').text()).toContain('25')

    mock.restore()
  })

  it('Check the standard items in the compatibility display', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
    const roleDetails = roleDetailsProps

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    wrapper.vm.staffSkills = ['Python Programming', 'Pascal Programming']
    await new Promise((resolve) => setTimeout(resolve, 1))

    const bgSuccessElements = wrapper.findAll('.bg-success')
    expect(bgSuccessElements.some((el) => el.text() === 'Python Programming')).toBeTruthy()
    expect(bgSuccessElements.some((el) => el.text() === 'Pascal Programming')).toBeTruthy()
    expect(wrapper.find('#CalculateRoleMatch').text()).toContain('25')
    expect(wrapper.html()).toContain('% match')
  })

  it('Verify how the system handles a negative scenario when selected role does not require any skill', async () => {
    localStorage.setItem('id', 123456789)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456789').reply(200, {
      Results: staffDetailsForStaff
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456789').reply(200, {
      Results: staffSkillsForStaff
    })
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
    wrapper.vm.staffSkills = ['Python Programming', 'Pascal Programming']
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#CalculateRoleMatch').text()).toContain('100')
    expect(wrapper.html()).toContain('% match')
  })

  it('Verifies how the system handles role skill matching when user have no skills', async () => {
    //user with no skills
    localStorage.setItem('id', 123456781)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456781').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'staff',
          dept: 'FINANCE',
          staff_id: 123456781,
          phone: '65-1234-5678'
        }
      ]
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456781').reply(200, {
      Results: []
    })
    const roleDetails = roleDetailsProps

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    wrapper.vm.staffSkills = []
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#CalculateRoleMatch').text()).toContain('0')
    expect(wrapper.html()).toContain('% match')
  })

  it('Verifies how the system handles role skill matching when user have no skills', async () => {
    //user with no skills
    localStorage.setItem('id', 123456781)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/staffdetails/123456781').reply(200, {
      Results: [
        {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'staff',
          dept: 'FINANCE',
          staff_id: 123456781,
          phone: '65-1234-5678'
        }
      ]
    })
    mock.onGet('http://localhost:8080/api/v1/staffskills/123456781').reply(200, {
      Results: []
    })
    const roleDetails = roleDetailsProps

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    wrapper.vm.staffSkills = ['Python Programming']
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#CalculateRoleMatch').text()).toBe('0 % match')
  })
})
