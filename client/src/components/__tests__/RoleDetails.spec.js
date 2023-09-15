import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RoleDetails from '../RoleDetails.vue'

//test if all the required props appear
describe('RoleDetails', () => {
  it('renders properly', () => {
    const roleDetails = {
      roleName: 'Head, Talent Attraction',
      description:
        "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans.The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.",
      postedOn: '10/11/2023',
      deadLine: '24/11/2023',
      skills: ['Pascal Programming', 'Python Programming', 'Certified Scrum Master'],
      creator: {
        name: 'Vincent Rex',
        email: 'colins_vincent_rex@all-in-one.com.sg',
        dept: 'HUMAN RESOURCE AND ADMIN'
      }
    }

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })
    expect(wrapper.text()).toContain(roleDetails.roleName)
    expect(wrapper.text()).toContain(roleDetails.description)
    expect(wrapper.text()).toContain(roleDetails.postedOn)
    expect(wrapper.text()).toContain(roleDetails.deadLine)
    expect(wrapper.text()).toContain(roleDetails.creator.name)
  })

  //test if more skills appear when "show more" button is clicked
  it('displays more skills when "Show More" is clicked', async () => {
    const roleDetails = {
      roleName: 'Head, Talent Attraction',
      description: 'The description',
      postedOn: '10/11/2023',
      deadLine: '24/11/2023',
      skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'],
      creator: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        dept: 'Engineering'
      }
    }

    const wrapper = mount(RoleDetails, {
      props: {
        roleDetails: roleDetails
      }
    })

    // Click "Show More" link
    await wrapper.find('.showMore').trigger('click')

    // Check if additional skills are displayed
    expect(wrapper.text()).toContain(roleDetails.skills[2])
    expect(wrapper.text()).toContain(roleDetails.skills[3])
  })

  //test if show more button appears if number of skills is too long for all to be shown
  it('displays "Show More" link when skills overflow', async () => {
    const roleDetails = {
      roleName: 'Head, Talent Attraction',
      description: 'The description',
      postedOn: '10/11/2023',
      deadLine: '24/11/2023',
      skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'],
      creator: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        dept: 'Engineering'
      }
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
        roleDetails: {
          roleName: '',
          description: '',
          postedOn: '',
          deadLine: '',
          skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'],
          creator: {
            name: '',
            email: '',
            dept: ''
          }
        }
      }
    })

    // Check if default values are displayed
    expect(wrapper.find('.check').text()).toBe('TBC')
    expect(wrapper.find('.description').text()).toBe('No description available')
  })
})
