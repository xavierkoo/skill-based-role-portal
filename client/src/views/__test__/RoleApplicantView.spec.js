import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RoleApplicant from '../RoleApplicantView.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockData = [
  {
    role_listing_creator: 123456788,
    role_listing_source: 123456788,
    role_id: 234567893,
    role_listing_desc:
      'The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.',
    role_listing_close: '2023-10-18',
    role_listing_ts_update: '2023-10-21T05:47:36',
    role_listing_id: 1,
    role_listing_updater: 123456788,
    role_listing_open: '2023-10-01',
    role_listing_ts_create: '2023-10-21T05:47:36',
    role_name: 'Agile Coach (SM)',
    role_skills: ['Certified Scrum Trainer'],
    no_of_applicant: 5,
    role_applicants: [
      {
        staff_id: 123456789,
        role_listing_id: 1,
        role_app_reason: '1 I want to apply for this role because I am interested in it.',
        role_app_id: 1,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'manager',
          dept: 'FINANCE',
          staff_id: 123456789,
          phone: '65-1234-5678',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456789,
              ss_status: 'unverified',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678913,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456789,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456789,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456788,
        role_listing_id: 1,
        role_app_reason: '1 I want to apply for this role because I am interested in it.',
        role_app_id: 4,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'VINCENT REX',
          l_email: 'COLINS',
          email: 'colins_vincent_rex@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'HUMAN RESOURCE AND ADMIN',
          staff_id: 123456788,
          phone: '65-1234-5679',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678912,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Pascal Programming'
            },
            {
              skill_id: 345678913,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456787,
        role_listing_id: 1,
        role_app_reason: '1 I want to apply for this role because I am interested in it.',
        role_app_id: 5,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'FAUD',
          l_email: 'NIZAM',
          email: 'faud_nizam@all-in-one.com.sg',
          biz_address:
            'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia',
          sys_role: 'manager',
          dept: 'SALES',
          staff_id: 123456787,
          phone: '60-03-21345678',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678913,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456786,
        role_listing_id: 1,
        role_app_reason: '1 I want to apply for this role because I am interested in it.',
        role_app_id: 6,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'JOHN',
          l_email: 'DOE',
          email: 'John_doe@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'inactive',
          dept: 'IT',
          staff_id: 123456786,
          phone: '65-5824-7888',
          staff_skills: []
        }
      },
      {
        staff_id: 123456123,
        role_listing_id: 1,
        role_app_reason: '1 I want to apply for this role because I am interested in it.',
        role_app_id: 7,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'ROOT',
          l_email: 'ADMIN SECOND',
          email: 'rootme2@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'staff',
          dept: 'IT',
          staff_id: 123456123,
          phone: '65-5824-7888',
          staff_skills: []
        }
      },
      {
        staff_id: 1,
        role_listing_id: 1,
        role_app_reason: '1 I want to apply for this role because I am interested in it.',
        role_app_id: 8,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'ROOT',
          l_email: 'ADMIN',
          email: 'rootme@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'staff',
          dept: 'IT',
          staff_id: 1,
          phone: '65-5824-7888',
          staff_skills: []
        }
      }
    ]
  },
  {
    role_listing_creator: 123456788,
    role_listing_source: 123456788,
    role_id: 234567892,
    role_listing_desc:
      'The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials.He is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders. He works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.',
    role_listing_close: '2023-10-19',
    role_listing_ts_update: '2023-10-21T05:47:36',
    role_listing_id: 2,
    role_listing_updater: 123456788,
    role_listing_open: '2023-10-01',
    role_listing_ts_create: '2023-10-21T05:47:36',
    role_name: 'Learning Facilitator / Trainer',
    role_skills: ['Pascal Programming', 'Python Programming'],
    no_of_applicant: 6,
    role_applicants: [
      {
        staff_id: 123456789,
        role_listing_id: 2,
        role_app_reason: "2 I want to apply for this role because I don't know what it is.",
        role_app_id: 2,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'manager',
          dept: 'FINANCE',
          staff_id: 123456789,
          phone: '65-1234-5678',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456789,
              ss_status: 'unverified',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678913,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456789,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456789,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456788,
        role_listing_id: 2,
        role_app_reason: '2I want to apply for this role because I am interested in it.',
        role_app_id: 9,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'VINCENT REX',
          l_email: 'COLINS',
          email: 'colins_vincent_rex@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'HUMAN RESOURCE AND ADMIN',
          staff_id: 123456788,
          phone: '65-1234-5679',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678912,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Pascal Programming'
            },
            {
              skill_id: 345678913,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456787,
        role_listing_id: 2,
        role_app_reason: '2I want to apply for this role because I am interested in it.',
        role_app_id: 10,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'FAUD',
          l_email: 'NIZAM',
          email: 'faud_nizam@all-in-one.com.sg',
          biz_address:
            'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia',
          sys_role: 'manager',
          dept: 'SALES',
          staff_id: 123456787,
          phone: '60-03-21345678',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678913,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456786,
        role_listing_id: 2,
        role_app_reason: '2I want to apply for this role because I am interested in it.',
        role_app_id: 11,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'JOHN',
          l_email: 'DOE',
          email: 'John_doe@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'inactive',
          dept: 'IT',
          staff_id: 123456786,
          phone: '65-5824-7888',
          staff_skills: []
        }
      },
      {
        staff_id: 123456123,
        role_listing_id: 2,
        role_app_reason: '2I want to apply for this role because I am interested in it.',
        role_app_id: 12,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'ROOT',
          l_email: 'ADMIN SECOND',
          email: 'rootme2@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'staff',
          dept: 'IT',
          staff_id: 123456123,
          phone: '65-5824-7888',
          staff_skills: []
        }
      },
      {
        staff_id: 1,
        role_listing_id: 2,
        role_app_reason: '2I want to apply for this role because I am interested in it.',
        role_app_id: 13,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'ROOT',
          l_email: 'ADMIN',
          email: 'rootme@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'staff',
          dept: 'IT',
          staff_id: 1,
          phone: '65-5824-7888',
          staff_skills: []
        }
      }
    ]
  },
  {
    role_listing_creator: 123456789,
    role_listing_source: 123456789,
    role_id: 234567891,
    role_listing_desc:
      "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans. The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.",
    role_listing_close: '2023-10-31',
    role_listing_ts_update: '2023-10-21T05:47:36',
    role_listing_id: 3,
    role_listing_updater: 123456789,
    role_listing_open: '2023-9-01',
    role_listing_ts_create: '2023-10-21T05:47:36',
    role_name: 'Head, Talent Attraction',
    role_skills: [],
    no_of_applicant: 6,
    role_applicants: [
      {
        staff_id: 123456789,
        role_listing_id: 3,
        role_app_reason: '3 I want to apply for this role because I want to learn more about it.',
        role_app_id: 3,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'AH GAO',
          l_email: 'TAN',
          email: 'tan_ah_gao@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'manager',
          dept: 'FINANCE',
          staff_id: 123456789,
          phone: '65-1234-5678',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456789,
              ss_status: 'unverified',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678913,
              staff_id: 123456789,
              ss_status: 'active',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456789,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456789,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456788,
        role_listing_id: 3,
        role_app_reason: '3I want to apply for this role because I am interested in it.',
        role_app_id: 14,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'VINCENT REX',
          l_email: 'COLINS',
          email: 'colins_vincent_rex@all-in-one.com.sg',
          biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
          sys_role: 'hr',
          dept: 'HUMAN RESOURCE AND ADMIN',
          staff_id: 123456788,
          phone: '65-1234-5679',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678912,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Pascal Programming'
            },
            {
              skill_id: 345678913,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456788,
              ss_status: 'active',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456787,
        role_listing_id: 3,
        role_app_reason: '3I want to apply for this role because I am interested in it.',
        role_app_id: 15,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'FAUD',
          l_email: 'NIZAM',
          email: 'faud_nizam@all-in-one.com.sg',
          biz_address:
            'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia',
          sys_role: 'manager',
          dept: 'SALES',
          staff_id: 123456787,
          phone: '60-03-21345678',
          staff_skills: [
            {
              skill_id: 345678790,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Professional'
            },
            {
              skill_id: 345678866,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Developer'
            },
            {
              skill_id: 345678890,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum@Scale Practitioner'
            },
            {
              skill_id: 345678913,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Python Programming'
            },
            {
              skill_id: 345678927,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Coach'
            },
            {
              skill_id: 345678935,
              staff_id: 123456787,
              ss_status: 'in-progress',
              skill_name: 'Certified Scrum Trainer'
            }
          ]
        }
      },
      {
        staff_id: 123456786,
        role_listing_id: 3,
        role_app_reason: '3I want to apply for this role because I am interested in it.',
        role_app_id: 16,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'JOHN',
          l_email: 'DOE',
          email: 'John_doe@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'inactive',
          dept: 'IT',
          staff_id: 123456786,
          phone: '65-5824-7888',
          staff_skills: []
        }
      },
      {
        staff_id: 123456123,
        role_listing_id: 3,
        role_app_reason: '3I want to apply for this role because I am interested in it.',
        role_app_id: 17,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'ROOT',
          l_email: 'ADMIN SECOND',
          email: 'rootme2@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'staff',
          dept: 'IT',
          staff_id: 123456123,
          phone: '65-5824-7888',
          staff_skills: []
        }
      },
      {
        staff_id: 1,
        role_listing_id: 3,
        role_app_reason: '3I want to apply for this role because I am interested in it.',
        role_app_id: 18,
        role_app_status: 'applied',
        role_application_ts_create: '2023-10-21T05:47:36',
        staff_details: {
          f_name: 'ROOT',
          l_email: 'ADMIN',
          email: 'rootme@all-in-one.com.sg',
          biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
          sys_role: 'staff',
          dept: 'IT',
          staff_id: 1,
          phone: '65-5824-7888',
          staff_skills: []
        }
      }
    ]
  }
]
const roleDetails = {
  role_name: 'Learning Facilitator / Trainer',
  role_listing_desc:
    'The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials.He is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders. He works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.',
  role_listing_open: '2023-10-01',
  role_listing_close: '2023-10-19',
  role_skills: ['Certified Scrum@Scale Practitioner', 'Pascal Programming', 'Python Programming'],
  role_listing_creator: 123456788,
  role_listing_updater: 123456788,
  role_listing_id: 2,
  role_id: 234567892,
  role_applicants: [
    {
      staff_id: 123456788,
      role_listing_id: 2,
      role_app_reason: '2I want to apply for this role because I am interested in it.',
      role_app_id: 3,
      role_app_status: 'applied',
      role_application_ts_create: '2023-10-23T11:32:07',
      staff_details: {
        f_name: 'VINCENT REX',
        l_name: 'COLINS',
        email: 'colins_vincent_rex@all-in-one.com.sg',
        biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
        sys_role: 'hr',
        dept: 'HUMAN RESOURCE AND ADMIN',
        staff_id: 123456788,
        phone: '65-1234-5679',
        staff_skills: [
          {
            staff_id: 123456788,
            skill_id: 345678790,
            ss_status: 'active',
            skill_name: 'Certified Scrum Professional'
          },
          {
            staff_id: 123456788,
            skill_id: 345678866,
            ss_status: 'active',
            skill_name: 'Certified Scrum Developer'
          },
          {
            staff_id: 123456788,
            skill_id: 345678890,
            ss_status: 'active',
            skill_name: 'Certified Scrum@Scale Practitioner'
          },
          {
            staff_id: 123456788,
            skill_id: 345678912,
            ss_status: 'active',
            skill_name: 'Pascal Programming'
          },
          {
            staff_id: 123456788,
            skill_id: 345678913,
            ss_status: 'active',
            skill_name: 'Python Programming'
          },
          {
            staff_id: 123456788,
            skill_id: 345678927,
            ss_status: 'active',
            skill_name: 'Certified Scrum Coach'
          },
          {
            staff_id: 123456788,
            skill_id: 345678935,
            ss_status: 'active',
            skill_name: 'Certified Scrum Trainer'
          }
        ]
      },
      applied_date: '23/10/2023',
      missing_skills: [],
      active_skills: [
        'Certified Scrum@Scale Practitioner',
        'Pascal Programming',
        'Python Programming'
      ],
      in_progress_skills: [],
      role_match: 100
    },
    {
      staff_id: 123456789,
      role_listing_id: 2,
      role_app_reason: "2 I want to apply for this role because I don't know what it is.",
      role_app_id: 1,
      role_app_status: 'applied',
      role_application_ts_create: '2023-10-23T11:32:07',
      staff_details: {
        f_name: 'AH GAO',
        l_name: 'TAN',
        email: 'tan_ah_gao@all-in-one.com.sg',
        biz_address: '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051',
        sys_role: 'staff',
        dept: 'FINANCE',
        staff_id: 123456789,
        phone: '65-1234-5678',
        staff_skills: [
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
      },
      applied_date: '23/10/2023',
      missing_skills: ['Certified Scrum@Scale Practitioner', 'Pascal Programming'],
      active_skills: ['Python Programming'],
      in_progress_skills: [],
      role_match: 33
    },
    {
      staff_id: 123456787,
      role_listing_id: 2,
      role_app_reason: '2I want to apply for this role because I am interested in it.',
      role_app_id: 4,
      role_app_status: 'applied',
      role_application_ts_create: '2023-10-23T11:32:07',
      staff_details: {
        f_name: 'FAUD',
        l_name: 'NIZAM',
        email: 'faud_nizam@all-in-one.com.sg',
        biz_address:
          'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia',
        sys_role: 'manager',
        dept: 'SALES',
        staff_id: 123456787,
        phone: '60-03-21345678',
        staff_skills: [
          {
            staff_id: 123456787,
            skill_id: 345678790,
            ss_status: 'in-progress',
            skill_name: 'Certified Scrum Professional'
          },
          {
            staff_id: 123456787,
            skill_id: 345678866,
            ss_status: 'in-progress',
            skill_name: 'Certified Scrum Developer'
          },
          {
            staff_id: 123456787,
            skill_id: 345678890,
            ss_status: 'in-progress',
            skill_name: 'Certified Scrum@Scale Practitioner'
          },
          {
            staff_id: 123456787,
            skill_id: 345678913,
            ss_status: 'in-progress',
            skill_name: 'Python Programming'
          },
          {
            staff_id: 123456787,
            skill_id: 345678927,
            ss_status: 'in-progress',
            skill_name: 'Certified Scrum Coach'
          },
          {
            staff_id: 123456787,
            skill_id: 345678935,
            ss_status: 'in-progress',
            skill_name: 'Certified Scrum Trainer'
          }
        ]
      },
      applied_date: '23/10/2023',
      missing_skills: ['Pascal Programming'],
      active_skills: [],
      in_progress_skills: ['Certified Scrum@Scale Practitioner', 'Python Programming'],
      role_match: 33
    },
    {
      staff_id: 123456786,
      role_listing_id: 2,
      role_app_reason: '2I want to apply for this role because I am interested in it.',
      role_app_id: 5,
      role_app_status: 'applied',
      role_application_ts_create: '2023-10-23T11:32:07',
      staff_details: {
        f_name: 'JOHN',
        l_name: 'DOE',
        email: 'John_doe@all-in-one.com.sg',
        biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
        sys_role: 'inactive',
        dept: 'IT',
        staff_id: 123456786,
        phone: '65-5824-7888',
        staff_skills: []
      },
      applied_date: '23/10/2023',
      role_match: 0,
      missing_skills: [
        'Certified Scrum@Scale Practitioner',
        'Pascal Programming',
        'Python Programming'
      ],
      active_skills: [],
      in_progress_skills: []
    },
    {
      staff_id: 123456123,
      role_listing_id: 2,
      role_app_reason: '2I want to apply for this role because I am interested in it.',
      role_app_id: 6,
      role_app_status: 'applied',
      role_application_ts_create: '2023-10-23T11:32:07',
      staff_details: {
        f_name: 'ROOT',
        l_name: 'ADMIN SECOND',
        email: 'rootme2@all-in-one.com.sg',
        biz_address: '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208',
        sys_role: 'hr',
        dept: 'IT',
        staff_id: 123456123,
        phone: '65-5824-7888',
        staff_skills: []
      },
      applied_date: '23/10/2023',
      role_match: 0,
      missing_skills: [
        'Certified Scrum@Scale Practitioner',
        'Pascal Programming',
        'Python Programming'
      ],
      active_skills: [],
      in_progress_skills: []
    }
  ]
}
describe('RoleApplicant.vue', () => {
  // it check if data is loaded
  it('test if data is loaded', async () => {
    localStorage.setItem('id', 123456788)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/roleapplicantslisting/123456788').reply(200, {
      Results: mockData
    })
    const wrapper = mount(RoleApplicant)
    expect(wrapper.find('#loading').exists()).toBe(true)
    await new Promise((resolve) => setTimeout(resolve, 1))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#role_card').exists()).toBe(true)
    wrapper.vm.roleApplicants = []
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#role_card').exists()).toBe(false)
    expect(wrapper.find('#no_role').exists()).toBe(true)
    mock.restore()
  })
  it('test card items are rendered correctly', async () => {
    localStorage.setItem('id', 123456788)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/roleapplicantslisting/123456788').reply(200, {
      Results: mockData
    })
    const wrapper = mount(RoleApplicant)
    await new Promise((resolve) => setTimeout(resolve, 1))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#rname').exists()).toBe(true)
    expect(wrapper.find('#rapplicants').exists()).toBe(true)
    expect(wrapper.find('#rdesc').exists()).toBe(true)
    expect(wrapper.find('#rpubDate').exists()).toBe(true)
    expect(wrapper.find('#rclosingDate').exists()).toBe(true)
    expect(wrapper.find('#rskills').exists()).toBe(true)
  })

  it('test if status logic is correct', async () => {
    localStorage.setItem('id', 123456788)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/roleapplicantslisting/123456788').reply(200, {
      Results: mockData
    })
    const wrapper = mount(RoleApplicant)
    await new Promise((resolve) => setTimeout(resolve, 1))
    await wrapper.vm.$nextTick()

    for (let role of mockData) {
      if (
        new Date(role.role_listing_open) < new Date() &&
        new Date(role.role_listing_close) > new Date()
      ) {
        expect(wrapper.find('#rstatus-active').exists()).toBe(true)
      } else {
        expect(wrapper.find('#rstatus-inactive').exists()).toBe(true)
      }
    }
  })
  it('test if it shows number of applicants correctly', async () => {
    localStorage.setItem('id', 123456788)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/roleapplicantslisting/123456788').reply(200, {
      Results: mockData
    })
    const wrapper = mount(RoleApplicant)
    await new Promise((resolve) => setTimeout(resolve, 1))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#rapplicants').text()).toBe(mockData[0].no_of_applicant + ' Applied')
  })

  it('test applicant card items are rendered correctly', async () => {
    localStorage.setItem('id', 123456788)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/roleapplicantslisting/123456788').reply(200, {
      Results: mockData
    })
    const wrapper = mount(RoleApplicant)
    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(wrapper.find('#applicant_section').attributes('hidden'))
    wrapper.vm.roleDetails = roleDetails
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#applicant_section').attributes('hidden')).toBe(undefined)
    expect(wrapper.find('#applicant_card').exists()).toBe(true)
    expect(wrapper.find('#applicant_name').exists()).toBe(true)
    expect(wrapper.find('#applicant_email').exists()).toBe(true)
    expect(wrapper.find('#applicant_dept').exists()).toBe(true)
    expect(wrapper.find('#applicant_reason').exists()).toBe(true)
    expect(wrapper.find('#applicant_phone').exists()).toBe(true)
    expect(wrapper.find('#applicant_skill_section').exists()).toBe(true)
  })

  it('test if applicant skill section is rendered correctly', async () => {
    localStorage.setItem('id', 123456788)
    const mock = new MockAdapter(axios)
    mock.onGet('http://localhost:8080/api/v1/roleapplicantslisting/123456788').reply(200, {
      Results: mockData
    })
    const wrapper = mount(RoleApplicant)
    await new Promise((resolve) => setTimeout(resolve, 1))
    wrapper.vm.roleDetails = roleDetails

    await wrapper.vm.$nextTick()
    expect(wrapper.find('#applicant_skill_section').exists()).toBe(true)
    if (roleDetails.role_skills.length > 0) {
      for (let applicant of roleDetails.role_applicants) {
        console.log(applicant.missing_skills)
        if (applicant.missing_skills.length > 0) {
          expect(wrapper.find('#missing_skills').exists()).toBe(true)
          for (let skill of applicant.missing_skills) {
            expect(wrapper.text()).toContain(skill)
          }
        }
        if (applicant.active_skills.length > 0) {
          expect(wrapper.find('#active_skills').exists()).toBe(true)
          for (let skill of applicant.active_skills) {
            expect(wrapper.text()).toContain(skill)
          }
        }
        if (applicant.in_progress_skills.length > 0) {
          expect(wrapper.find('#inprogress_skills').exists()).toBe(true)
          for (let skill of applicant.in_progress_skills) {
            expect(wrapper.text()).toContain(skill)
          }
        }
      }
    } else {
      expect(wrapper.find('#no_skill_required').exists()).toBe(true)
    }
  })
})
