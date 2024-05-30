import {defineField, defineType} from 'sanity'

export const userType = defineType({
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'walletAddress',
      type: 'string',
      title: 'Wallet Address',
    }),
    defineField({
      name: 'profileImage',
      type: 'string',
      title: 'Profile Image',
    }),
  ],
})
